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

  const indexedFaces = rekognitionHelper.indexFaces(
    ctx.args.collectionId,
    uploadedImage,
    ctx.args.detectionAttributes,
    ctx.args.externalImageId
  );

  return indexedFaces
    .then(function(data) {
      return response.json({
        message: "Faces detected for indexing.",
        data
      });
    })
    .catch(function(err) {
      return response.json({
        statusCode: err.statusCode,
        code: err.code,
        message: err.message
      });
    });
};
