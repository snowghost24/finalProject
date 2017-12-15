//creating js for sending mail upon trade request

//requiring npm nodemailer package
var nodemailer = require("nodemailer")


var receiverEmail;
var theSubject;
var theContent;
//variable for nodemailer request and autentication to smtp
var mail = {
    mailtouser: function mailToUser (userEmail) {
                let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
               //  port: 587, //port 587 TLS
               //  secure: false,
               port: 465,
               secure: true,
                auth: {
                  type: 'OAuth2',
                  user: 'watsonemail24680@gmail.com',
                  clientId: "804174903576-b5puecf74i61f3rgcqc84sv5j35o91rh.apps.googleusercontent.com",
                  clientSecret: "ArawoRLVskso6V6pJSyZ2X2G",
                  accessToken: "ya29.Glv9BIT5PhcDsyGFg5WphNb2sopKMu7Fv-96WP5Md2y9MFRtXXD_-aRwNMCv8tm0lx0TmKn6IteGoan5BLj_oCwCayUUhIst9DpW1_ULyUia_mT96MzBQ79FrA1E",  
                  expires: 3600, 
                  refreshToken: "1/B4WCjJXl2B9UQIojYeaifPParKJSImE1Ewsuaq4LV6o"   
              }
                });

    //variable for email message to send to user
    let mailOptions = {
        //our email address
        from: '"IBM Watson" <watsonemail24680@gmail.com>',
        //user email
        to: "jjguzman24680@gmail.com", //****NEEDS TO BE SET TO VAR FOR USER EMAIL*****/
        //subject line
        subject: "hey",
        //text and html
        text: 'You currently have a trade request!', 
        html: '<b>'+theContent+'</b>' 
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
mail.mailtouser();
module.exports = mail