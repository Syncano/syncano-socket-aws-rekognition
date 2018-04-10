import Syncano from '@syncano/core';
import helper from './util/helper';

export default async (ctx) => {
  const { response } = new Syncano(ctx);
  const rekognitionHelper = new helper(ctx.config);
  const { image, bucketName } = ctx.args;

  try {
    const recognizedCelebrities = await rekognitionHelper.recognizeCelebrities(image, bucketName);

    return response.json({ message: 'Recognized Celebrity Information', data: recognizedCelebrities });
  } catch ({ statusCode = 400, code, message }) {
    return response.json({ statusCode, code, message }, statusCode);
  }
};
