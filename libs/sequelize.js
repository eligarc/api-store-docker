const { Sequelize } = require('sequelize');

const { config } = require('../config/config');

const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const connectionString = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: console.log,
});

setupModels(sequelize);
// Se desactiva el modo syc no es recomendable usarlo en entorno de prod
// sequelize.sync();

module.exports = sequelize;