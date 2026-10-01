const service = require("../services/videoSystem.service");

exports.getVideoSystem = async (req, res) => {
  try {
    if (
      !req.body ||
      !req.body.Username ||
      !req.body.Password ||
      !req.body.ApiToken
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required parameters: Username, Password, and ApiToken",
      });
    }

    const videoSystem = await service.getVideoSystem(req.body);

    if (!videoSystem) {
      return res.status(404).json({
        success: false,
        message: "Video system not found",
      });
    }

    if (
      videoSystem.ApiTokenExpire &&
      new Date(videoSystem.ApiTokenExpire) < new Date()
    ) {
      return res.status(401).json({
        success: false,
        message: "ApiToken has expired",
      });
    }

    res.status(200).json({
      success: true,
      data: videoSystem,
    });
  } catch (error) {
    console.error("Error fetching video system:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
