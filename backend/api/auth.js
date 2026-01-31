import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Generate JWT Token
const generateToken = (res, role) => {
  const token = jwt.sign({ role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  // Validate against Environment Variables
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (email === adminEmail && bcrypt.compareSync(password, adminPasswordHash)) {
    generateToken(res, 'admin');

    res.json({
      success: true,
      message: 'Authenticated successfully',
      role: 'admin',
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/admin/logout
// @access  Public
router.post('/logout', (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

// @desc    Get current auth status
// @route   GET /api/admin/me
// @access  Private
router.get('/me', protect, (req, res) => {
  res.json({
    success: true,
    user: {
      role: req.user.role,
    },
  });
});

export default router;
