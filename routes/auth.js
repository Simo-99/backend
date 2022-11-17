const controller = require("../controllers/auth");
const router = require("express").Router();
const { guest } = require("../middleware/auth");

router
    .post("/login", controller.login)
    .post("/logout", controller.logout);

module.exports = router;