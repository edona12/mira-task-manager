const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Nuk ka token' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token i pavlefshëm' });

    req.user = {
      id: user.userId // ✅ marrim ID-në nga payload-i që ke në JWT
    };

    next();
  });
}

module.exports = { authenticateToken };
