const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); 
require('dotenv').config(); 

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const [[userExists]] = await db.query('SELECT email FROM users WHERE email = ?', [email]);
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    await db.query(sql, [fullName, email, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [[user]] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const payload = { userId: user.id, role: user.role };
    const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Server error during login.' });
  }
};


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const [[user]] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) {
      return res.status(200).json({ message: 'If a user with that email exists, a reset link has been sent.' });
    }

    const resetLink = `http://localhost:3000/reset-password/${user.id}`; // Real app mein yahan token hoga

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset for StockEasy',
      text: `Hello ${user.username},\n\nPlease click on the following link to reset your password:\n${resetLink}\n\nIf you did not request this, please ignore this email.\n`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset email sent successfully.' });
  } catch (error) {
    console.error('Error in forgot password:', error);
    res.status(500).json({ message: 'Server error while sending email.' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword, 
};