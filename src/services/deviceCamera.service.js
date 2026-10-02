const { query } = require("../config/mssqlConfig");

exports.getDeviceCamera = async (headers) => {
  try {
    const { serialno, token } = headers;
    if (!serialno || !token) {
      throw new Error("Missing required header: serialno and token");
    }

    const sql = `
      SELECT *
      FROM DeviceCamera
      WHERE SerialNo = @SerialNo AND Token = @Token
    `;

    const rows = await query(sql, {
      SerialNo: serialno,
      Token: token,
    });

    return rows[0] || null;
  } catch (error) {
    console.error("Error fetching deviceCamera from database:", error);
    throw error;
  }
};
