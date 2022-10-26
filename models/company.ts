'use strict';
import {Model, UUIDV4} from 'sequelize';

interface ICompanyAttributes {
    id: string,
    user_id: number,
    nameCompany: string,
    aboutCompany: string,
    typeCompany: string,
    phoneNumber: string,
    email: string,
    website: string,
    createdAt: Date,
    updatedAt: Date,
}

module.exports = (sequelize: any, DataTypes: any) => {
  class CompanyDetails extends Model<ICompanyAttributes>
      implements ICompanyAttributes{
        /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
        id!: string;
        user_id!: number;
        nameCompany!: string;
        aboutCompany!: string;
        typeCompany!: string;
        phoneNumber!: string;
        email!: string;
        website!: string;
        createdAt!: Date;
        updatedAt!: Date;

        static associate(models: any) {

            // const { Employee, CompanyRefPerson } = models;
          // define association
          // CompanyDetails.belongsTo(models.User,{
          //     as: "Verify"
          // })
          //   CompanyDetails.belongsToMany(Employee,{
          //       as: "EmployeeRef",
          //       through: CompanyRefPerson,
          //       foreignKey: "company_id",
          //       // otherKey: "person_id"
          //   })
        }
  }

  CompanyDetails.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    nameCompany: {
      type: DataTypes.STRING,
      field: "name_company"
    },
    aboutCompany: {
      type: DataTypes.STRING,
      field: "about_company"
    },
    typeCompany:{
      type: DataTypes.STRING,
      field: "type_company"
    },
    phoneNumber:{
      type: DataTypes.STRING,
      allowNull: false,
      field: "phone_number"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    sequelize,
    tableName: "companies",
  });

  return CompanyDetails;
};