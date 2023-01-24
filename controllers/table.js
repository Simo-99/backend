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


exports.saveTables= async(req,res)=>{


    const fixedData= Array.from({length: 4}, () => req.body.data.splice(0,4))
  

    fixedData.map(async (player)=>{

        const name=player[0]
        const res=player[1]
        const points=player[2]
        const trophies=player[3]

        const playerToUpdate= await Player.findOne({where: {name: name,inside:1}})
        if (playerToUpdate != null ) 
            try{
                await (await Table.findByPk(playerToUpdate.id)).update({resources: res,points: points,trophies:trophies})
            }catch(error){
            
            }   


    })

    res.status(200).end()
}


