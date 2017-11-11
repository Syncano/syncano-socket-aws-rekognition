import AWS from "aws-sdk";
import Syncano from "syncano-server";
import helper from "./helper";

export default ctx => {
  const { response, logger } = Syncano(ctx);

  const log = logger("Socket scope");

  const rekognitionHelper = new helper(ctx.config);

  const recognizedCelebrities = rekognitionHelper.recognizeCelebrities(
    ctx.args.image
  );

  recognizedCelebrities
    .then(function(data) {
      response.json({
        message: "Recognized Celebrity Faces",
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
