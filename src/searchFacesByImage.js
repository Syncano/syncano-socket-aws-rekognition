import AWS from "aws-sdk";
import Syncano from "syncano-server";
import helper from "./helper";

export default ctx => {
  const { response, logger } = Syncano(ctx);

  const log = logger("Socket scope");

  const rekognitionHelper = new helper(ctx.config);

  const searchedFacesByImage = rekognitionHelper.searchFacesByImage(
    ctx.args.image,
    ctx.args.collectionId,
    ctx.args.faceMatchThreshold,
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
        code: err.code,
        message: err.message
      });
    });
};
