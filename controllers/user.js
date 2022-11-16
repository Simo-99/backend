var crypto = require('crypto');
const { User } = require("../models/load");

exports.updateUser = async (req, res) => {

    const user = await User.findByPk(req.params.id);

    if (!user) { res.status(404).send("User not found"); return; }
    if (req.body.password) req.body.password = crypto.createHash('sha256').update(req.body.password).digest('hex');

    await user.update(req.body);

    res.send(user);
}

exports.deleteUser = async (req, res) => {

    const user = await User.findByPk(req.params.id);

    await user.destroy();

    res.sendStatus(200);

}

exports.storeUser = async (req, res) => {

    req.body.password = crypto.createHash('sha256').update(req.body.password).digest('hex');

    r = await User.create(req.body);
    res.send(r);

}

