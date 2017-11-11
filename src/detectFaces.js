import AWS from "aws-sdk";
import Syncano from "syncano-server";
import helper from "./helper";

export default ctx => {
  const { response, logger } = Syncano(ctx);

  const log = logger("Socket scope");

  const rekognitionHelper = new helper(ctx.config);

  const detectedFaces = rekognitionHelper.detectFaces(
    ctx.args.image,
    ctx.args.attr
  );

  detectedFaces
    .then(function(data) {
      response.json({
        message: "Faces Detected",
        data
      });
    })
    .catch(function(err) {
      response.json({
        statusCode: err.statusCode,
        message: "Requested image should either contain bytes or s3 object."
      });
    });
};
