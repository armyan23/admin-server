'use strict';
import {Model} from 'sequelize';

interface ICompanyAttributes {
    user_id: number,
    nameCompany: string,
    aboutCompany: string,
    typeCompany: string,
    phoneNumber: string,
    image: string,
    email: string,
    website: string,
    createdDate: Date,
    createdAt: Date,
    updatedAt: Date,
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Company extends Model<ICompanyAttributes>
        implements ICompanyAttributes {
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
        image!: string;
        email!: string;
        website!: string;
        createdDate!: Date;
        createdAt!: Date;
        updatedAt!: Date;

        static associate(models: any) {
            // define association here
            const {Employee, Company_Employees} = models;

            this.belongsToMany(Employee, {
                as: 'employee',
                foreignKey: 'companyId',
                through: Company_Employees,
            });
        }
    }

    Company.init({
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: "users",
                key: "id",
            },
            onDelete: "Cascade",
        },
        nameCompany: {
            type: DataTypes.STRING,
            field: "name_company"
        },
        aboutCompany: {
            type: DataTypes.STRING,
            field: "about_company"
        },
        typeCompany: {
            type: DataTypes.STRING,
            field: "type_company"
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "phone_number"
        },
        image: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        website: {
            type: DataTypes.STRING,
        },
        createdDate:{
            type: DataTypes.DATE,
            field: 'created_date'
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
    return Company;
};