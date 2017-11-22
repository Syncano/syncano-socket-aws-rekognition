import AWS from 'aws-sdk';
import Syncano from 'syncano-server';
import helper from './util/helper';

export default (ctx) => {
  const { response, logger } = Syncano(ctx);

  const log = logger('Socket scope');

  const rekognitionHelper = new helper(ctx.config);

  const searchedFacesByImage = rekognitionHelper.searchFacesByImage(
    ctx.args.collectionId,
    ctx.args.faceMatchThreshold,
    ctx.args.image,
    ctx.args.bucketName,
    ctx.args.maxFaces,
  );

  return searchedFacesByImage
    .then((data) => {
      response.json({
        message: 'Found Faces by Image.',
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
