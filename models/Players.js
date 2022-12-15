const { DataTypes, Model } = require('sequelize');

class Player extends Model { }

Player.init({

    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    color: { type: DataTypes.STRING, defaultValue: "#000000" },
    inside: { type: DataTypes.INTEGER, defaultValue: 1 },
    start_res: { type: DataTypes.INTEGER, defaultValue: 0 },
    start_points: { type: DataTypes.INTEGER, defaultValue: 0 },
    start_trophies: { type: DataTypes.INTEGER, defaultValue: 0 },
    date: { type: DataTypes.STRING },
    akas: { type: DataTypes.STRING, default: "" },
    name: DataTypes.STRING

},
    { sequelize: require('../config/db'), tableName: 'players' }

);

module.exports = Player;