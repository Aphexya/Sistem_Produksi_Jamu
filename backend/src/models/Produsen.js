const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Produsen = sequelize.define('Produsen', {
  id_produsen:   { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nama_produsen: { type: DataTypes.STRING(150), allowNull: false },
  alamat:        { type: DataTypes.TEXT },
  kota:          { type: DataTypes.STRING(100) },
  kontak:        { type: DataTypes.STRING(20) },
  email:         { type: DataTypes.STRING(100) },
  status:        { type: DataTypes.ENUM('aktif', 'menunggu', 'ditangguhkan'), defaultValue: 'aktif' },
}, {
  tableName: 'produsen',
  timestamps: false,
});

module.exports = Produsen;
