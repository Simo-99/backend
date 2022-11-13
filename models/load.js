const Player = require("./Players");
const Submit = require("./Submits");
const Table = require("./tables");

Player.hasMany(Submit, { as: "submits", foreignKey: 'player_id' });
Submit.belongsTo(Player, { as: "player", foreignKey: 'player_id' });

Player.hasOne(Table, { as: "table", foreignKey: 'player' });
Table.belongsTo(Player, { as: "player", foreignKey: 'player' });


module.exports = { Player, Submit, Table };