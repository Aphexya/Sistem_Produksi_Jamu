const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Tabel junction antara Jamu dan Rempah
const Komposisi = sequelize.define('Komposisi', {
  id_rempah:    { type: DataTypes.INTEGER, allowNull: false },
  id_jamu:      { type: DataTypes.INTEGER, allowNull: false },
  banyak_rempah:{ type: DataTypes.DECIMAL(10, 2) },
}, {
  tableName: 'komposisi',
  timestamps: false,
});

module.exports = Komposisi;
