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

    return queryInterface.createTable('admin', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: 'username',
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(5),
        allowNull: true,
      },
      role: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'admin',
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
    return queryInterface.dropTable('admin')
  },
}
