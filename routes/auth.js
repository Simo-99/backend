const controller = require("../controllers/auth");
const router = require("express").Router();


router
    .post("/login", controller.login)
    .post("/logout", controller.logout);

module.exports = router;