// middleware/roleMiddleware.js
const jwt = require('jsonwebtoken');

const requireAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token mungon' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Vetëm admini ka qasje në këtë veprim' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token i pavlefshëm' });
  }
};

module.exports = { requireAdmin };
