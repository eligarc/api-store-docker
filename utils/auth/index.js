const password = require('passport');

const LocalStrategy = require('./strategies/local.strategy');

password.use(LocalStrategy);