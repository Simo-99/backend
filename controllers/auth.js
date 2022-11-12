require('dotenv').config();

const jwt = require('jsonwebtoken');
var crypto = require('crypto');

const User = require("../models/Users");
const Token = require("../models/Tokens");



User.hasMany(Token, { foreignKey: 'user_id' })
Token.belongsTo(User, { foreignKey: 'user_id' })

exports.login = async (req, res) => {

    const username = req.body.username;
    const psw = crypto.createHash('sha256').update(req.body.password).digest('hex');

    const user = await User.findOne({ where: { username: username, password: psw } });
    if (user == null) return res.status(401).json();

    const accessToken = jwt.sign({
        user: user, exp: Math.floor(Date.now() / 1000) + (60 * 60),
        iat: Math.floor(Date.now())
    }, user.token_gen);

    await Token.create({ user_id: user.id, token: accessToken })


    res.json({ token: accessToken, user: { is_admin: user.is_admin } });

}

exports.logout = async (req, res) => {

    const auth = req.headers["authorization"];
    const token = auth && auth.split(" ")[1];

    Token.findOne({ where: { token: token } }).destroy();

}

