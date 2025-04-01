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
    queryInterface.createTable('setelah_pendidikan', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      melanjutkan_ke: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      bekerja_nama_perusahaan: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      bekerja_tanggal_mulai: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      bekerja_penghasilan: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('setelah_pendidikan')
  },
}
