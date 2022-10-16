'use strict';
import {Model} from 'sequelize';

interface ICompanyAttributes {
  user_id: number,
  nameCompany: string,
  aboutCompany: string,
  typeCompany: string,
  phoneNumber: string,
  email: string,
  website: string,
  createdAt: Date,
}

module.exports = (sequelize: any, DataTypes: any) => {
  class CompanyDetails extends Model<ICompanyAttributes>
      implements ICompanyAttributes{
        /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
        user_id!: number;
        nameCompany!: string;
        aboutCompany!: string;
        typeCompany!: string;
        phoneNumber!: string;
        email!: string;
        website!: string;
        createdAt!: Date;

        static associate(models: any) {
          // define association
          // CompanyDetails.belongsTo(models.User,{
          //     as: "Verify"
          // })
        }
  }

  CompanyDetails.init({
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
      type: DataTypes.DATE,
      field: "created_at"
    },
  }, {
    sequelize,
    tableName: "companies",
    timestamps: false
  });

  return CompanyDetails;
};