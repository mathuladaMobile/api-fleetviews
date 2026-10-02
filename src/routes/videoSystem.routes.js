const express = require("express");
const router = express.Router();

const controller = require("../controllers/videoSystem.controller");

router.get("/:id", controller.getVideoSystem);

module.exports = router;
