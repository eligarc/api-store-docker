const { Sequelize } = require('sequelize');

const { config } = require('../config/config');

const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const connectionString = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(connectionString, {
    dialect: 'mysql',
    logging: console.log,
});

setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;