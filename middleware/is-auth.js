const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.query.token;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecret');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
