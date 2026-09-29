const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/basicAuth.middleware");
const printRouter = require("../utils/routeLogger");

const authRoutes = require("./auth.routes");

router.use("/auth", authRoutes);
router.use(authMiddleware); // Apply authentication middleware to all routes

console.log("\n📌 Registered API Routes");
printRouter("/api/v1/auth", authRoutes);

module.exports = router;
