//! LOADING THE SERVER OBJ WITH DEFAULT CONFIG
const app = require('./config/server');


//* LOADING LOGIN AND LOGOUT ROUTES
app.use(require("./routes/auth"));

//* LOADING SUBMITS ROUTES
app.use("/submits", require("./routes/submit"));

//* LOADING PLAYERS ROUTES
app.use("/players", require("./routes/player"));

//* LOADING MONTHS ROUTES
app.use("/months", require("./routes/month"));

//* LOADING YEARS ROUTES
app.use("/years", require("./routes/year"));

//* LOADING MONTHLY_DATA ROUTES
app.use("/tables", require("./routes/table"));

//* LOADING SPECIAL ROUTES
app.use(require("./routes/extra"));



//# START THE SERVER
const PORT = 3000
app.listen(PORT, () => console.log(`listening at port ${PORT}...`));



