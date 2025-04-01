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
    return queryInterface.createTable('tempat_tinggal', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      alamat: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      no_telepon: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      tinggal_dengan: {
        type: Sequelize.ENUM('ortu', 'saudara', 'lainnya', 'wali'),
        allowNull: false,
      },
      jarak_ke_sekolah: {
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
    return queryInterface.dropTable('tempat_tinggal')
  },
}
