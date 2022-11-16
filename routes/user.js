const controller = require("../controllers/user");
const { admin } = require("../middleware/auth");
const router = require("express").Router();

router
    .post("", admin, controller.storeUser)
    .put("/:id", admin, controller.updateUser)
    .delete("/:id", admin, controller.deleteUser);

module.exports = router;