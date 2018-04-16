import Syncano from '@syncano/core';
import helper from './util/helper';

export default async (ctx) => {
  const { response } = new Syncano(ctx);
  const rekognitionHelper = new helper(ctx.config);
  const { maxResults, nextTokens } = ctx.args;

  try {
    const listedCollections = await rekognitionHelper.listCollections(maxResults, nextTokens);

    return response.json({ message: 'List of Collection IDs.', data: listedCollections });
  } catch ({ statusCode = 400, code, message }) {
    return response.json({ statusCode, code, message }, statusCode);
  }
};
