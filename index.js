const express = require('express');
const nodemailer = require('nodemailer')
const credential = require('./credential')
const app = express();
const port = 3001

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
});

app.get('/send', (req,res)=>{
 let email1 = req.query.email1;
 //let email2 = req.query.email2;
 let subject = req.query.subject;
 let message = req.query.message;
 const mail = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {user: credential.user, pass: credential.pass}
 });
 
 mail.sendMail({
    from: 'techuse2101@gmail.com',
    to: email1,
    subject: subject,
    html: message
 },(err)=>{
    if(err) throw err
    res.send('Mail has been sent')
 })

})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log('Server is runiing on port %d', port);
});