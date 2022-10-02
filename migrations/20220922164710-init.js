'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        allowNull: false,
        // type: Sequelize.UUID,
        // defaultValue: Sequelize.UUIDV4,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_verify: {
        type: Sequelize.DATE,
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

    // THIS PART FOR CONNECTED OTHER FIELDS
    await queryInterface.createTable('verify', {
      user_id: {
        primaryKey: true,
        allowNull: false,

        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        }
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
    },{
      timestamps: false
    });


    // usery jnjeluc kjnje ira het kapvac amen inch
    // await queryInterface.addConstraint("verify",{
    //   fields:["user_id"],
    //   type: "foreign key",
    //   name: "",
    //   references: {table: "user",field: "id"},
    //   onDelete: "cascade",
    //   onUpdate: "cascade"
    // })
    // await queryInterface.createTable('video', {
    //   id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER
    //   },
    //   title: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //
    //   channel_id: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     references: {
    //       model: "channel",
    //       key: "id"
    //     }
    //   },
    //   create_at: {
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   },
    //   updated_at: {
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   }
    // });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  }
};

// THIS PART FOR PASSWORD
// const bcrypt = require("bcrypt");
//
// module.exports = function(sequelize, DataTypes) {
//   const User = sequelize.define('users', {
//     annotation_id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     firstName: {
//       type: DataTypes.DATE,
//       field: 'first_name'
//     },
//     lastName: {
//       type: DataTypes.DATE,
//       field: 'last_name'
//     },
//     email: DataTypes.STRING,
//     password: DataTypes.STRING
//   }, {
//     freezeTableName: true,
//     instanceMethods: {
//       generateHash(password): Promise<string> {
//         return bcrypt.hash(password, bcrypt.genSaltSync(8));
//       },
//       validPassword(password) : Promise<boolean> {
//         return bcrypt.compare(password, this.password);
//       }
//     }
//   });
//
//   return User;
// }