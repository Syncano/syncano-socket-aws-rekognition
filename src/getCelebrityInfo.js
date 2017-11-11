import AWS from "aws-sdk";
import Syncano from "syncano-server";
import helper from "./helper";

export default ctx => {
  const { response, logger } = Syncano(ctx);

  const log = logger("Socket scope");

  const rekognitionHelper = new helper(ctx.config);

  const celebrityInfo = rekognitionHelper.getCelebrityInfo(
    ctx.config.celebrityId
  );

  celebrityInfo
    .then(function(data) {
      response.json({
        message: "Celebrity Information",
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
