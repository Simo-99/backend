const { Submit } = require("../models/load");
const sequelize = require("sequelize");

exports.getYears = async function (req, res) {

    const years = await Submit.findAll({

        group: ['year'],
        order: [["year", "DESC"]],
        attributes: ['year',
            [sequelize.fn('SUM', sequelize.col('new_resources')), 'resources'],
            [sequelize.fn('SUM', sequelize.col('new_points')), 'points'],
            [sequelize.fn('SUM', sequelize.col('new_trophies')), 'trophies']
        ]
    });

    res.send(years);
}

exports.getYear = async (req, res) => {

    var returned = {};

    if (req.params.year == null) { return res.sendStatus(400); }

    returned.submits = await Submit.findAll({
        group: ['month', "year"],
        attributes: ['month', 'year',
            [sequelize.fn('SUM', sequelize.col('new_resources')), 'resources'],
            [sequelize.fn('SUM', sequelize.col('new_points')), 'points'],
            [sequelize.fn('SUM', sequelize.col('new_trophies')), 'trophies']
        ],
        where: { year: req.params.year },
        order: [["month", "DESC"]]

    });


    if (returned?.submits.length < 1) { return res.sendStatus(200); }

    if (req.query.t == "yes")
        returned.totals = await Submit.findOne({
            group: ['year'],
            attributes: [
                [sequelize.fn('SUM', sequelize.col('new_resources')), 'resources'],
                [sequelize.fn('SUM', sequelize.col('new_points')), 'points'],
                [sequelize.fn('SUM', sequelize.col('new_trophies')), 'trophies']
            ],
            where: { year: req.params.year }

        });


    res.json(returned);


}

