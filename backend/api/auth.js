import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { protect, admin } from '../middleware/authMiddleware.js';
import rateLimit from '../middleware/rateLimiter.js';

const router = express.Router();

// Generate JWT Token
const generateToken = (res, role) => {
  const token = jwt.sign({ role }, process.env.JWT_SECRET, {
    expiresIn: '30m',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 60 * 1000, // 30 minutes
  });

  return token;
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
router.post('/login', rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }), async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  // Validate against Environment Variables
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (email === adminEmail && bcrypt.compareSync(password, adminPasswordHash)) {
    generateToken(res, 'admin');
    console.log(`AUDIT: Admin logged in - IP: ${req.ip} - Time: ${new Date().toISOString()}`);

    res.json({
      success: true,
      message: 'Authenticated successfully',
      role: 'admin',
    });
  } else {
    console.warn(`AUDIT: Failed login attempt - Email: ${email} - IP: ${req.ip}`);
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
