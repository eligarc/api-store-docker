const boom = require('@hapi/boom');
// const getConnection = require('../libs/postgres');

const pool = require('../libs/postgres.pool');

class UserService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', () => console.error)
  }

  async create(data) {
    return data;
  }

  async find() {
    // const client = await getConnection();

    const response = await this.pool.query('SELECT * FROM tasks');

    return response.rows;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
