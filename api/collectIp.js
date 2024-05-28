const nodemailer = require('nodemailer');
npm 
// Main function for the serverless handler
module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;
    
    // Extract the IP address from the request
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    console.log(`IP Address: ${ip}`);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'lozinskiynazar56@gmail.com',
        pass: 'kirv pseq uqsk whpn'
      }
    });

    const mailOptions = {
      from: 'lozinskiynazar56@gmail.com',
      to: 'lozinskiynazar56@gmail.com',
      subject: 'Your IP Address',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your IP Address</title>
          <style>
            body {
              font-family: 'Montserrat', sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
              text-align: center;
            }
            .container {
              max-width: 600px;
              margin: auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333333;
            }
            p {
              color: #666666;
              font-size: 16px;
              line-height: 1.5;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Your IP Address</h1>
            <p>Your IP address is: ${ip}</p>
          </div>
        </body>
        </html>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send('Email sent successfully.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error sending email.');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};