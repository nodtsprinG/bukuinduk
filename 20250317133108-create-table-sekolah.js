'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Membuat tabel data_sekolah
     */
    return queryInterface.createTable('data_sekolah', {
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
      logo: {
        type: Sequelize.BLOB('long'), // Menyimpan logo dalam format BLOB
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Menghapus tabel data_sekolah
     */
    return queryInterface.dropTable('data_sekolah');
  },
};
