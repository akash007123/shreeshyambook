require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/book-room', async (req, res) => {
  const { name, email, mobile, checkIn, checkOut, guests, roomType } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '🎉 Your Booking is Confirmed! | Thank You for Choosing Us',
    html: `
      <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: #1e293b; padding: 20px; text-align: center;">
          <img src="https://sosapient.in/logo/Dlogo.png" alt="Company Logo" style="width: 120px;">
        </div>
        
        <!-- Body -->
        <div style="padding: 30px;">
          <h2 style="color: #333; text-align: center;">Hello, ${name} 👋</h2>
          <p style="font-size: 16px; color: #555; text-align: center;">We’re excited to confirm your booking! Below are your reservation details:</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="font-size: 16px; margin: 5px 0;"><strong>📅 Check-in:</strong> ${checkIn}</p>
            <p style="font-size: 16px; margin: 5px 0;"><strong>🏁 Check-out:</strong> ${checkOut}</p>
            <p style="font-size: 16px; margin: 5px 0;"><strong>👥 Guests:</strong> ${guests}</p>
            <p style="font-size: 16px; margin: 5px 0;"><strong>🛏️ Room Type:</strong> ${roomType}</p>
          </div>
          
          <p style="font-size: 16px; text-align: center;">We can't wait to host you! If you have any questions, feel free to reach out.</p>
          
          <!-- Contact & Website -->
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://sosapient.in" style="background: #1e293b; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 16px; display: inline-block;">Visit Our Website</a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #1e293b; padding: 15px; text-align: center; color: #ffffff; font-size: 14px;">
          📞 <strong>+91-9685533878</strong> | 🌐 <a href="https://sosapient.in" style="color: #facc15; text-decoration: none;">www.sosapient.in</a>
        </div>
      </div>
    `,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: '📩 New Booking Received!',
      html: `
        <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: #e11d48; padding: 20px; text-align: center;">
            <h2 style="color: #ffffff;">📌 New Booking Alert</h2>
          </div>
  
          <!-- Body -->
          <div style="padding: 30px;">
            <p style="font-size: 16px; color: #555;">New booking received with the following details:</p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="font-size: 16px; margin: 5px 0;"><strong>👤 Name:</strong> ${name}</p>
              <p style="font-size: 16px; margin: 5px 0;"><strong>📧 Email:</strong> ${email}</p>
              <p style="font-size: 16px; margin: 5px 0;"><strong>📧 Email:</strong> ${mobile}</p>
              <p style="font-size: 16px; margin: 5px 0;"><strong>📅 Check-in:</strong> ${checkIn}</p>
              <p style="font-size: 16px; margin: 5px 0;"><strong>🏁 Check-out:</strong> ${checkOut}</p>
              <p style="font-size: 16px; margin: 5px 0;"><strong>👥 Guests:</strong> ${guests}</p>
              <p style="font-size: 16px; margin: 5px 0;"><strong>🛏️ Room Type:</strong> ${roomType}</p>
            </div>
            
            <p style="font-size: 16px;">📞 <strong>+91-9685533878</strong> | 🌐 <a href="https://sosapient.in" style="color: #e11d48; text-decoration: none;">www.sosapient.in.com</a></p>
          </div>
        </div>
      `,
    });
  
  

    res.json({ message: 'Booking successful! Confirmation email sent.' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
