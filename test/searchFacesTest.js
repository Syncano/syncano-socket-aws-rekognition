import { assert, expect } from 'chai';
import { run } from 'syncano-test';
import helper from './util/testHelper';

describe('Search Faces', () => {
  const config = helper.config;
  const bucketName = helper.image.bucketName;
  const imageName = helper.image.imageName3;
  const collectionId = helper.collectionIds.collectionId1;

  it('returns faces found', (done) => {
    run('indexFaces', {
      args: {
        image: imageName,
        bucketName,
        collectionId,
      },
      config,
    }).then((response) => {
      const faceId = response.data.data.FaceRecords[0].Face.FaceId;
      run('searchFaces', {
        args: {
          collectionId,
          faceId,
        },
        config,
      }).then((res) => {
        assert.property(response.data, 'message', 'Faces found.');
        done();
      });
    });
  });

  it('returns error message if faceId is not provided', (done) => {
    run('searchFaces', {
      args: {
        collectionId,
      },
      config,
    }).then((response) => {
      assert.property(response.data, 'statusCode', 400);
      assert.property(response.data, 'code', 'MissingRequiredParameter');
      assert.exists(response, 'message');
      done();
    });
  });
});
