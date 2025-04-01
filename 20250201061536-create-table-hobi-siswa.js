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
    return queryInterface.createTable('hobi_siswa', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      kesenian: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      olahraga: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      organisasi: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      lain_lain: {
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
    return queryInterface.dropTable('hobi_siswa')
  },
}
