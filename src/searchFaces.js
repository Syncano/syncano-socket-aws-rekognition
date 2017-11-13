import AWS from "aws-sdk";
import Syncano from "syncano-server";
import helper from "./util/helper";

export default ctx => {
  const { response, logger } = Syncano(ctx);

  const log = logger("Socket scope");

  const rekognitionHelper = new helper(ctx.config);

  const searchedFaces = rekognitionHelper.searchFaces(
    ctx.args.collectionId,
    ctx.args.faceId,
    parseFloat(ctx.args.faceMatchThreshold),
    Number(ctx.args.maxFaces)
  );

  searchedFaces
    .then(function(data) {
      response.json({
        message: "Faces found.",
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
