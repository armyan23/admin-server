'use strict';
import { Model } from 'sequelize';

interface ICompanyRefPerson {
  role: string
  companyId: string
  employeeId: number
  createdAt: Date
  updatedAt: Date
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Company_Employees extends Model<ICompanyRefPerson>
    implements ICompanyRefPerson{
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      role!: string;
      companyId!: string;
      employeeId!: number;
      createdAt!: Date;
      updatedAt!: Date;
      static associate(models: any) {
        // define association here
      }
    }
    Company_Employees.init({
      role:{
        type: DataTypes.STRING,
        allowNull: false
      },
      companyId:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'company_id'
      },
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'employee_id'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    }, {
      sequelize,
      tableName: "company_employees",
    });
    return Company_Employees;
};