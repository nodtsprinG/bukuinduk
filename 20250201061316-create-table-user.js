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

    return queryInterface.createTable('user', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nisn: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: 'nisn',
      },
      angkatan_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'angkatan',
          key: 'id',
        },
      },
      jurusan_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'jurusan',
          key: 'id',
        },
      },
      token: {
        type: Sequelize.STRING(255),
        allowNull: true,
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
    return queryInterface.dropTable('user')
  },
}
