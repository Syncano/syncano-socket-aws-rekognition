import Syncano from '@syncano/core';
import helper from './util/helper';

export default async (ctx) => {
  const { response } = new Syncano(ctx);
  const rekognitionHelper = new helper(ctx.config);
  const { collectionId } = ctx.args;

  try {
    const { StatusCode: statusCode } = await rekognitionHelper.createCollection(collectionId);

    return response.json({ statusCode, message: 'Collection Created.' });
  } catch ({ statusCode = 400, code, message }) {
    return response.json({ statusCode, code, message }, statusCode);
  }
};
