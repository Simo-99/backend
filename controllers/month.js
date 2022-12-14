const { Submit } = require("../models/load");
const sequelize = require("sequelize");
const s = require("../config/db");

exports.pastMonths = async function (req, res) {

    const months = await Submit.findAll({

        group: ['month', 'year'],
        order: [["year", "DESC"], ["month", "DESC"]],
        attributes: ['month', 'year',
            [sequelize.fn('SUM', sequelize.col('new_resources')), 'resources'],
            [sequelize.fn('SUM', sequelize.col('new_points')), 'points'],
            [sequelize.fn('SUM', sequelize.col('new_trophies')), 'trophies']
        ]
    });

    res.send(months);
}

exports.getMonth = async (req, res) => {

    var returned = {};
    if (req.query.y == null) { res.sendStatus(400); return; }

    const submits = await s.query("select month, year, submits.id, resources, new_resources, points, new_points, trophies, new_trophies, name, color, player_id FROM submits inner join players on players.id=submits.player_id where month=" + req.params.month + " and year=" + req.query.y + " order by lower(name)", { type: sequelize.QueryTypes.SELECT });

    if (submits.length < 1) { res.sendStatus(204); return; }

    if (req.query.t === "yes")
        returned.totals = await Submit.findOne({
            group: ['month'],
            attributes: ['month',
                [sequelize.fn('SUM', sequelize.col('new_resources')), 'resources'],
                [sequelize.fn('SUM', sequelize.col('new_points')), 'points'],
                [sequelize.fn('SUM', sequelize.col('new_trophies')), 'trophies']
            ],
            where: { year: req.query.y, month: req.params.month }

        });

    if (req.query.b == "yes") {

        returned.winner_r = submits.sort((a, b) => parseFloat(b.new_resources) - parseFloat(a.new_resources))[0]
        returned.winner_p = submits.sort((a, b) => parseFloat(b.new_points) - parseFloat(a.new_points))[0]
        returned.winner_t = submits.sort((a, b) => parseFloat(b.new_trophies) - parseFloat(a.new_trophies))[0]
    }
    returned.submits = submits


    res.send(returned);

}

