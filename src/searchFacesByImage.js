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

  const searchedFacesByImage = rekognitionHelper.searchFacesByImage(
    ctx.args.collectionId,
    ctx.args.faceMatchThreshold,
    uploadedImage,
    ctx.args.maxFaces
  );

  return searchedFacesByImage
    .then(function(data) {
      log.info(data);
      response.json({
        message: "Found Faces by Image.",
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
