import Syncano from '@syncano/core';
import helper from './util/helper';

export default async (ctx) => {
  const { response } = new Syncano(ctx);
  const rekognitionHelper = new helper(ctx.config);
  const { collectionId, image, bucketName, detectionAttributes, externalImageId } = ctx.args;

  try {
    const indexedFaces = await rekognitionHelper
      .indexFaces(collectionId, image, bucketName, detectionAttributes, externalImageId);

    return response.json({ message: 'Faces detected for indexing.', data: indexedFaces });
  } catch ({ statusCode = 400, code, message }) {
    return response.json({ statusCode, code, message }, statusCode);
  }
};
