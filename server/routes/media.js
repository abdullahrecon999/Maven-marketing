var express = require('express');
var router = express.Router();
const Media = require('../models/userMedia');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const FormData = require('form-data');
const mongoose = require('mongoose');
const { ImgurClient } = require('imgur');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + Date.now() + extension);
    },
  });
  
const upload = multer({ storage: storage, fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|mp4|mov|avi|mkv|webm|gif/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    if (extension) {
        cb(null, true);
    } else {
        cb(new Error('Only jpeg, jpg, mp4, and png files are allowed'));
    }
}});

router.get('/', async (req, res) => {
    console.log('GET /media');
});

router.post('/upload', upload.array('files'), async (req, res) => {
    console.log(req.user._id);

    const files = req.files;
    console.log(files[0]);

    // upload the img, vid and gif to imgur
    let formData = new FormData();
    formData.append("image", fs.createReadStream(files[0].path))
    // formData.append("type", files[0].mimetype)

    let resp = await axios.post('https://api.imgur.com/3/upload', formData, {
        headers: {
            "Authorization": `Client-ID 6d6ea978e75e998`,
            "Content-Type": "multipart/form-data",
            "Agent": "Node.js"
        }
    });

    console.log(resp.data);
    if(resp.data.status == 200) {
        // save the media to the database
        const mediaData = {
            url: resp.data.data.link,
            path: files[0].path,
            type: files[0].mimetype,
        };
        
        try {
            let media = await Media.findOne({ userid: req.user._id });
            if (!media) {
              media = new Media({ userid: req.user._id, media: [] });
            }
            media.media.push({
              url: resp.data.data.link,
              path: files[0].path,
              type: files[0].mimetype,
            });
            await media.save();
        } catch (error) {
            console.log(error);
        }
        res.status(200).json({success: true, data: resp.data.data});
    } else {
        res.status(500).json({success: false, data: resp.data});
    }
});

router.get('/getMedia', async (req, res) => {
    if(!req.user) {
        res.status(401).json({success: false, data: "Unauthorized"});
    } else {
        const media = await Media.find({userid: req.user._id});
        if(!media) {
            res.status(404).json({success: false, data: "Media not found"});
        } else {
            res.status(200).json({success: true, data: media});
        }
    }
});

router.delete('/deleteMedia', async (req, res) => {
    const media = await Media.findOne({userid: req.user._id});
    if(!media) {
        res.status(404).json({success: false, data: "Media not found"});
    } else {
        const mediaId = req.body.mediaId;
        const mediaIndex = media.media.findIndex((m) => m._id == mediaId);
        if(mediaIndex == -1) {
            res.status(404).json({success: false, data: "Media not found"});
        } else {
            media.media.splice(mediaIndex, 1);
            media.save();
            res.status(200).json({success: true, data: "Media deleted"});
        }
    }
});

router.delete('/deleteMultipleMedia', async (req, res) => {
    const media = await Media.findOne({userid: req.user._id});
    if(!media) {
        res.status(404).json({success: false, data: "Media not found"});
    } else {
        const mediaUrls = req.body.mediaUrls;
        for(let i = 0; i < mediaUrls.length; i++) {
            const mediaIndex = media.media.findIndex((m) => m.url == mediaUrls[i]);
            if(mediaIndex == -1) {
                res.status(404).json({success: false, data: "Media not found"});
            } else {
                media.media.splice(mediaIndex, 1);
            }
        }
        media.save();
        res.status(200).json({success: true, data: "Media deleted"});
    }
});

module.exports = router;