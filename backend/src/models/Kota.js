const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Kota = sequelize.define('Kota', {
  id_kota:   { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nama_kota: { type: DataTypes.STRING(100), allowNull: false },
  ket_kota:  { type: DataTypes.TEXT },
}, {
  tableName: 'kota',
  timestamps: false,
});

module.exports = Kota;
