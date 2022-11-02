'use strict';

import {Model} from 'sequelize';

interface IUserAttributes {
    role: string,
    email: string,
    password: string,
    is_verify: Date,
    deletedAt: Date | null,
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
        role!: string;
        email!: string;
        password!: string;
        is_verify!: Date;
        deletedAt!: Date | null;
        createdAt!: Date;
        updatedAt!: Date

        static associate(models: any) {
            // define association
            const { Company, Employee, VerifyEmail, UserDetails } = models

            this.hasOne(VerifyEmail,{
                as: "Verify",
                foreignKey: "user_id"
            })
            this.hasOne(UserDetails,{
                as: "Details",
                foreignKey: "user_id"
            })
            this.hasMany(Company,{
                foreignKey: "user_id"
            })
            this.hasOne(Employee,{
                as: "Admin",
                foreignKey:"user_id"
            })
            this.hasMany(Employee,{
                as: "CreatorId",
                foreignKey: "creatorId"
            })
        }
    }

    User.init({
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: "email",
                msg: "Email address already in use!"
            },
            validate: {
                isEmail: {
                    msg: "Email don't valid!"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: {
                    args: [6],
                    msg: "Password must be more than 6 characters!"
                },

            }
        },
        is_verify: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        deletedAt: {
            type: DataTypes.DATE,
            field: 'deleted_at'
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
        scopes: {
            deleted: {
                where: {
                    deletedAt: null
                }
            },
            activeUsers: {
                include: [
                    {model: User, where: {is_verify: true}}
                ]
            },
        },
        sequelize,
        tableName: "users",
    });

    return User;
};