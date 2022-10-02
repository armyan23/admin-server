'use strict';
import {Model} from 'sequelize';

interface IUserAttributes {
    user_id: number,
    email: string,
    code: string,
}

module.exports = (sequelize: any, DataTypes: any) => {
    class VerifyEmail extends Model<IUserAttributes>
        implements IUserAttributes{

        user_id!: number;
        email!: string;
        code!: string;
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models: any) {
            // define association
            // VerifyEmail.belongsTo(models.User,{
            //     as: "Verify"
            // })
        }
    }

    VerifyEmail.init({
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        code: {
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
    }, {
        sequelize,
        tableName: "verify",
        timestamps: false
    });


    return VerifyEmail;
};