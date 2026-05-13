const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Tabel junction antara Jamu dan Khasiat
const KhasiatJamu = sequelize.define('KhasiatJamu', {
  id_khasiat: { type: DataTypes.INTEGER, allowNull: false },
  id_jamu:    { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'khasiat_jamu',
  timestamps: false,
});

module.exports = KhasiatJamu;
