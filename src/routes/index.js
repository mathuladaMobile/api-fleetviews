const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/basicAuth.middleware");
const printRouter = require("../utils/routeLogger");

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");

router.use("/auth", authRoutes);
router.use(authMiddleware); // Apply authentication middleware to all routes
router.use("/users", userRoutes);

console.log("\n📌 Registered API Routes");
printRouter("/api/v1/auth", authRoutes);
printRouter("/api/v1/users", userRoutes);
console.log();

module.exports = router;
