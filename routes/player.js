const controller = require("../controllers/player");
const { guest, admin } = require("../middleware/auth");
const router = require("express").Router();

router
    .get("", guest, controller.getPlayers)
    .get("/:id", guest, controller.getPlayer)
    .post("", admin, controller.storePlayer)
    .put("/:id", admin, controller.updatePlayer)
    .delete("/:id", admin, controller.deletePlayer)
    .get("/akas", admin, controller.getAkas)

module.exports = router;