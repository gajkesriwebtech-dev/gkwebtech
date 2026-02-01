const rateLimit = ({ windowMs, max }) => {
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!requests.has(ip)) {
      requests.set(ip, []);
    }
    
    const timestamps = requests.get(ip);
    const windowStart = now - windowMs;
    
    // Filter out old timestamps
    const recentTimestamps = timestamps.filter(t => t > windowStart);
    requests.set(ip, recentTimestamps);
    
    if (recentTimestamps.length >= max) {
      return res.status(429).json({ 
        success: false, 
        message: 'Too many requests, please try again later.' 
      });
    }
    
    recentTimestamps.push(now);
    next();
  };
};

export default rateLimit;
