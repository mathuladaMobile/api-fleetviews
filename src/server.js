require("dotenv").config();

const app = require("./app");

const { PORT, DB_DATABASE } = process.env;

const mssqlConfig = require("./config/mssqlConfig");

let dbStatus = "disconnected";
// connect main DB
async function startServer() {
  try {
    await mssqlConfig.connectMSSQL();
    dbStatus = `Connected to MSSQL (${DB_DATABASE}) ✅`;

    app.listen(PORT, () => {
      console.log(`Server running on port localhost:${PORT} 🚀`);
    });
  } catch (error) {
    console.error("Error connecting to MSSQL:", error);
    dbStatus = `Error connecting to MSSQL (${DB_DATABASE}) ❌`;
  }

  console.log(dbStatus);
}

startServer();
