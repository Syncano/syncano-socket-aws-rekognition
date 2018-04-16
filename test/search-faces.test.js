import { assert, expect } from 'chai';
import { run } from '@syncano/test';
import helper from './util/testHelper';

describe('Search Faces', () => {
  const { config, image, collectionIds } = helper;
  const { collectionId1: collectionId } = collectionIds;
  const { imageName, bucketName } = image;

  let faceId;

  before((done) => {
    run('index-faces', { args: { image: imageName, bucketName, collectionId }, config })
      .then(({ data }) => {
        faceId = data.data.FaceRecords[0].Face.FaceId;
        done();
      });
  });

  it('returns faces found', (done) => {
    run('search-faces', { args: { collectionId, faceId }, config })
      .then((res) => {
        assert.property(res.data, 'message', 'Faces found.');
        done();
      });
  });

  it('returns error message if faceId is not provided', (done) => {
    run('search-faces', { args: { collectionId }, config })
      .then((response) => {
        assert.property(response.data, 'statusCode', 400);
        assert.property(response.data, 'code', 'MissingRequiredParameter');
        assert.exists(response, 'message');
        done();
      });
  });
});
