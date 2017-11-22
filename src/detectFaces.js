import AWS from 'aws-sdk';
import Syncano from 'syncano-server';
import helper from './util/helper';

export default (ctx) => {
  const { response, logger } = Syncano(ctx);

  const log = logger('Socket scope');

  const rekognitionHelper = new helper(ctx.config);

  const detectedFaces = rekognitionHelper.detectFaces(
    ctx.args.image,
    ctx.args.bucketName,
    ctx.args.attr,
  );

  return detectedFaces
    .then((data) => {
      response.json({
        message: 'Faces Detected',
        data,
      });
    })
    .catch((err) => {
      response.json({
        statusCode: 400,
        code: err.code,
        message: err.message,
      });
    });
};
