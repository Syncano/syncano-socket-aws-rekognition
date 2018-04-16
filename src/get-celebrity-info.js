import Syncano from '@syncano/core';
import helper from './util/helper';

export default async (ctx) => {
  const { response } = new Syncano(ctx);
  const rekognitionHelper = new helper(ctx.config);
  const { celebrityId } = ctx.args;

  try {
    const celebrityInfo = await rekognitionHelper.getCelebrityInfo(celebrityId);

    return response.json({ message: 'Celebrity Information', data: celebrityInfo });
  } catch ({ statusCode = 400, code, message }) {
    return response.json({ statusCode, code, message });
  }
};
