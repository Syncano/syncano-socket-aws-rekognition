import AWS from "aws-sdk";
import Syncano from "syncano-server";
import helper from "./helper";

export default ctx => {
  const { response, logger } = Syncano(ctx);

  const log = logger("Socket scope");

  const rekognitionHelper = new helper(ctx.config);

  const listedCollections = rekognitionHelper.listCollections(
    ctx.args.maxResults,
    ctx.args.nextTokens
  );

  listedCollections
    .then(function(data) {
      log.info(data);
      response.json({
        message: "List of Collection IDs.",
        data
      });
    })
    .catch(function(err) {
      log.info(err);
      response.json({
        status: err.statusCode,
        message: err.message
      });
    });
};
