const { DataTypes, Model } = require('sequelize');

class Token extends Model { }

Token.init({

    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    user_id: DataTypes.INTEGER,
    token: DataTypes.TEXT,

}, { sequelize: require('../config/db'), tableName: 'tokens', modelName: "Token", });

module.exports = Token;