import Syncano from '@syncano/core';
import helper from './util/helper';

export default async (ctx) => {
  const { response } = new Syncano(ctx);
  const rekognitionHelper = new helper(ctx.config);
  const { collectionId, faceMatchThreshold, image, bucketName, maxFaces } = ctx.args;

  try {
    const searchedFacesByImage = await rekognitionHelper
      .searchFacesByImage(collectionId, faceMatchThreshold, image, bucketName, maxFaces);

    return response.json({ message: 'Found Faces by Image.', data: searchedFacesByImage });
  } catch ({ statusCode = 400, code, message }) {
    return response.json({ statusCode, code, message }, statusCode);
  }
};
