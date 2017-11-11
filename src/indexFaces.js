import AWS from "aws-sdk";
import Syncano from "syncano-server";
import helper from "./util/helper";

export default ctx => {
  const { response, logger } = Syncano(ctx);

  const log = logger("Socket scope");

  const rekognitionHelper = new helper(ctx.config);

  const collectionId = "phabbs";
  const image = {
    S3Object: {
      Bucket: "callen-images",
      Name: "15933917_10154895257699860_1500047717_o.jpg",
      Version: "null"
    }
  };

  // const indexedFaces = rekognitionHelper.indexFaces(
  //   ctx.args.collectionId,
  //   ctx.args.image,
  //   ctx.args.detectionAttributes,
  //   ctx.args.externalImageId
  // );

  return indexedFaces
    .then(function(data) {
      log.info(data);
      response.json({
        message: "Found Faces by Image.",
        data
      });
    })
    .catch(function(err) {
      log.info(err);
      response.json({
        code: err.code,
        message: err.message
      });
    });
};
