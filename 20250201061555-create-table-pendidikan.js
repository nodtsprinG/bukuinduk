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
    queryInterface.createTable('pendidikan', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      sebelumnya_tamatan_dari: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      sebelumnya_tanggal_ijazah: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      sebelumnya_no_ijazah: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      sebelumnya_tanggal_skhun: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      sebelumnya_no_skhun: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      sebelumnya_lama_belajar: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      pindahan_dari_sekolah: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      pindahan_alasan: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      diterima_di_kelas: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      diterima_di_bidang_keahlian: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      diterima_di_program_keahlian: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      diterima_di_paket_keahlian: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      diterima_tanggal: {
        type: Sequelize.DATEONLY,
        allowNull: false,
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
    return queryInterface.dropTable('pendidikan')
  },
}
