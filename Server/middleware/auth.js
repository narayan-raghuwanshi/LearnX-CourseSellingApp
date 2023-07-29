const jwt = require('jsonwebtoken');
const ADMINSECRET = 'admin-secret-key';
const USERSECRET = 'user-secret-key';

const authenticateAdminJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const adminToken = authHeader.split(' ')[1];
      jwt.verify(adminToken, ADMINSECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
  const authenticateUserJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const userToken = authHeader.split(' ')[1];
      jwt.verify(userToken, USERSECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };

  module.exports={
    authenticateAdminJwt,authenticateUserJwt,ADMINSECRET,USERSECRET
  }