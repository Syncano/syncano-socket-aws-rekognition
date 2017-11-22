import AWS from 'aws-sdk';
import Syncano from 'syncano-server';
import helper from './util/helper';

export default (ctx) => {
  const { response, logger } = Syncano(ctx);

  const log = logger('Socket scope');

  const rekognitionHelper = new helper(ctx.config);

  const detectedLabels = rekognitionHelper.detectLabels(
    ctx.args.image,
    ctx.args.bucketName,
    ctx.args.maxsLabels,
    ctx.args.minConfidence,
  );

  return detectedLabels
    .then((data) => {
      response.json({
        message: 'Labels Detected',
        data,
      });
    })
    .catch((err) => {
      response.json({
        status: err.statusCode,
        code: err.code,
        message: err.message,
      });
    });
};
