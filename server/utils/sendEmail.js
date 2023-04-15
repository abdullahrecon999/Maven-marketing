var nodemailer = require('nodemailer');
require('dotenv').config()

module.exports = async (email, subject, text) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.MAIL_USERNAME,
              pass: 'smseequpceotdghz',
            }
        });

        let mailOptions = {
            from: "abdullahshafique123@gmail.com",
            to: email,
            subject: subject, // Subject line
            html: "<b>Link/Token: </b>"+text, // html body
        };
        
        await transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
              console.log("Error in Email " + err);
            } else {
              console.log("Email sent successfully");
            }
        });

    } catch (error) {
        console.log("Error " + error);
    }
}