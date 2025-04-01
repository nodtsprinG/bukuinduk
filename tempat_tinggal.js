/**
 * @module ModelTempatTinggal
 * @deskripsi Model Sequelize untuk tabel 'tempat_tinggal'.
 * @param {Sequelize} sequelize - Instance Sequelize yang digunakan.
 * @param {DataTypes} DataTypes - DataTypes dari Sequelize untuk mendefinisikan tipe data.
 * @returns {Sequelize.Model} - Mengembalikan model Sequelize untuk tabel 'tempat_tinggal'.
 */

/**
 * Definisi model TempatTinggal.
 * @typedef {object} TempatTinggal
 * @property {number} id - Identifikasi unik untuk tempat tinggal. Di-auto-increment.
 * @property {string} alamat - Alamat tempat tinggal.
 * @property {string} no_telepon - Nomor telepon tempat tinggal.
 * @property {enum<string>} tinggal_dengan - Informasi mengenai dengan siapa tinggal.
 * @property {string} jarak_ke_sekolah - Jarak ke sekolah.
 * @property {number} user_id - ID pengguna yang terkait dengan tempat tinggal.
 */

/**
 * Definisi model Sequelize untuk tabel 'tempat_tinggal'.
 * @type {Sequelize.Model<TempatTinggal>}
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'tempat_tinggal',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      alamat: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      no_telepon: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      tinggal_dengan: {
        type: DataTypes.ENUM('ortu', 'saudara', 'lainnya', 'wali'),
        allowNull: false,
      },
      jarak_ke_sekolah: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      status_perubahan: {
        type: DataTypes.ENUM('pending', 'approved'),
        allowNull: false,
        defaultValue: "approved"
      }
    },
    {
      sequelize,
      tableName: 'tempat_tinggal',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'user_fk_keterangan_tempat_tinggal',
          using: 'BTREE',
          fields: [{ name: 'user_id' }],
        },
      ],
    }
  )
}
