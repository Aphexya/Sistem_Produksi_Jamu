const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Khasiat = sequelize.define('Khasiat', {
  id_khasiat:  { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  khasiat:     { type: DataTypes.STRING(100), allowNull: false },
  ket_khasiat: { type: DataTypes.TEXT },
}, {
  tableName: 'khasiat',
  timestamps: false,
});

module.exports = Khasiat;
