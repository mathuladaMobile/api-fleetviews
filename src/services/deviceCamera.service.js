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
