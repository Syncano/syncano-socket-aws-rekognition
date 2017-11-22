import AWS from 'aws-sdk';
import Syncano from 'syncano-server';
import helper from './util/helper';

export default (ctx) => {
  const { response, logger } = Syncano(ctx);

  const log = logger('Socket scope');

  const rekognitionHelper = new helper(ctx.config);

  const createdCollection = rekognitionHelper.createCollection(ctx.args.collectionId);

  return createdCollection
    .then((data) => {
      response.json({
        statusCode: data.StatusCode,
        message: 'Collection Created.',
      });
    })
    .catch((err) => {
      response.json({
        statusCode: err.statusCode,
        code: err.code,
        message: err.message,
      });
    });
};
