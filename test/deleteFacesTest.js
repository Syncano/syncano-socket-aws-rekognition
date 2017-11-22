import { assert, expect } from 'chai';
import { run } from 'syncano-test';
import helper from './util/testHelper';

describe('Delete Faces', () => {
  const config = helper.config;
  const bucketName = helper.image.bucketName;
  const imageName = helper.image.imageName;

  it('returns validation error if no faceIds is provided', (done) => {
    run('createCollection', {
      args: { collectionId: helper.collectionIds.collectionId1 },
      config,
    });
    run('deleteFaces', {
      args: { collectionId: helper.collectionIds.collectionId1 },
      config,
    }).then((response) => {
      assert.property(response.data, 'statusCode', 400);
      assert.property(response.data, 'code', 'ValidationException');
      assert.exists(response, 'message');
      done();
    });
  });

  it('deletes faces', (done) => {
    run('indexFaces', {
      args: {
        image: imageName,
        bucketName,
        collectionId: helper.collectionIds.collectionId1,
      },
      config,
    }).then((response) => {
      const faceId = response.data.data.FaceRecords[0].Face.FaceId;
      run('deleteFaces', {
        args: {
          collectionId: helper.collectionIds.collectionId1,
          faceId,
        },
        config,
      }).then((res) => {
        expect(res.data.data)
          .to.have.property('DeletedFaces')
          .to.be.an('Array').that.is.not.empty;
        done();
      });
    });
  });

  it('returns an empty array if faceId does not exist in collectionId', (done) => {
    run('createCollection', {
      args: { collectionId: helper.collectionIds.collectionId2 },
      config,
    });
    run('indexFaces', {
      args: {
        image: imageName,
        bucketName,
        collectionId: helper.collectionIds.collectionId1,
      },
      config,
    }).then((response) => {
      const faceId = response.data.data.FaceRecords[0].Face.FaceId;
      run('deleteFaces', {
        args: {
          collectionId: helper.collectionIds.collectionId2,
          faceId,
        },
        config,
      }).then((res) => {
        expect(res.data.data)
          .to.have.property('DeletedFaces')
          .to.be.an('Array').that.is.empty;
        done();
      });
    });
  });
});
