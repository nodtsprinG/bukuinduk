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
    return queryInterface.createTable('data_diri', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nama_lengkap: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      nama_panggilan: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      jenis_kelamin: {
        type: Sequelize.ENUM('laki-laki', 'perempuan'),
        allowNull: false,
      },
      tempat_lahir: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      agama: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      kewarganegaraan: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      anak_ke: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jml_saudara_kandung: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      jml_saudara_tiri: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      jml_saudara_angkat: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      kelengkapan_ortu: {
        type: Sequelize.ENUM('yatim', 'piatu', 'yatim piatu', 'lengkap'),
        allowNull: false,
      },
      bahasa_sehari_hari: {
        type: Sequelize.STRING(255),
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
      tanggal_lahir: {
        type: Sequelize.DATEONLY,
        allowNull: false,
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
    return queryInterface.dropTable('data_diri')
  },
}
