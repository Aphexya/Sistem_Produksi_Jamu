const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Produksi = sequelize.define('Produksi', {
  id_produksi:   { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_jamu:       { type: DataTypes.INTEGER },
  id_user:       { type: DataTypes.INTEGER },
  kode_batch:    { type: DataTypes.STRING(50) },
  ukuran_batch:  { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  status:        { type: DataTypes.ENUM('antrian', 'ekstraksi', 'botolisasi', 'selesai'), defaultValue: 'antrian' },
  volume_output: { type: DataTypes.DECIMAL(10, 2) },
  efisiensi:     { type: DataTypes.DECIMAL(5, 2) },
  catatan:       { type: DataTypes.TEXT },
  created_at:    { type: DataTypes.DATE },
}, {
  tableName: 'produksi',
  timestamps: false,
});

module.exports = Produksi;
