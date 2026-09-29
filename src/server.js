require("dotenv").config();

const app = require("./app");

const { PORT, DB_DATABASE } = process.env;

const mssqlConfig = require("./config/mssqlConfig");

let dbStatus = "disconnected";
// connect main DB
async function startServer() {
  try {
    await mssqlConfig.connectMSSQL();
    dbStatus = `Database : ${DB_DATABASE}`;

    app.listen(PORT, () => {
      console.log(`Server   : localhost:5001`);
      console.log("Status   : Running 🟢");
      console.log("────────────────────────────────\n");
    });
  } catch (error) {
    console.error("Error connecting to MSSQL:", error);
    dbStatus = `Error connecting to MSSQL (${DB_DATABASE}) ❌`;
  }

  console.log(dbStatus);
}

startServer();
