const { query } = require("../config/mssqlConfig");

exports.getVideoSystem = async (headers) => {
  try {
    const { id } = headers;

    if (!username || !password) {
      throw new Error("Missing required header: username and password");
    }

    const sql = `
      SELECT *
      FROM VideoSystem
      WHERE id = @VideoSystemId 
    `;

    const rows = await query(sql, {
      id: id,
    });

    return rows[0] || null;
  } catch (error) {
    console.error("Error fetching video system from database:", error);
    throw error;
  }
};
