const { DataTypes, Model } = require('sequelize');

class Submit extends Model { }

Submit.init({

    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    player_id: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,

    resources: DataTypes.INTEGER,
    new_resources: DataTypes.INTEGER,
    points: DataTypes.INTEGER,
    new_points: DataTypes.INTEGER,
    trophies: DataTypes.INTEGER,
    new_trophies: DataTypes.INTEGER,
},
    { sequelize: require('../config/db'), tableName: 'submits' }

);


module.exports = Submit;