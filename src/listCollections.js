import AWS from "aws-sdk";
import Syncano from "syncano-server";
import helper from "./util/helper";

export default ctx => {
  const { response, logger } = Syncano(ctx);

  const log = logger("Socket scope");

  const rekognitionHelper = new helper(ctx.config);

  const listedCollections = rekognitionHelper.listCollections(
    ctx.args.maxResults,
    ctx.args.nextTokens
  );

  return listedCollections
    .then(function(data) {
      response.json({
        message: "List of Collection IDs.",
        data
      });
    })
    .catch(function(err) {
      response.json({
        status: err.statusCode,
        code: err.code,
        message: err.message
      });
    });
};
