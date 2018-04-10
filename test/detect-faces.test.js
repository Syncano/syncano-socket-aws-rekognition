import { assert, expect } from 'chai';
import { run } from '@syncano/test';
import helper from './util/testHelper';

describe('Detect Faces', () => {
  const { config, image } = helper;
  const { imageName, uploadedImage, bucketName } = image;

  it('returns a face details if faces is detected', (done) => {
    run('detect-faces', { args: { image: imageName, bucketName }, config })
      .then(({ data }) => {
        assert.property(data, 'message', 'Faces Detected.');
        expect(data.data)
          .to.have.property('FaceDetails')
          .to.be.an('Array').that.is.not.empty;
        done();
      });
  });

  it('returns an error message if uploaded image is not existing in 3S Bucket', (done) => {
    run('detect-faces', { args: { image: uploadedImage, bucketName }, config })
      .then((response) => {
        assert.property(response.data, 'statusCode', 400);
        assert.property(response.data, 'code', 'InvalidS3ObjectException');
        assert.exists(response, 'message');
        done();
      });
  });

  it('returns an error message if image neither contains S3 object or bytes ', (done) => {
    run('detect-faces', { args: { image: '' }, config })
      .then((response) => {
        assert.property(response.data, 'statusCode', 400);
        assert.property(response.data, 'code', 'InvalidParameterException');
        assert.exists(response, 'message');
        done();
      });
  });
});
