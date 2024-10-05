const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const email_pass = process.env.DB_PASSWORD; 


// Middleware to parse JSON bodies
app.use(bodyParser.json());


const toEmail = 'mail.yuvraj0317@gmail.com';

app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    const emailSubject = subject || "Contact Form Submission";
    const contactMessage = message;

    // Create the email content
    let emailContent = `Email from: ${name} <br/>`;
    emailContent += `Email address: ${email} <br/>`;
    emailContent += `Message: <br/> ${contactMessage} <br/>`;
    emailContent += `<br /> ----- <br /> This email was sent from your site ${req.protocol}://${req.get('host')} contact form. <br/>`;

    // Nodemailer transport configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: toEmail, 
            pass: 'email_password',  
        },
    });


  
    const mailOptions = {
        from: `${name} <${email}>`,
        to: toEmail,
        subject: emailSubject,
        html: emailContent,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Something went wrong. Please try again.');
        }
        res.send('OK');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
