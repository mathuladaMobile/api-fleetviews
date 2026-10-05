const service = require("../services/videoSystem.service");

exports.getVideoSystem = async (req, res) => {
  try {
    const videoSystem = await service.getVideoSystem(req.params);

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

exports.updateVideoSystem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameter: id",
      });
    }

    const updatedVideoSystem = await service.updateVideoSystem(id, updateData);

    if (!updatedVideoSystem) {
      return res.status(404).json({
        success: false,
        message: "Video system not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedVideoSystem,
    });
  } catch (error) {
    console.error("Error updating video system:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
