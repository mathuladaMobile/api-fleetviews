const { query } = require("../config/mssqlConfig");

exports.getDeviceCamera = async (body) => {
  try {
    if (!body || !body.SerialNo || !body.Token) {
      throw new Error("Missing required parameter: SerialNo and Token");
    }

    const sql = `
      SELECT *
      FROM DeviceCamera
      WHERE SerialNo = @SerialNo AND Token = @Token
    `;

    const rows = await query(sql, {
      SerialNo: body.SerialNo,
      Token: body.Token,
    });

    return rows[0] || null;
  } catch (error) {
    console.error("Error fetching deviceCamera from database:", error);
    throw error;
  }
};
