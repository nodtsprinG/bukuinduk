'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.createTable('perkembangan', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      menerima_bea_siswa_tahun: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      menerima_bea_siswa_kelas: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      menerima_bea_siswa_dari: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      meninggalkan_sekolah_ini_tanggal: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      meninggalkan_sekolah_ini_alasan: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      akhir_pendidikan_tamat_belajar_lulus_tahun: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      akhir_pendidikan_tanggal_ijazah: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      akhir_pendidikan_no_ijazah: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      akhir_pendidikan_tanggal_skhun: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      akhir_pendidikan_no_skhun: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      status_perubahan: {
        type: Sequelize.ENUM('pending', 'approved'),
        allowNull: false,
        defaultValue: "approved"
      },
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('perkembangan')
  },
}
