/**
 * @module ModelAyahKandung
 * @deskripsi Model Sequelize untuk tabel 'ayah_kandung'.
 * @param {Sequelize} sequelize - Instance Sequelize yang digunakan.
 * @param {DataTypes} DataTypes - DataTypes dari Sequelize untuk mendefinisikan tipe data.
 * @returns {Sequelize.Model} - Mengembalikan model Sequelize untuk tabel 'ayah_kandung'.
 */

/**
 * Definisi model AyahKandung.
 * @typedef {object} AyahKandung
 * @property {number} id - Identifikasi unik untuk ayah kandung. Di-auto-increment.
 * @property {string} nama - Nama ayah kandung.
 * @property {string} tempat_lahir - Tempat lahir ayah kandung.
 * @property {string} tanggal_lahir - Tanggal lahir ayah kandung.
 * @property {string} agama - Agama ayah kandung.
 * @property {string} kewarganegaraan - Kewarganegaraan ayah kandung.
 * @property {string} pendidikan - Pendidikan ayah kandung.
 * @property {string} pekerjaan - Pekerjaan ayah kandung.
 * @property {string} pengeluaran_per_bulan - Pengeluaran per bulan ayah kandung.
 * @property {string} alamat_dan_no_telepon - Alamat dan nomor telepon ayah kandung.
 * @property {enum<string>} status - Status ayah kandung (masih hidup atau meninggal).
 * @property {number} user_id - ID pengguna yang terkait dengan ayah kandung.
 */

/**
 * Definisi model Sequelize untuk tabel 'ayah_kandung'.
 * @type {Sequelize.Model<AyahKandung>}
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'ayah_kandung',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nama: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      tempat_lahir: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      tanggal_lahir: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      agama: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      kewarganegaraan: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      pendidikan: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      pekerjaan: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      pengeluaran_per_bulan: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      alamat: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      no_telepon: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('masih hidup', 'meninggal'),
        allowNull: false,
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
      tableName: 'ayah_kandung',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'user_fk_keterangan_ayah_kandung',
          using: 'BTREE',
          fields: [{ name: 'user_id' }],
        },
      ],
    }
  )
}
