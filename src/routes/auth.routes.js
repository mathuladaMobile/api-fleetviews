const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/login", authController.verifyPassword);
router.post("/register", authController.registerUser);

module.exports = router;
