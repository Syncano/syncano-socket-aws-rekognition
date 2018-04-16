import { assert, expect } from 'chai';
import { run } from '@syncano/test';
import helper from './util/testHelper';

describe('List Faces', () => {
  const { config, collectionIds } = helper;
  const { collectionId1: collectionId } = collectionIds;

  it('returns error message if no collection ID', (done) => {
    run('list-faces', { args: {}, config })
      .then((response) => {
        assert.property(response.data, 'code', 'MissingRequiredParameter');
        assert.property(response.data, 'statusCode', 400);
        assert.exists(response, 'message');
        done();
      });
  });

  it('returns faces found', (done) => {
    run('list-faces', { args: { collectionId }, config })
      .then((response) => {
        assert.property(response.data, 'message', 'List of Faces.');
        expect(response.data.data)
          .to.have.property('Faces')
          .to.be.an('Array').that.is.not.empty;
        done();
      });
  });
});
