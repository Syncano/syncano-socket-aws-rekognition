import { assert, expect } from 'chai';
import { run } from '@syncano/test';
import helper from './util/testHelper';

describe('Detect Labels', () => {
  const { config, image } = helper;
  const { imageName, uploadedImage, bucketName } = image;

  it('returns details of labels if detected', (done) => {
    run('detect-labels', { args: { image: imageName, bucketName }, config })
      .then((response) => {
        assert.property(response.data, 'message', 'Labels Detected.');
        expect(response.data.data)
          .to.have.property('Labels')
          .to.be.an('Array').that.is.not.empty;
        done();
      });
  });

  it('returns an error message if uploaded image is not existing in 3S Bucket', (done) => {
    run('detect-labels', { args: { bucketName, image: uploadedImage }, config })
      .then((response) => {
        assert.property(response.data, 'statusCode', 400);
        assert.property(response.data, 'code', 'InvalidS3ObjectException');
        assert.exists(response, 'message');
        done();
      });
  });

  it('returns an error message if argument parameter is not entered  ', (done) => {
    run('detect-labels', { args: {}, config })
      .then((response) => {
        assert.property(response.data, 'code', 'InvalidParameterType');
        assert.exists(response, 'message');
        done();
      });
  });

  it('returns an error message if imageUrl is invalid ', (done) => {
    run('detect-labels', { args: { image: helper.image.invalidUrl }, config })
      .then((response) => {
        assert.property(response.data, 'code', 'InvalidParameterType');
        assert.exists(response, 'message');
        done();
      });
  });
});
