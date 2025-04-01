/**
 * @module ModelWali
 * @deskripsi Model Sequelize untuk tabel 'wali'.
 * @param {Sequelize} sequelize - Instance Sequelize yang digunakan.
 * @param {DataTypes} DataTypes - DataTypes dari Sequelize untuk mendefinisikan tipe data.
 * @returns {Sequelize.Model} - Mengembalikan model Sequelize untuk tabel 'wali'.
 */

/**
 * Definisi model Wali.
 * @typedef {object} Wali
 * @property {number} id - Identifikasi unik untuk wali. Di-auto-increment.
 * @property {string} nama - Nama wali.
 * @property {string} tempat_lahir - Tempat lahir wali.
 * @property {string} tanggal_lahir - Tanggal lahir wali.
 * @property {string} agama - Agama wali.
 * @property {string} kewarganegaraan - Kewarganegaraan wali.
 * @property {string} pendidikan - Pendidikan wali.
 * @property {string} pekerjaan - Pekerjaan wali.
 * @property {string} pengeluaran_per_bulan - Pengeluaran per bulan wali.
 * @property {string} alamat_dan_no_telepon - Alamat dan nomor telepon wali.
 * @property {number} user_id - ID user yang berhubungan dengan wali.
 */

/**
 * Definisi model Sequelize untuk tabel 'wali'.
 * @type {Sequelize.Model<Wali>}
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'wali',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nama: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      tempat_lahir: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      tanggal_lahir: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      agama: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      kewarganegaraan: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      pendidikan: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      pekerjaan: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      pengeluaran_per_bulan: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      alamat: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      no_telepon: {
        type: DataTypes.STRING(255),
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
      tableName: 'wali',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'user_fk_keterangan_wali',
          using: 'BTREE',
          fields: [{ name: 'user_id' }],
        },
      ],
    }
  )
}
