import { assert, expect } from 'chai';
import { run } from '@syncano/test';
import helper from './util/testHelper';

describe('Delete Faces', () => {
  const { config, image, collectionIds } = helper;
  const { bucketName, imageName } = image;
  const { collectionId1, collectionId2 } = collectionIds;
  let faceId;

  before(async () => {
    await run('create-collection', { args: { collectionId: collectionId1 }, config });
    await run('create-collection', { args: { collectionId: collectionId2 }, config });
    const { data: response } = await run(
      'index-faces',
      { args: { image: imageName, bucketName, collectionId: collectionId1 }, config }
    );
    faceId = response.data.FaceRecords[0].Face.FaceId;
  });

  it('returns validation error if no faceIds is provided', async () => {
    const response = await run('delete-faces', { args: { collectionId: collectionId1 }, config });
    assert.property(response.data, 'statusCode', 400);
    assert.property(response.data, 'code', 'ValidationException');
    assert.exists(response, 'message');
  });

  it('deletes faces', async () => {
    const { data: result } = await run('delete-faces', { args: { collectionId: collectionId1, faceId }, config });
    expect(result.data)
      .to.have.property('DeletedFaces')
      .to.be.an('Array').that.is.not.empty;
  });

  it('returns an empty array if faceId does not exist in collectionId', async () => {
    const { data: result } = await run(
      'delete-faces',
      { args: { collectionId: collectionId2, faceId }, config }
    );
    expect(result.data)
      .to.have.property('DeletedFaces')
      .to.be.an('Array').that.is.empty;
  });
});
