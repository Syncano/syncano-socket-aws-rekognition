import Syncano from '@syncano/core';
import helper from './util/helper';

export default async (ctx) => {
  const { response } = new Syncano(ctx);
  const rekognitionHelper = new helper(ctx.config);
  const { collectionId, faceId } = ctx.args;

  try {
    const deletedFaces = await rekognitionHelper.deleteFaces(collectionId, faceId);

    return response.json({ message: 'Deleted Faces.', data: deletedFaces });
  } catch ({ statusCode = 400, code, message }) {
    return response.json({ statusCode, code, message }, statusCode);
  }
};
