const express = require("express");
const router = express.Router();

const deviceCameraController = require("../controllers/deviceCamera.controller");

router.get("", deviceCameraController.getDeviceCamera);

module.exports = router;
