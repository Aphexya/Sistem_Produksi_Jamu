const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Jamu = sequelize.define('Jamu', {
  id_jamu:    { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_user:    { type: DataTypes.INTEGER },
  id_produsen:{ type: DataTypes.INTEGER },
  nama_jamu:  { type: DataTypes.STRING(150), allowNull: false },
  ket_jamu:   { type: DataTypes.TEXT },
  jenis:      { type: DataTypes.STRING(50) },
  perizinan:  { type: DataTypes.STRING(100) },
}, {
  tableName: 'jamu',
  timestamps: false,
});

module.exports = Jamu;
