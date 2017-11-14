import AWS from "aws-sdk";
import Syncano from "syncano-server";
import helper from "./util/helper";

export default ctx => {
  const { response, logger } = Syncano(ctx);

  const log = logger("Socket scope");

  const rekognitionHelper = new helper(ctx.config);

  const uploadedImage = rekognitionHelper.confirmImage(
    ctx.args.image,
    ctx.args.bucketName
  );

  const detectedModerationLabels = rekognitionHelper.detectModerationLabels(
    uploadedImage,
    ctx.args.minConfidence
  );

  return detectedModerationLabels
    .then(function(data) {
      response.json({
        message: "Moderation Labels Detected.",
        data
      });
    })
    .catch(function(err) {
      response.json({
        status: err.statusCode,
        code: err.code,
        message: err.message
      });
    });
};
