'use strict';

import {Model, UUIDV4} from 'sequelize';

interface IUserAttributes {
    id: string,
    name: string,
    email: string,
    password: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date
}

module.exports = (sequelize: any, DataTypes: any) => {
    class User extends Model<IUserAttributes>
        implements IUserAttributes{

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id!: string;
        name!: string;
        email!: string;
        password!: string;
        isActive!: boolean;
        createdAt!: Date;
        updatedAt!: Date

        static associate(models: any) {
            // define association
            User.belongsToMany(models.Project, {
                through: "ProjectAssignments"
            })
        }
    }

    User.init({
        id:{
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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
        tableName: "users",
    });


    return User;
};