import AWS from "aws-sdk";
import Syncano from "syncano-server";
import helper from "./helper";

export default ctx => {
  const { response, logger } = Syncano(ctx);

  const log = logger("Socket scope");

  const rekognitionHelper = new helper(ctx.config);

  const createdCollection = rekognitionHelper.createCollection(
    ctx.args.collectionId
  );

  createdCollection
    .then(function(data) {
      response.json({
        statusCode: data.StatusCode,
        message: "Collection Created."
      });
    })
    .catch(function(err) {
      response.json({
        statusCode: err.statusCode,
        message: "Please Enter a CollectionId!"
      });
    });
};
