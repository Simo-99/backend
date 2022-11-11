require('dotenv').config();

const Player = require("../models/Players");
const Submit = require("../models/Submits");

Player.hasMany(Submit, { foreignKey: 'player_id' });
Submit.belongsTo(Player, { foreignKey: 'player_id' });

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


    var resources = parseInt(req.body.resources);
    var points = parseInt(req.body.points);
    var trophies = parseInt(req.body.trophies);
    var id = req.body.player_id;

    lastMonthData = Submit.findOne({ where: { player_id: id }, order: [["id", "DESC"]] });

    new_resources = lastMonthData?.resources ? resources - lastMonthData.resources : resources;
    new_points = lastMonthData?.points ? points - lastMonthData.resources : points;
    new_trophies = lastMonthData?.trophies ? trophies - lastMonthData.trophies : trophies;

    month = (req.body["month"] ? req.body["month"] : month_prev);
    year = (req.body["year"] ? req.body["year"] : year_prev);



    r = Submit.create({
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

    res.send(r);
    //! NEED TO CLEAN THE PLAYER'S ROW INTO THE TEMP TABLE ///
    //!
    //!
    //!
    //! //////////////////////////////////////////////////////
}
