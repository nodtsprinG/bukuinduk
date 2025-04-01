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
    return queryInterface.createTable('kesehatan', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      gol_darah: {
        type: Sequelize.ENUM('A', 'B', 'O', 'AB'),
        allowNull: true,
      },
      penyakit_pernah_diderita: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      kelainan_jasmani: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      tinggi: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      berat_badan: {
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
    return queryInterface.dropTable('kesehatan')
  },
}
