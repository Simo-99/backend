const controller = require("../controllers/month");
const { guest } = require("../middleware/auth");
const router = require("express").Router();

router
    .get("", guest, controller.pastMonths)
    .get("/:month", guest, controller.getMonth);

module.exports = router;