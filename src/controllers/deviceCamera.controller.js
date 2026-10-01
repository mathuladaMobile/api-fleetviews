const deviceCameraService = require("../services/deviceCamera.service");

exports.getDeviceCamera = async (req, res) => {
  try {
    const deviceCamera = await deviceCameraService.getDeviceCamera(req.body);
    if (!deviceCamera) {
      return res.status(404).json({
        success: false,
        message: "Device camera not found",
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
