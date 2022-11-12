const controller = require("../controllers/extra");
const { guest } = require("../middleware/auth");
const router = require("express").Router();

router
    .get("/winners", guest, controller.getWinners);

module.exports = router;