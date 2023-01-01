const { Player, Submit, Table } = require("../models/load");


exports.getSubmit = async (req, res) => {

    if (req.query.p == 'yes') res.send(await Submit.findByPk(req.params.id, { include: { model: Player, as: "player" } }));
    else res.send(await Submit.findByPk(req.params.id));

}

exports.updateSubmit = async (req, res) => {

    const submit = await Submit.findByPk(req.params.id);

    await submit.update(req.body);

    res.send(submit);
}

exports.deleteSubmit = async (req, res) => {

    const submit = await Submit.findByPk(req.params.id);

    await submit.destroy();

    res.sendStatus(200);

}

exports.storeSubmit = async (req, res) => {

    var submit = { month: 0, year: 0, player_id: 0, resources: 0, points: 0, trophies: 0, new_resources: 0, new_points: 0, new_trophies: 0 }

    const new_resources = parseInt(req.body.resources);
    const new_points = parseInt(req.body.points);
    const new_trophies = parseInt(req.body.trophies);
    const id = req.body.player_id;

    const lastMonthData = await Submit.findOne({ where: { player_id: id }, order: [["year", "DESC"], ["month", "DESC"]] });
    const player = await Player.findOne({ where: { id: id } });

    const last_res = lastMonthData?.resources ? lastMonthData.resources : player.start_res;
    const last_points = lastMonthData?.points ? lastMonthData.points : player.start_points;
    const last_trophies = lastMonthData?.trophies ? lastMonthData.trophies : player.start_trophies;
    const days_inside = Math.round((Date.parse(new Date().toJSON().slice(0, 10)) - Date.parse(player.date)) / (1000 * 60 * 60 * 24))

    submit.resources = new_resources;
    submit.trophies = new_trophies;
    submit.points = new_points;
    submit.new_resources = Math.round(lastMonthData?.resources ? (new_resources - last_res) : (new_resources - last_res) / (days_inside) * 30);
    submit.new_trophies = Math.round(lastMonthData?.trophies ? (new_trophies - last_trophies) : (new_trophies - last_trophies) / (days_inside) * 30);
    submit.new_points = Math.round(lastMonthData?.points ? (new_points - last_points) : (new_points - last_points) / (days_inside) * 30);
    submit.month = req.body.month;
    submit.year = req.body.year;
    submit.player_id = id;

    const r = await Submit.create(submit);

    //await (await Table.findByPk(id)).update({ resources: 0, trophies: 0, points: 0 });

    res.send(r);

}


exports.confirmTables = async (req, res) => {

    if (req.body.month == null || req.body.year == null) return res.sendStatus(400)
    const actives = await Player.findAll({ where: { inside: 1 } })

    actives.map(async (active) => {

        const submitToSave = await Table.findByPk(active.id)

        const new_resources = submitToSave.resources
        const new_points = submitToSave.points;
        const new_trophies = submitToSave.trophies;
        const id = submitToSave.player;

        const lastMonthData = await Submit.findOne({ where: { player_id: id }, order: [["year", "DESC"], ["month", "DESC"]] });
        const player = await Player.findOne({ where: { id: id } });

        const last_res = lastMonthData?.resources ? lastMonthData.resources : player.start_res;
        const last_points = lastMonthData?.points ? lastMonthData.points : player.start_points;
        const last_trophies = lastMonthData?.trophies ? lastMonthData.trophies : player.start_trophies;
        const days_inside = Math.round((Date.parse(new Date().toJSON().slice(0, 10)) - Date.parse(player.date)) / (1000 * 60 * 60 * 24))

        var submit = {}

        submit.resources = new_resources;
        submit.trophies = new_trophies;
        submit.points = new_points;
        submit.new_resources = Math.round(lastMonthData?.resources ? (new_resources - last_res) : (new_resources - last_res) / (days_inside) * 30);
        submit.new_trophies = Math.round(lastMonthData?.trophies ? (new_trophies - last_trophies) : (new_trophies - last_trophies) / (days_inside) * 30);
        submit.new_points = Math.round(lastMonthData?.points ? (new_points - last_points) : (new_points - last_points) / (days_inside) * 30);
        submit.month = req.body.month;
        submit.year = req.body.year;
        submit.player_id = id;

        const r = await Submit.create(submit);

        //await (await Table.findByPk(id)).update({ resources: 0, trophies: 0, points: 0 });



    })



    res.sendStatus(200);


}