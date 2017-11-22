import { assert, expect } from 'chai';
import { run } from 'syncano-test';
import helper from './util/testHelper';

describe('Detect Faces', () => {
  const config = helper.config;

  it('returns a face details if faces is detected', (done) => {
    run('detectFaces', {
      args: {
        image: helper.image.imageName,
        bucketName: helper.image.bucketName,
      },
      config,
    }).then((response) => {
      assert.property(response.data, 'message', 'Faces Detected.');
      expect(response.data.data)
        .to.have.property('FaceDetails')
        .to.be.an('Array').that.is.not.empty;
      done();
    });
  });

  it('returns an error message if uploaded image is not existing in 3S Bucket', (done) => {
    run('detectFaces', {
      args: {
        image: helper.image.uploadedImage,
        bucketName: helper.image.bucketName,
      },
      config,
    }).then((response) => {
      assert.property(response.data, 'statusCode', 400);
      assert.property(response.data, 'code', 'InvalidS3ObjectException');
      assert.exists(response, 'message');
      done();
    });
  });

  it('returns an error message if image neither contains S3 object or bytes ', (done) => {
    run('detectFaces', {
      args: {
        image: '',
      },
      config,
    }).then((response) => {
      assert.property(response.data, 'statusCode', 400);
      assert.property(response.data, 'code', 'InvalidParameterException');
      assert.exists(response, 'message');
      done();
    });
  });
});
