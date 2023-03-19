var express = require('express');
const crypto = require('crypto');
const User = require('../models/User');
const ROLES = require('../utils/roles').ROLES;
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

exports.PasswordReset = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        console.log(user?._id)
    
        if (!user) {
          return res.status(400).send("user with given email doesn't exist");
        }
    
        const token = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });
    
        // send to user's email
        try {
          //const link = `${req.protocol}://${req.get('host')}/${user.role}/resetPassword/${token}`;
          const link = token;
          await sendEmail(user.email, "Password reset", link);
    
          res.status(200).send("password reset link sent to your email account");
        } catch (err) {
          console.log(err)
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          await user.save({ validateBeforeSave: false });
    
          return res.status(500).send("there was an error sending the email");
        }
    
      } catch (error) {
        console.log(error);
      }
}

exports.PasswordResetVerify = async (req, res, next) => {
    try {
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    
        const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });
        
        if (!user) {
          return res.status(400).send("user with given token doesn't exist");
        }

        user.password = await bcrypt.hash(req.body.password, 10);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
    
        res.status(200).send("password reset successful");
      } catch (error) {
        console.log(error);
      }
}