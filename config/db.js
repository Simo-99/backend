const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const s = new Sequelize(process.env.DB_CONNECTION_URL, {
    define: { timestamps: false, },
    logging: false,
});



module.exports = s;
