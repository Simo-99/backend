const { DataTypes, Model } = require('sequelize');

class Player extends Model { }

Player.init({

    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    color: { type: DataTypes.STRING, defaultValue: "#000000" },
    inside: { type: DataTypes.INTEGER, defaultValue: 1 },
    name: DataTypes.STRING

},
    { sequelize: require('../database/db'), tableName: 'players' }

);

module.exports = Player;