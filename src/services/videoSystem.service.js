const { query } = require("../config/mssqlConfig");

exports.getVideoSystem = async (headers) => {
  try {
    const { id } = headers;

    if (!id) {
      throw new Error("Missing required header: id");
    }

    const sql = `
      SELECT *
      FROM VideoSystem
      WHERE VideoSystemId = @id 
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

exports.updateVideoSystem = async (id, updateData) => {
  try {
    if (!id) {
      throw new Error("Missing required parameter: id");
    }

    const { ApiToken, ApiTokenExpire, Username, Password } = updateData;

    const fields = [];
    const params = { id };

    if (ApiToken !== undefined) {
      fields.push("ApiToken = @ApiToken");
      params.ApiToken = ApiToken;
    }

    if (ApiTokenExpire !== undefined) {
      fields.push("ApiTokenExpire = @ApiTokenExpire");
      params.ApiTokenExpire = ApiTokenExpire;
    }

    if (Username !== undefined) {
      fields.push("Username = @Username");
      params.Username = Username;
    }

    if (Password !== undefined) {
      fields.push("Password = @Password");
      params.Password = Password;
    }

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    const sql = `
      UPDATE VideoSystem
      SET ${fields.join(", ")}
      WHERE VideoSystemId = @id;
    `;

    await query(sql, params);

    return {
      id,
      ...updateData,
    };
  } catch (error) {
    console.error("Error updating video system in database:", error);
    throw error;
  }
};

exports.deleteVideoSystem = async (id) => {
  try {
    if (!id) {
      throw new Error("Missing required parameter: id");
    }
    const sql = `
      UPDATE VideoSystem
      SET Deleted = true
      WHERE VideoSystemId = @id;
    `;
    const result = await query(sql, { id });

    if (result.rowsAffected[0] === 0) {
      return null;
    }
    return { id };
  } catch (error) {
    console.error("Error deleting video system in database:", error);
    throw error;
  }
};
