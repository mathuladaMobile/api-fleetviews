const { query } = require("../config/mssqlConfig");

exports.getDeviceCamera = async (serialno) => {
  try {
    if (!serialno) {
      throw new Error("Missing required parameter: serialno");
    }

    const sql = `
      SELECT *
      FROM DeviceCamera
      WHERE SerialNo = @SerialNo
    `;

    const rows = await query(sql, {
      SerialNo: serialno,
    });

    return rows[0] || null;
  } catch (error) {
    console.error("Error fetching deviceCamera from database:", error);
    throw error;
  }
};

exports.checkTokenInDeviceCamera = async (token) => {
  try {
    if (!token) {
      throw new Error("Missing required parameter: token");
    }
    const sql = `
      SELECT *
      FROM DeviceCamera
      WHERE Token = @Token
    `;
    const rows = await query(sql, {
      Token: token,
    });
    return rows[0] || null;
  } catch (error) {
    console.error("Error checking token in deviceCamera from database:", error);
    throw error;
  }
};
