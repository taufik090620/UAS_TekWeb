'use strict';

const Sequelize = require('sequelize');
const psqlCon = require('../connectors/psql');

const Activity = psqlCon.sequelize.define('activity', {
  // attributes
  id: { type: Sequelize.STRING, primaryKey: true },
  sub_organization_id: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  pic: { type: Sequelize.STRING },

  created_date: { type: Sequelize.DATE },
  updated_date: { type: Sequelize.DATE },
}, {
  freezeTableName: true,
  tableName: 'activity',
  createdAt: false,
  updatedAt: false,
});


module.exports = {
  Activity
};

