const controller = require("../controllers/player");
const { guest, admin } = require("../middleware/auth");
const router = require("express").Router();

router
    .get("", guest, controller.getPlayers)
    .post("", admin, controller.storePlayer)
    .put("/:id", admin, controller.updatePlayer)
    .delete("/:id", admin, controller.deletePlayer)
    .get("/akas", controller.getAkas)
    .get("/:id", guest, controller.getPlayer)

module.exports = router;