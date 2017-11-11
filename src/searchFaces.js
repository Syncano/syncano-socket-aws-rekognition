import AWS from "aws-sdk";
import Syncano from "syncano-server";
import helper from "./util/helper";

export default ctx => {
  const { response, logger } = Syncano(ctx);

  const log = logger("Socket scope");

  const rekognitionHelper = new helper(ctx.config);

  const collectionId = "phabbs";
  const faceId = "629e696f-0456-5bd5-aa49-50847570a653";

  const searchedFaces = rekognitionHelper.searchFaces(collectionId, faceId);

  // const searchedFaces = rekognitionHelper.searchFaces(
  //   ctx.args.collectionId,
  //   ctx.args.faceId,
  //   ctx.args.faceMatchThreshold,
  //   ctx.args.maxFaces
  // );

  searchedFaces
    .then(function(data) {
      log.info(data);
      response.json({
        message: "Faces found.",
        data
      });
    })
    .catch(function(err) {
      log.info(err);
      response.json({
        message: err.message,
        statusCode: err.statusCode
      });
    });
};
