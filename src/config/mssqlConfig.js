const sql = require("mssql");

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
} = process.env;

const databaseConfig = {
  server: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: Number(DB_PORT),

  options: {
    encrypt: false,
    trustServerCertificate: true,
  },

  pool: {
    max: 15,
    min: 0,
    idleTimeoutMillis: 30000,
  },

  connectionTimeout: 10000,
  requestTimeout: 30000,
};

const pool = new sql.ConnectionPool(databaseConfig);

const connectMSSQL = async () => {
  try {
    await pool.connect();

    console.log("✅ MSSQL Connected");
  } catch (err) {
    console.log("DB_HOST", DB_HOST ? `${DB_HOST} ✅` : "not set ❌");
    console.log("DB_USER", DB_USER ? `${DB_USER} ✅` : "not set ❌");
    console.log("DB_PASSWORD", DB_PASSWORD ? "set ✅" : "not set ❌");
    console.log(
      "DB_DATABASE",
      DB_DATABASE ? `${DB_DATABASE} ✅` : "not set ❌",
    );
    console.log("DB_PORT", DB_PORT ? `${DB_PORT} ✅` : "not set ❌");

    throw err;
  }
};

const query = async (sqlQuery, params = {}) => {
  try {
    const request = pool.request();

    Object.entries(params).forEach(([key, value]) => {
      request.input(key, value);
    });

    const result = await request.query(sqlQuery);

    return result.recordset;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  sql,
  pool,
  query,
  connectMSSQL,
};