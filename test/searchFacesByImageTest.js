import { assert, expect } from 'chai';
import { run } from 'syncano-test';
import helper from './util/testHelper';

describe('Search Faces By Image', () => {
  const config = helper.config;
  const bucketName = helper.image.bucketName;
  const imageName = helper.image.imageName3;
  const collectionId = helper.collectionIds.collectionId1;

  it('returns faces found', (done) => {
    run('searchFacesByImage', {
      args: {
        image: imageName,
        bucketName,
        collectionId,
      },
      config,
    }).then((response) => {
      assert.property(response.data, 'message', 'Found Faces by Image.');
      assert.isNotEmpty(response.data.data);
      done();
    });
  });

  it('returns error message if image name is not provided', (done) => {
    run('searchFacesByImage', {
      args: {
        bucketName,
        collectionId,
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
