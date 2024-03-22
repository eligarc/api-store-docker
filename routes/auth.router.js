const express = require('express');
const password = require('passport');

const router = express.Router();

router.post('/login',
  password.authenticate('local', { session: false }),
  async (req, res, next) => {
    console.log(req.user);
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  });


module.exports = router;
