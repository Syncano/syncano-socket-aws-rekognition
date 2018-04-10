import { assert } from 'chai';
import { run } from '@syncano/test';
import helper from './util/testHelper';

describe('Compare Faces ', () => {
  const { config, image } = helper;
  const { bucketName, imageName3 } = image;
  const sourceBucketName = bucketName;
  const sourceImageName = imageName3;
  const targetBucketName = bucketName;
  const targetImageName = imageName3;

  it('returns faces found', (done) => {
    run('compare-faces', {
      args: {
        sourceImage: sourceImageName,
        sourceBucketName,
        targetImage: targetImageName,
        targetBucketName
      },
      config })
      .then(({ data: response }) => {
        console.log(response.data.FaceMatches, '......');
        assert.property(response, 'message', 'Faces Detected');
        assert.property(response.data, 'FaceMatches');
        assert.isNotEmpty(response.data.FaceMatches);
        done();
      });
  });

  it('returns error message if targetImage name is not provided', (done) => {
    run('compare-faces', { args: { sourceImage: sourceImageName, sourceBucketName }, config })
      .then((response) => {
        assert.property(response.data, 'statusCode', 400);
        assert.property(response.data, 'code', 'InvalidParameterException');
        assert.exists(response, 'message');
        done();
      });
  });
});
