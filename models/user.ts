'use strict';

import {Model} from 'sequelize';

interface IUserAttributes {
    role: string,
    email: string,
    password: string,
    is_verify: Date,
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
        createdAt!: Date;
        updatedAt!: Date

        static associate(models: any) {
            // define association
            this.hasOne(models.VerifyEmail,{
                as: "Verify",
                foreignKey: "user_id"
            })
            this.hasOne(models.UserDetails,{
                as: "Details",
                foreignKey: "user_id"
            })
            // TODO: hasMany DONT WORK
            this.hasMany(models.CompanyDetails,{
                as: "Company",
                foreignKey: "user_id"
            })
            // User.hasOne(models.UserDetails,{
            //     as: "Details",
            //     foreignKey: "user_id"
            // })
            // /// ete verifyic uzer chenq uzena vercnel apa petq che nerqevi toxy grel
            // models.verifyEmail.hasOne(User,{as: "User"})
            // User.belongsToMany(models.Project, {
            //     through: "ProjectAssignments"
            // })
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