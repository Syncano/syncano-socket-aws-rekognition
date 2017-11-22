import AWS from 'aws-sdk';
import Syncano from 'syncano-server';
import helper from './util/helper';

export default (ctx) => {
  const { response, logger } = Syncano(ctx);

  const log = logger('Socket scope');

  const rekognitionHelper = new helper(ctx.config);

  const deletedFaces = rekognitionHelper.deleteFaces(ctx.args.collectionId, ctx.args.faceId);

  return deletedFaces
    .then((data) => {
      response.json({
        message: 'Deleted Faces.',
        data,
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
