'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('company_employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role:{
        allowNull: false,
        type: Sequelize.STRING
      },
      company_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "companies",
          key: 'id'
        },
        onDelete: "cascade"
      },
      employee_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "employees",
          key: 'id'
        },
        onDelete: "cascade"
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('company_employees');
  }
};