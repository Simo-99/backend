const { Player, Submit, Table } = require("../models/load");


exports.getSubmit = async (req, res) => {

    if (req.query.p == 'yes') res.send(await Submit.findByPk(req.params.id, { include: Player }));
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

    const day = new Date();
    day.setMonth(day.getMonth() - 1);
    const month_prev = day.getMonth();
    const year_prev = day.getFullYear();

    const resources = parseInt(req.body.resources);
    const points = parseInt(req.body.points);
    const trophies = parseInt(req.body.trophies);
    const id = req.body.player_id;

    const lastMonthData = await Submit.findOne({ where: { player_id: id }, order: [["year", "DESC"], ["month", "DESC"]] });

    const new_resources = lastMonthData.resources ? resources - lastMonthData.resources : resources;
    const new_points = lastMonthData.points ? points - lastMonthData.points : points;
    const new_trophies = lastMonthData.trophies ? trophies - lastMonthData.trophies : trophies;
    const month = req.body["month"] ? req.body["month"] : month_prev;
    const year = req.body["year"] ? req.body["year"] : year_prev;

    r = await Submit.create({
        'month': month,
        'year': year,
        'player_id': id,
        'resources': resources,
        'points': points,
        'new_resources': new_resources,
        'new_points': new_points,
        'trophies': trophies,
        'new_trophies': new_trophies
    });

    await (await Table.findByPk(id)).update({ resources: 0, trophies: 0, points: 0 });

    res.send(r);

}
