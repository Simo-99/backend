const Player = require("./Players");
const Submit = require("./Submits");
const Table = require("./tables");

Player.hasMany(Submit, { foreignKey: 'player_id' });
Submit.belongsTo(Player, { foreignKey: 'player_id' });

Player.hasOne(Table, { foreignKey: 'player' });
Table.belongsTo(Player, { foreignKey: 'player' });


module.exports = { Player, Submit, Table };