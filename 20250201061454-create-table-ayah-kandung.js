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
    return queryInterface.createTable('ayah_kandung', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nama: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      tempat_lahir: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      tanggal_lahir: {
        type: Sequelize.DATEONLY,
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
      pendidikan: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      pekerjaan: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      pengeluaran_per_bulan: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      alamat: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      no_telepon: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('masih hidup', 'meninggal'),
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
    return queryInterface.dropTable('ayah_kandung')
  },
}
