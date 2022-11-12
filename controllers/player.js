const { Player, Submit, Table } = require("../models/load");

exports.getPlayer = async (req, res) => {

    p = await Player.findByPk(req.params.id);

    if (req.query.s == "yes") {
        submits = await Submit.findAll({ where: { player_id: p.id }, order: [['year', 'DESC'], ['month', 'DESC']], raw: true });

        await Promise.all(submits.map(async (submit) => {

            resources = await Submit.findOne({
                attributes: ["player_id", "new_resources"],
                where: { month: submit.month, year: submit.year },
                order: [["new_resources", "DESC"], ["new_points", "DESC"]],
                raw: true
            })

            points = await Submit.findOne({
                attributes: ["player_id", "new_points"],
                where: { month: submit.month, year: submit.year },
                order: [["new_points", "DESC"], ["new_resources", "DESC"]],
                raw: true
            })

            trophies = await Submit.findOne({
                attributes: ["player_id", "new_trophies"],
                where: { month: submit.month, year: submit.year },
                order: [["new_trophies", "DESC"], ["new_resources", "DESC"]],
                raw: true
            })

            submit.winner_r = resources.player_id == submit.player_id
            submit.winner_p = points.player_id == submit.player_id
            submit.winner_t = trophies.player_id == submit.player_id

        }));



        res.send({ player: p, submits: submits });

    }
    else res.send(p);

}

exports.getPlayers = async (req, res) => {

    if (req.query.s == 'hidden') res.send(await Player.findAll({ where: { inside: 0 } }));
    else if (req.query.s == 'active') res.send(await Player.findAll({ where: { inside: 1 } }));
    else res.send(await Player.findAll());
}

exports.updatePlayer = async (req, res) => {

    const player = await Player.findByPk(req.params.id);

    await player.update(req.body);

    res.send(player);
}

exports.deletePlayer = async (req, res) => {

    const player = await Player.findByPk(req.params.id);

    await player.destroy();
    await (await Table.findByPk(req.params.id)).destroy();

    res.sendStatus(200);

}

exports.storePlayer = async (req, res) => {

    r = await Player.create(req.body);

    await Table.create({ player: r.id, resources: 0, trophies: 0, points: 0 });

    res.send(r);

}
