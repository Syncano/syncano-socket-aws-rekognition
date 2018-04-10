import Syncano from '@syncano/core';
import helper from './util/helper';

export default async (ctx) => {
  const { response } = new Syncano(ctx);
  const rekognitionHelper = new helper(ctx.config);
  const { image, bucketName, maxsLabels, minConfidence } = ctx.args;

  try {
    const detectedLabels = await rekognitionHelper.detectLabels(image, bucketName, maxsLabels, minConfidence);

    return response.json({ message: 'Labels Detected', data: detectedLabels });
  } catch ({ statusCode = 400, code, message }) {
    return response.json({ statusCode, code, message }, statusCode);
  }
};
