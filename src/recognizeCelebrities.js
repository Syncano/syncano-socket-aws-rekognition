import AWS from 'aws-sdk';
import Syncano from 'syncano-server';
import helper from './util/helper';

export default (ctx) => {
  const { response, logger } = Syncano(ctx);

  const log = logger('Socket scope');

  const rekognitionHelper = new helper(ctx.config);

  const recognizedCelebrities = rekognitionHelper.recognizeCelebrities(
    ctx.args.image,
    ctx.args.bucketName,
  );
  return recognizedCelebrities
    .then((data) => {
      response.json({
        message: 'Recognized Celebrity Information',
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
