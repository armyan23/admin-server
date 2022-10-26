'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('companies', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
      },
      name_company: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      about_company: {
        type: Sequelize.STRING,
      },
      type_company:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone_number:{
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });

    await queryInterface.addColumn('companies', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      // onDelete: "cascade"
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('companies');
  }
};