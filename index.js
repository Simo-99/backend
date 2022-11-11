const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
    next();
})

//* LOGIN AND LOGOUT ROUTES
app.use(require("./routes/auth"));

//* SUBMITS ROUTES
app.use("/submits", require("./routes/submit"));

//* PLAYERS ROUTES
app.use("/players", require("./routes/player"));

//# START THE SERVER
app.listen(88, () => console.log("listening at port 88...."));



