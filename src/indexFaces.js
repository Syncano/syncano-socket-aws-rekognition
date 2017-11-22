import AWS from 'aws-sdk';
import Syncano from 'syncano-server';
import helper from './util/helper';

export default (ctx) => {
  const { response, logger } = Syncano(ctx);

  const log = logger('Socket scope');

  const rekognitionHelper = new helper(ctx.config);

  const indexedFaces = rekognitionHelper.indexFaces(
    ctx.args.collectionId,
    ctx.args.image,
    ctx.args.bucketName,
    ctx.args.detectionAttributes,
    ctx.args.externalImageId,
  );

  return indexedFaces
    .then(data => response.json({
      message: 'Faces detected for indexing.',
      data,
    }))
    .catch(err => response.json({
      statusCode: err.statusCode,
      code: err.code,
      message: err.message,
    }));
};
