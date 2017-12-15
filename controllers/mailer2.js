// 'use strict';
// const nodemailer = require('nodemailer');

// // Generate test SMTP service account from ethereal.email
// // Only needed if you don't have a real mail account for testing

// nodemailer.createTestAccount((err, account) => {

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: true,
//         auth: {
//             type: 'OAuth2',
//             user: 'watsonemail@gmail.com',
//             clientId: "804174903576-b5puecf74i61f3rgcqc84sv5j35o91rh.apps.googleusercontent.com",
//             clientSecret: "ArawoRLVskso6V6pJSyZ2X2G",
//             access_token: "ya29.Glv9BJOw2qR9iLVYWyrrmlaCRo8MqcLOO5Lz6KHADBCVky9YdWfAITxQ4PTJxnUamNjwJDdO2M5VhQKwSAJpPzI2ozLfVY0R-wuRJSUMCigAeQJHjld6S3pNi_E2", 
//             expires      : 1494388182480,
//             refresh_token: "1/9iXQ9O45FhJ8ykMupd8EzfiM1ijMoAB4UxXbRmIuWYCYNcjypRXOMNmLh7SZDRWZ"
          
            
//         }
        

        
//         // host: 'smtp.gmail.com',
//         // port: 587,
//         // secure: false, // true for 465, false for other ports
//         // auth: {
//         //     user: "jguzman24680", // generated ethereal user
//         //     pass: "!Darknight24"  // generated ethereal password 
//         // }
//     });

//     // setup email data with unicode symbols
//     let mailOptions = {
//         from: '"Jose Guzman 👻" <watsonemail24680@gmail.com>', // sender address
//         to: 'jguzman24680@gmail.com', // list of receivers
//         subject: 'Hello ✔', // Subject line
//         text: 'Hello world?', // plain text body
//         html: '<b>Hello world?</b>' // html body
//     };

//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//         // Preview only available when sending through an Ethereal account
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
//         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//     });
// });




// //    module.exports = {
      
// //       myFunc :funcOperation
// //    }

var nodemailer = require("nodemailer")

//variable for nodemailer request and autentication to smtp
var mail = {
    mailtouser: function mailToUser (userEmail) {
                let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587, //port 587 TLS
                secure: true,
                auth: {
                                type: 'OAuth2',
                                user: 'watsonemail24680',
                                clientId: "804174903576-b5puecf74i61f3rgcqc84sv5j35o91rh.apps.googleusercontent.com",
                                clientSecret: "ArawoRLVskso6V6pJSyZ2X2G",
                                access_token: "ya29.Glv9BJOw2qR9iLVYWyrrmlaCRo8MqcLOO5Lz6KHADBCVky9YdWfAITxQ4PTJxnUamNjwJDdO2M5VhQKwSAJpPzI2ozLfVY0R-wuRJSUMCigAeQJHjld6S3pNi_E2", 
                                expires      : 1494388182480,
                                refresh_token: "1/9iXQ9O45FhJ8ykMupd8EzfiM1ijMoAB4UxXbRmIuWYCYNcjypRXOMNmLh7SZDRWZ"
                              
                                
                            }
                // auth: { 
                // //user name gameswapu@gmail.com pass: ucfproject2
                // user: "jjguzman24680@gmail.com",
                // pass: "Trinity3",
                // }
                });

    //variable for email message to send to user
    // let mailOptions = {
    //     //our email address
    //     from: '"Game Swap" <watsonemail@gmail.com>',
    //     //user email
    //     to: "<watsonemail@gmail.com>", //****NEEDS TO BE SET TO VAR FOR USER EMAIL*****/
    //     //subject line
    //     subject: 'You currently have a trade request!',
    //     //text and html
    //     text: 'You currently have a trade request!', 
    //     html: '<b>You currently have a trade request!</b>' 
    // };

    let mailOptions = {
        from: '"Fred Foo 👻" <watsonemail24680@gmail.com>', // sender address
        to: 'jjguzman24680@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    //function to send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    })
    }
}

module.exports = mail