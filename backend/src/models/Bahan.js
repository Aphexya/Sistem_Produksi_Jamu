const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Bahan = sequelize.define('Bahan', {
  id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nama:        { type: DataTypes.STRING(100), allowNull: false },
  kategori:    { type: DataTypes.STRING(50), allowNull: false },
  satuan:      { type: DataTypes.STRING(20), allowNull: false },
  stokAwal:    { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  hargaSatuan: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },
  threshold:   { type: DataTypes.DECIMAL(10, 2), defaultValue: 10 },
  created_at:  { type: DataTypes.DATE },
  updated_at:  { type: DataTypes.DATE },
}, {
  tableName: 'bahan',
  timestamps: false,
});

module.exports = Bahan;
