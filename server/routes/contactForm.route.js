const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config()

router.post('/', (req, res) => {
    console.log(req.body)
    
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.mailUsername, // generated ethereal user
                pass: process.env.mailPassword // generated ethereal password
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: process.env.fromEmail, // sender address
            to: process.env.toEmail, // list of receivers
            subject: req.body.subject, // Subject line
            html: '<h2>'+req.body.name +'</h2>'+'<h2>'+req.body.email +'</h2>'+'<h2>'+req.body.subject +'</h2>'+'<h2>'+req.body.message +'</h2>' // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    res.send('OK')
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    
});

module.exports = router;