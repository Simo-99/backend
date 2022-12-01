const { Player, Table } = require("../models/load");
const sequelize = require("sequelize");
const s = require("../config/db");


exports.getTable = async (req, res) => {

    res.send(await Table.findByPk(req.params.id));

}

exports.updateTable = async (req, res) => {

    const table = await (await Table.findByPk(req.params.id)).update(req.body);

    res.send(table);
}


exports.getTables = async (req, res) => {

    const tables = await s.query("select * FROM monthly_data INNER JOIN players ON player = players.id WHERE players.inside = 1 order by lower(name)", { type: sequelize.QueryTypes.SELECT });
    res.send(tables);

}




