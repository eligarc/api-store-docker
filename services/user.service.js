const boom = require('@hapi/boom');
// const getConnection = require('../libs/postgres');

// const pool = require('../libs/postgres.pool');
// Espacio de nombre resevados. la forma que podemos acceder aellos
const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {
    // this.pool = pool;
    // this.pool.on('error', () => console.error)
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    // const client = await getConnection();

    // const response = await this.pool.query('SELECT * FROM tasks');

    // return response.rows;

    const response = await models.User.findAll();

    return response;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);

    if (!user) {
      throw boom.notFound('user not found')
    }

    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);

    const response = await user.update(changes);

    return response;
  }

  async delete(id) {

    const user = await this.findOne(id);

    await user.destroy();

    return { id };
  }
}

module.exports = UserService;
