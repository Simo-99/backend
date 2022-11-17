const controller = require("../controllers/auth");
const router = require("express").Router();


router
    .post("/login", controller.login)
    .post("/logout", guest, controller.logout);

module.exports = router;