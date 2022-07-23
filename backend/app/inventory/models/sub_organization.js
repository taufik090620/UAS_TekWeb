'use strict';

const Sequelize = require('sequelize');
const psqlCon = require('../connectors/psql');

const SubOrganizations = psqlCon.sequelize.define('sub_organizations', {
  // attributes
  id: { type: Sequelize.STRING, primaryKey: true },
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  address: { type: Sequelize.STRING },

  created_date: { type: Sequelize.DATE },
  updated_date: { type: Sequelize.DATE },
}, {
  freezeTableName: true,
  tableName: 'sub_organizations',
  createdAt: false,
  updatedAt: false,
});


module.exports = {
  SubOrganizations
};

