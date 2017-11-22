import AWS from 'aws-sdk';
import Syncano from 'syncano-server';
import helper from './util/helper';

export default (ctx) => {
  const { response, logger } = Syncano(ctx);

  const log = logger('Socket scope');

  const rekognitionHelper = new helper(ctx.config);

  const celebrityInfo = rekognitionHelper.getCelebrityInfo(ctx.args.celebrityId);

  return celebrityInfo
    .then((data) => {
      response.json({
        message: 'Celebrity Information',
        data,
      });
    })
    .catch((err) => {
      response.json({
        code: err.code,
        message: err.message,
      });
    });
};
