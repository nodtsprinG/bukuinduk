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
    await queryInterface.createTable('nilai_merdeka', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      r: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      keterangan: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      mapel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mapel',
          key: 'id',
        },
      },
      semester: {
        type: Sequelize.INTEGER,
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
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('nilai_merdeka')
  },
}
