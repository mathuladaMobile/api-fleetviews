const { query } = require("../config/mssqlConfig");

exports.getVideoSystem = async (body) => {
  try {
    const { Username, Password, ApiToken } = body;

    const sql = `
      SELECT *
      FROM VideoSystem
      WHERE Username = @Username AND Password = @Password AND ApiToken = @ApiToken
    `;

    const rows = await query(sql, {
      Username: Username,
      Password: Password,
      ApiToken: ApiToken,
    });

    return rows[0] || null;
  } catch (error) {
    console.error("Error fetching video system from database:", error);
    throw error;
  }
};
