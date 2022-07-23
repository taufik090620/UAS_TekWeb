'use strict';

const Sequelize = require('sequelize');
const psqlCon = require('../connectors/psql');

const User = psqlCon.sequelize.define('users', {
  // attributes
  id: { type: Sequelize.STRING, primaryKey: true },
  email: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING },
  birth_date: { type: Sequelize.STRING },
  birth_place: { type: Sequelize.STRING },
  address: { type: Sequelize.STRING },
  phone_number: { type: Sequelize.STRING },

  created_date: { type: Sequelize.DATE },
  updated_date: { type: Sequelize.DATE },
}, {
  freezeTableName: true,
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
});

module.exports = {
  User,
};

