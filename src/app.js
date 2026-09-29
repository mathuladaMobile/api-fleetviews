const express = require("express");
const cors = require("cors");

const { version, name } = require("../package.json");

const app = express();

app.use(cors());
app.use(express.json());

// Root
app.get("/", (req, res) => res.redirect(`/api/v1`));

app.get("/api/v1", (req, res) => {
  res.json({
    success: true,
    message: `${name} v1`,
    version: version || "1.0.0",
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// Register routes
const routes = require("./routes");
app.use(`/api/v1`, routes);

const errorHandler = require("./middlewares/error.middleware");
app.use(errorHandler);

module.exports = app;
