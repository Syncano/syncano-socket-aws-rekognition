import { assert, expect } from 'chai';
import { run } from 'syncano-test';
import helper from './util/testHelper';

describe('Delete Faces', () => {
  const config = helper.config;
  const bucketName = helper.image.bucketName;
  const imageName = helper.image.imageName;

  it('index faces in provided collectionId', (done) => {
    run('indexFaces', {
      args: {
        image: imageName,
        bucketName,
        collectionId: helper.collectionIds.collectionId1,
      },
      config,
    }).then((response) => {
      assert.property(response.data, 'message', 'Faces detected for indexing.');
      expect(response.data.data)
        .to.have.property('FaceRecords')
        .to.be.an('Array').that.is.not.empty;
      done();
    });
  });

  it('returns missing parameter error when no collectionId is provided', (done) => {
    run('indexFaces', {
      args: {
        image: imageName,
        bucketName,
      },
      config,
    }).then((response) => {
      assert.property(response.data, 'code', 'MissingRequiredParameter');
      assert.exists(response, 'message');
      done();
    });
  });

  it('returns `not found`error when no collectionId does not exist', (done) => {
    run('indexFaces', {
      args: {
        image: imageName,
        bucketName,
        collectionId: 'jsdjsdks',
      },
      config,
    }).then((response) => {
      assert.property(response.data, 'statusCode', 400);
      assert.property(response.data, 'code', 'ResourceNotFoundException');
      assert.exists(response, 'message');
      done();
    });
  });
});
