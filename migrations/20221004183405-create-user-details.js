'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_details', {
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
      first_name: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      phone_number : {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      country : {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      city : {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      birth_date  : {
        type: Sequelize.DATE,
        // allowNull: false,
      },
    },{
      timestamps: false
    });

    // await queryInterface.addConstraint("user_details",{
    //   fields: ["user_id"],
    //   type: "foreign key",
    //   name: "user_details",
    //   references: {
    //     table: "users", field:"id"
    //   },
    //   onUpdate: "cascade",
    //   onDelete: "cascade"
    // })

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_details');
  }
};