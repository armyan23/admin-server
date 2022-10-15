'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
        type: Sequelize.DATE,
      },
    },{
      timestamps: false
    });

    await queryInterface.addColumn('companies', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: "cascade"
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('companies');
  }
};