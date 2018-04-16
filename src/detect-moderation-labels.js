import Syncano from '@syncano/core';
import helper from './util/helper';

export default async (ctx) => {
  const { response } = new Syncano(ctx);
  const rekognitionHelper = new helper(ctx.config);
  const { image, bucketName, minConfidence } = ctx.args;

  try {
    const detectedModerationLabels = await rekognitionHelper.detectModerationLabels(image, bucketName, minConfidence);

    return response.json({ message: 'Moderation Labels Detected.', data: detectedModerationLabels });
  } catch ({ statusCode = 400, code, message }) {
    return response.json({ statusCode, code, message }, statusCode);
  }
};
