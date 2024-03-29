'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        },
        onDelete: "cascade"
      },
      creator_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        },
        onDelete: "cascade"
      },
      first_name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      patronymic:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      role:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      skills:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country:{
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      street_address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image:{
        type: Sequelize.STRING,
      },
      birth_date:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      salary:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      start_work:{
        type: Sequelize.DATE,
        allowNull: false
      },
      end_work: Sequelize.DATE,
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employees');
  }
};