'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('verifies', {
      user_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        },
        onDelete: "cascade"
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      code : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // await queryInterface.addConstraint("verifies",{
    //   fields: ["user_id"],
    //   type: "foreign key",
    //   name: "verifies",
    //   references: {
    //     table: "users", field:"id"
    //   },
    //   onUpdate: "cascade",
    //   onDelete: "cascade"
    // })

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('verifies');
  }
};