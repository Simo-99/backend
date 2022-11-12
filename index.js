//! LOADING THE SERVER OBJ WITH DEFAULT CONFIG
app = require('./config/server');


//* LOADING LOGIN AND LOGOUT ROUTES
app.use(require("./routes/auth"));

//* LOADING SUBMITS ROUTES
app.use("/submits", require("./routes/submit"));

//* LOADING PLAYERS ROUTES
app.use("/players", require("./routes/player"));



//# START THE SERVER
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`listening at port ${PORT}...`));



