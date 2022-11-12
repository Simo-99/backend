const controller = require("../controllers/table");
const { helper } = require("../middleware/auth");
const router = require("express").Router();

router
    .get("/:id", helper, controller.getTable)
    .get("/", helper, controller.getTables)
    .put("/:id", helper, controller.updateTable);

module.exports = router;