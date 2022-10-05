'use strict';

import {Model} from 'sequelize';

interface IDetailsAttributes {
    user_id: number,
    firstName: string,
    lastName: string,
    gender: string,
    phoneNumber: number,
    country: string,
    city: string,
    birthDate: Date,
}

module.exports = (sequelize: any, DataTypes: any) => {
    class UserDetails extends Model<IDetailsAttributes>
        implements IDetailsAttributes{

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        user_id!: number;
        firstName!: string;
        lastName!: string;
        gender!: string;
        phoneNumber!: number;
        country!: string;
        city!: string;
        birthDate!: Date;

        static associate(models: any) {
            // define association
            // User.hasOne(models.VerifyEmail,{
            //     as: "Verify",
            //     foreignKey: "user_id"
            // })
            // User.hasOne(models.VerifyEmail,{
            //     as: "Gender",
            //     foreignKey: "user_id"
            // })
            // UserDetails.belongsToMany(models.Project, {
            //     through: "ProjectAssignments"
            // })
        }
    }

    UserDetails.init({
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        firstName: {
            type: DataTypes.STRING,
            // allowNull: false,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING,
            // allowNull: false,
            field: 'last_name'
        },
        gender: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            field: 'phone_number'
        },
        country: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        birthDate: {
            type: DataTypes.DATE,
            field: 'birth_date'
        },
    }, {
        sequelize,
        tableName: "user_details",
        timestamps: false
    });


    return UserDetails;
};