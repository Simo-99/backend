const jwt = require('jsonwebtoken');
const User = require("../models/Users");
const Token = require("../models/Tokens");

User.hasMany(Token, { foreignKey: 'user_id' })
Token.belongsTo(User, { foreignKey: 'user_id' })

exports.guest = async (req, res, next) => {

    const auth = req.headers["authorization"];
    const token = auth && auth.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    const token_db = await Token.findOne({ where: { token: token }, include: User });
    if (token_db == null) return res.sendStatus(401).json();

    jwt.verify(token, token_db.User.token_gen, (err, user) => {
        if (err) {
            token_db.destroy();
            res.send(err.message)

        }
        else next();
    });

}

exports.admin = async (req, res, next) => {

    const auth = req.headers["authorization"];
    const token = auth && auth.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    const token_db = await Token.findOne({ where: { token: token }, include: User });
    if (token_db == null || token_db.User.is_admin < 1) return res.sendStatus(401).json();


    jwt.verify(token, token_db.User.token_gen, (err, user) => {
        if (err) {
            token_db.destroy();
            res.send(err.message)

        }
        else next();
    });

}