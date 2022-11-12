const controller = require("../controllers/year");
const { guest } = require("../middleware/auth");
const router = require("express").Router();

router
    .get("", guest, controller.getYears)
    .get("/:year", guest, controller.getYear);

module.exports = router;