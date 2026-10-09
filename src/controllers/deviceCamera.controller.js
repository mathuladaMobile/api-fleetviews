const deviceCameraService = require("../services/deviceCamera.service");

exports.getDeviceCamera = async (req, res) => {
  try {
    const { serialno } = req.headers;

    const deviceCamera = await deviceCameraService.getDeviceCamera(serialno);
    if (!deviceCamera) {
      return res.status(404).json({
        success: false,
        message: "Device camera not found",
        data: { serialno },
      });
    }
    res.status(200).json({
      success: true,
      data: deviceCamera,
    });
  } catch (error) {
    console.error("Error fetching device camera:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

exports.checkTokenInDeviceCamera = async (req, res) => {
  try {
    const { token } = req.headers;
    const deviceCamera =
      await deviceCameraService.checkTokenInDeviceCamera(token);
    if (!deviceCamera) {
      return res.status(404).json({
        success: false,
        message: "Token is not valid or device camera not found",
        data: { token },
      });
    }
    res.status(200).json({
      success: true,
      message: "Token is valid!",
    });
  } catch (error) {
    console.error("Error checking token in device camera:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
