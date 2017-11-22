import { assert } from 'chai';
import { run } from 'syncano-test';
import helper from './util/testHelper';

describe('Delete Collection', () => {
  const config = helper.config;

  it('returns a message if collection is created', (done) => {
    run('deleteCollection', {
      args: { collectionId: helper.collectionIds.collectionId1 },
      config,
    }).then((response) => {
      assert.property(response.data, 'message', 'Collection Deleted.');
      assert.property(response.data, 'statusCode', 200);
      done();
    });
  });

  it('returns exception message if collectionId has been deleted or does not exist', (done) => {
    run('deleteCollection', {
      args: { collectionId: helper.collectionIds.collectionId1 },
      config,
    }).then((response) => {
      assert.property(response.data, 'statusCode', 400);
      assert.property(response.data, 'code', 'ResourceNotFoundException');
      assert.exists(response, 'message');
      done();
    });
  });

  it('returns validation exception message if user does not enter a collection Id ', (done) => {
    run('deleteCollection', {
      args: { collectionId: '' },
      config,
    }).then((response) => {
      assert.property(response.data, 'statusCode', 400);
      assert.property(response.data, 'code', 'ValidationException');
      assert.exists(response, 'message');
      done();
    });
  });
});
