import AWS from "aws-sdk";
import Syncano from "syncano-server";
import helper from "./util/helper";

export default ctx => {
  const { response, logger } = Syncano(ctx);

  const log = logger("Socket scope");

  const rekognitionHelper = new helper(ctx.config);

  const sourceUploadedImage = rekognitionHelper.confirmImage(
    ctx.args.sourceImage,
    ctx.args.sourceBucketName
  );

  const targetUploadedImage = rekognitionHelper.confirmImage(
    ctx.args.targetImage,
    ctx.args.targetBucketName
  );

  const comparedFaces = rekognitionHelper.compareFaces(
    sourceUploadedImage,
    targetUploadedImage,
    ctx.args.similarityThreshold
  );
  return comparedFaces
    .then(function(data) {
      response.json({
        message: "Faces Detected",
        data
      });
    })
    .catch(function(err) {
      response.json({
        statusCode: err.statusCode || 400,
        code: err.code,
        message: err.message
      });
    });
};
