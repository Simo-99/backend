const controller = require("../controllers/submit");
const { guest, admin } = require("../middleware/auth");

const router = require("express").Router();

router
    .get("/:id", guest, controller.getSubmit)
    .post("/", admin, controller.storeSubmit)
    .put("/:id", admin, controller.updateSubmit)
    .delete("/:id", admin, controller.deleteSubmit);

module.exports = router;