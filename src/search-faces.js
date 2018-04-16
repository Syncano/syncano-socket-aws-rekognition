import Syncano from '@syncano/core';
import helper from './util/helper';

export default async (ctx) => {
  const { response } = new Syncano(ctx);
  const rekognitionHelper = new helper(ctx.config);
  const { collectionId, faceId, faceMatchThreshold, maxFaces } = ctx.args;

  try {
    const searchedFaces = await rekognitionHelper.searchFaces(collectionId, faceId, faceMatchThreshold, maxFaces);

    return response.json({ message: 'Faces found.', data: searchedFaces });
  } catch ({ statusCode = 400, code, message }) {
    return response.json({ statusCode, code, message }, statusCode);
  }
};
