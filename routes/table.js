const controller = require("../controllers/table");
const { helper } = require("../middleware/auth");
const router = require("express").Router();

router
    .get("/", helper, controller.getTables)
    .get("/:id", helper, controller.getTable)
    .put("/:id", helper, controller.updateTable);

module.exports = router;