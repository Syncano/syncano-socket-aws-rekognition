import { assert } from 'chai';
import { run } from '@syncano/test';
import helper from './util/testHelper';

describe('Delete Collection', () => {
  const { config, collectionIds } = helper;
  const { collectionId1: collectionId } = collectionIds;

  it('returns a message if collection is created', (done) => {
    run('delete-collection', { args: { collectionId }, config })
      .then(({ data }) => {
        assert.property(data, 'message', 'Collection Deleted.');
        assert.property(data, 'statusCode', 200);
        done();
      });
  });

  it('returns exception message if collectionId has been deleted or does not exist', (done) => {
    run('delete-collection', { args: { collectionId: helper.collectionIds.collectionId1 }, config })
      .then((response) => {
        assert.property(response.data, 'statusCode', 400);
        assert.property(response.data, 'code', 'ResourceNotFoundException');
        assert.exists(response, 'message');
        done();
      });
  });

  it('returns validation exception message if user does not enter a collection Id ', (done) => {
    run('delete-collection', { args: { collectionId: '' }, config })
      .then((response) => {
        assert.property(response.data, 'statusCode', 400);
        assert.property(response.data, 'code', 'ValidationException');
        assert.exists(response, 'message');
        done();
      });
  });
});
