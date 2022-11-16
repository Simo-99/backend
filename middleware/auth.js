const jwt = require('jsonwebtoken');
const { User, Token } = require("../models/load");


exports.guest = async (req, res, next) => {

    const auth = req.headers["authorization"];
    const token = auth && auth.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    const token_db = await Token.findOne({ where: { token: token }, include: { model: User, as: "user" } });
    if (token_db == null) return res.sendStatus(401).json();

    jwt.verify(token, token_db.user.token_gen, (err, user) => {
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

    const token_db = await Token.findOne({ where: { token: token }, include: { model: User, as: "user" } });
    if (token_db == null || token_db.user.role < 2) return res.sendStatus(401).json();


    jwt.verify(token, token_db.user.token_gen, (err, user) => {
        if (err) {
            token_db.destroy();
            res.send(err.message)

        }
        else next();
    });

}

exports.helper = async (req, res, next) => {

    const auth = req.headers["authorization"];
    const token = auth && auth.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    const token_db = await Token.findOne({ where: { token: token }, include: User });
    if (token_db == null || token_db.user.role < 1) return res.sendStatus(401).json();

    jwt.verify(token, token_db.user.token_gen, (err, user) => {
        if (err) {
            token_db.destroy();
            res.send(err.message)

        }
        else next();
    });

}