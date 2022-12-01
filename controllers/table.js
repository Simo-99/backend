const { Player, Table } = require("../models/load");


exports.getTable = async (req, res) => {

    res.send(await Table.findByPk(req.params.id));

}

exports.updateTable = async (req, res) => {

    const table = await (await Table.findByPk(req.params.id)).update(req.body);

    res.send(table);
}


exports.getTables = async (req, res) => {

    res.send(await Table.findAll({
        include: {
            model: Player,
            where: { inside: 1 },

        },
        order: 'lower(Player.name) ASC'

    }


    ));

}




