const express = require("express");
const router = express.Router();

const deviceCameraController = require("../controllers/deviceCamera.controller");

router.get("", deviceCameraController.getDeviceCamera);
router.get("/checkToken", deviceCameraController.checkTokenInDeviceCamera);

module.exports = router;
