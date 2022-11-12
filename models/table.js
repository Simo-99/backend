const { DataTypes, Model } = require('sequelize');

class Table extends Model { }

Table.init({

    player: { primaryKey: true, type: DataTypes.INTEGER },

    resources: DataTypes.INTEGER,
    points: DataTypes.INTEGER,
    trophies: DataTypes.INTEGER,
},
    { sequelize: require('../config/db'), tableName: 'monthly_data' }

);

module.exports = Table;