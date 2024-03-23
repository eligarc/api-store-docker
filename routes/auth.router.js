const express = require('express');
const password = require('passport');
const jwt = require('jsonwebtoken');

const { config } = require('./../config/config');
const AuthService = require('./../services/auth.service');

const service = new AuthService();

const router = express.Router();

router.post('/login',
  password.authenticate('local', { session: false }),
  async (req, res, next) => {
    const user = req.user;
    try {
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  });

  router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendMail(email)
      res.json(rta);
    } catch (error) {
      next(error);
    }
  });


module.exports = router;
