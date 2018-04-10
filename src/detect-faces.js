import Syncano from '@syncano/core';
import helper from './util/helper';

export default async (ctx) => {
  const { response } = new Syncano(ctx);
  const rekognitionHelper = new helper(ctx.config);
  const { image, bucketName, attr } = ctx.args;

  try {
    const detectedFaces = await rekognitionHelper.detectFaces(image, bucketName, attr);

    return response.json({ message: 'Faces Detected', data: detectedFaces });
  } catch ({ statusCode = 400, code, message }) {
    return response.json({ statusCode, code, message }, statusCode);
  }
};
