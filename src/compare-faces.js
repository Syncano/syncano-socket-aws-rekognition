import Syncano from '@syncano/core';
import helper from './util/helper';

export default async (ctx) => {
  const { response } = new Syncano(ctx);
  const rekognitionHelper = new helper(ctx.config);
  const { sourceImage, sourceBucketName, targetImage, targetBucketName, similarityThreshold } = ctx.args;

  try {
    const comparedFaces = await rekognitionHelper
      .compareFaces(sourceImage, sourceBucketName, targetImage, targetBucketName, similarityThreshold);

    return response.json({ message: 'Faces Detected', data: comparedFaces });
  } catch ({ statusCode = 400, code, message }) {
    return response.json({ statusCode, code, message }, statusCode);
  }
};
