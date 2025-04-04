var nodejsmailer  = require('nodemailer'); 

var mailOptions ={
    from:'avinash.yadav02102004@gmail.com',
    to:'singhkumkum769@gmail.com',
    subject:"Sending Email to Rajat",
    text:"Welcome to NodeMailer, It's Working",
    html: '<h1>Welcome</h1><p>That was easy!</p>',
    // attachments: [
    //     { filename: 'txt.txt', path: './txt.txt' }
    //  ]
}    // details of to send from, to,  subject, text(message),


require('dotenv').config();

var transporter = nodejsmailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
}); // initialize create Transport service

//sends the mail
transporter.sendMail(mailOptions,function(error,info){

     if(error){
         console.log(error);
     }else{
         console.log('Email Send ' + info.response);
     }
});