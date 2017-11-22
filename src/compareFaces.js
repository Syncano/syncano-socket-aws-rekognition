import AWS from 'aws-sdk';
import Syncano from 'syncano-server';
import helper from './util/helper';

export default (ctx) => {
  const { response, logger } = Syncano(ctx);

  const log = logger('Socket scope');

  const rekognitionHelper = new helper(ctx.config);

  const comparedFaces = rekognitionHelper.compareFaces(
    ctx.args.sourceImage,
    ctx.args.sourceBucketName,
    ctx.args.targetImage,
    ctx.args.targetBucketName,
    ctx.args.similarityThreshold,
  );
  return comparedFaces
    .then((data) => {
      response.json({
        message: 'Faces Detected',
        data,
      });
    })
    .catch((err) => {
      response.json({
        statusCode: err.statusCode || 400,
        code: err.code,
        message: err.message,
      });
    });
};
