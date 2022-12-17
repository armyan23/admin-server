'use strict';
import { Model } from 'sequelize';

interface IEmployeeAttributes {
  user_id: number | null,
  creatorId: number,
  email: string,
  firstName: string,
  lastName: string,
  patronymic: string,
  role: string,
  skills: string,
  phoneNumber: string,
  gender: string,
  country: string,
  city: string,
  streetAddress: string,
  image: string,
  birthDate: Date,
  startWork: Date,
  endWork: Date,
  createdAt: Date,
  updatedAt: Date,
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Employee extends  Model<IEmployeeAttributes>
    implements IEmployeeAttributes {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      user_id!: number;
      creatorId!: number;
      email!: string;
      firstName!: string;
      lastName!: string;
      patronymic!: string;
      role!: string;
      skills!: string;
      phoneNumber!: string;
      gender!: string;
      country!: string;
      city!: string;
      streetAddress!: string;
      image!: string;
      birthDate!: Date;
      startWork!: Date;
      endWork!: Date;
      createdAt!: Date;
      updatedAt!: Date;
      static associate(models: any) {
        // define association here
        const { Company, Company_Employees, User } = models;

        this.belongsToMany(Company, {
          as: 'Company',
          foreignKey: 'employeeId',
          through: Company_Employees,
        });

        this.belongsTo(User,{
          as: "Admin",
          foreignKey: "user_id"
        })

        this.belongsTo(User,{
          as: "CreatorId",
          foreignKey:"creatorId"
        })
      }
    }
    Employee.init({
      user_id: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      creatorId: {
        type: DataTypes.INTEGER,
        field: "creator_id"
      },
      email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Email don't valid!"
          }
        }
      },
      firstName:{
        type: DataTypes.STRING,
        allowNull: false,
        field: "first_name"
      },
      lastName:{
        type: DataTypes.STRING,
        allowNull: false,
        field: "last_name"
      },
      patronymic:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      role:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      skills:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "phone_number"
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country:{
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      streetAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "street_address"
      },
      image: {
        type: DataTypes.STRING,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "birth_date"
      },
      startWork:{
        type: DataTypes.DATE,
        allowNull: false,
        field: "start_work"
      },
      endWork: {
        type: DataTypes.DATE,
        field: "end_work"
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
    }, {
      sequelize,
      tableName: "employees",
    });
    return Employee;
};