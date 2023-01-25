'use strict';
import {Model} from 'sequelize';

interface IVerifyAttributes {
    user_id: number,
    email: string,
    code: string,
    createdAt: Date,
    updatedAt: Date
}

module.exports = (sequelize: any, DataTypes: any) => {
    class VerifyEmail extends Model<IVerifyAttributes>
        implements IVerifyAttributes{

        user_id!: number;
        email!: string;
        code!: string;
        createdAt!: Date;
        updatedAt!: Date;
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
            references: {
                model: "users",
                key: "id",
            },
            onDelete: "Cascade",
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
        tableName: "verifies",
    });


    return VerifyEmail;
};