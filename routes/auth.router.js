const express = require('express');
const password = require('passport');
const jwt = require('jsonwebtoken');

const { config } = require('./../config/config');

const router = express.Router();

router.post('/login',
  password.authenticate('local', { session: false }),
  async (req, res, next) => {
    const user = req.user;
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    try {
      res.json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  });


module.exports = router;
