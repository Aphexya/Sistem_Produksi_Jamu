const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Rempah = sequelize.define('Rempah', {
  id_rempah:   { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nama_rempah: { type: DataTypes.STRING(100), allowNull: false },
  ket_rempah:  { type: DataTypes.TEXT },
}, {
  tableName: 'rempah',
  timestamps: false,
});

module.exports = Rempah;
