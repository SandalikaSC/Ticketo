// models/stationMaster.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const StationMaster = sequelize.define('stationMaster', {
  smNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stationName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stationMasterName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = StationMaster;
