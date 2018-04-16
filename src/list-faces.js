import Syncano from '@syncano/core';
import helper from './util/helper';

export default async (ctx) => {
  const { response } = new Syncano(ctx);
  const rekognitionHelper = new helper(ctx.config);
  const { collectionId, maxResults, nextTokens } = ctx.args;

  try {
    const listedFaces = await rekognitionHelper.listFaces(collectionId, maxResults, nextTokens);

    return response.json({ message: 'List of Faces.', data: listedFaces });
  } catch ({ statusCode = 400, code, message }) {
    return response.json({ statusCode, code, message }, statusCode);
  }
};
