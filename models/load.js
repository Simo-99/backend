const Player = require("./Players");
const Submit = require("./Submits");
const Table = require("./tables");
const User = require("./Users");
const Token = require("./Tokens");

//* DECLARING THE RELATION BETWEEN PLAYERS AND SUBMITS
Player.hasMany(Submit, { as: "submits", foreignKey: 'player_id' });
Submit.belongsTo(Player, { as: "player", foreignKey: 'player_id' });

//* DECLARING THE RELATION BETWEEN PLAYERS AND TABLES
Player.hasOne(Table, { as: "table", foreignKey: 'player' });
Table.belongsTo(Player, { foreignKey: 'player' });

//* DECLARING THE RELATION BETWEEN USERS AND TOKENS
User.hasMany(Token, { as: "tokens", foreignKey: 'user_id' });
Token.belongsTo(User, { as: "user", foreignKey: 'user_id' });

module.exports = { Player, Submit, Table, User, Token };