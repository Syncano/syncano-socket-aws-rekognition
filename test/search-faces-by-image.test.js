import { assert, expect } from 'chai';
import { run } from '@syncano/test';
import helper from './util/testHelper';

describe('Search Faces By Image', () => {
  const { config, image, collectionIds } = helper;
  const { collectionId1: collectionId } = collectionIds;
  const { imageName, bucketName } = image;

  it('returns faces found', (done) => {
    run('search-faces-by-image', { args: { image: imageName, bucketName, collectionId }, config })
      .then((response) => {
        assert.property(response.data, 'message', 'Found Faces by Image.');
        assert.isNotEmpty(response.data.data);
        done();
      });
  });

  it('returns error message if image name is not provided', (done) => {
    run('search-faces-by-image', { args: { bucketName, collectionId }, config })
      .then((response) => {
        assert.property(response.data, 'statusCode', 400);
        assert.property(response.data, 'code', 'InvalidParameterException');
        assert.exists(response, 'message');
        done();
      });
  });
});
