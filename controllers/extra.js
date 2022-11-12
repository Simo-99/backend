const { Player, Submit } = require("../models/load");


exports.getWinners = async (req, res) => {

    const months = await Submit.findAll({
        order: [["year", "DESC"], ["month", "DESC"]],
        group: ["year", "month"],
        attributes: ["month", "year"]

    });

    const winners = [];


    for (let i = 0; i < months.length; i++) {


        const resources = await Submit.findOne({
            include: { model: Player, as: "player", attributes: ['id', 'name', 'color'] },
            where: { year: months[i].year, month: months[i].month },
            order: [["new_resources", "DESC"], ["new_points", "DESC"]],
            attributes: ["month", "year"]
        })

        const points = await Submit.findOne({
            include: { model: Player, as: "player", attributes: ['id', 'name', 'color'] },
            where: { year: months[i].year, month: months[i].month },
            order: [["new_points", "DESC"], ["new_resources", "DESC"]],
            attributes: ["month", "year"]
        })


        winners[i] = {

            'year': months[i].year,
            'month': months[i].month,
            'res': resources,
            'points': points,

        };
    }

    res.send(winners);
}


