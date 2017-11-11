import AWS from "aws-sdk";
import Syncano from "syncano-server";
import helper from "./helper";

export default ctx => {
  const { response, logger } = Syncano(ctx);

  const log = logger("Socket scope");

  const rekognitionHelper = new helper(ctx.config);

  const detectedLabels = rekognitionHelper.detectLabels(
    ctx.args.image,
    ctx.args.maxsLabels,
    ctx.args.minConfidence
  );

  detectedLabels
    .then(function(data) {
      log.info(data);
      response.json({
        message: "Faces Detected",
        data
      });
    })
    .catch(function(err) {
      response.json({
        status: err.statusCode,
        message: err.message
      });
    });
};
