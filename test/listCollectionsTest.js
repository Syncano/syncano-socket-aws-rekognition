import { assert, expect } from 'chai';
import { run } from 'syncano-test';
import helper from './util/testHelper';

describe('List Collection', () => {
  const config = helper.config;

  it('returns all collection IDs if parameter is not provided', (done) => {
    run('listCollections', {
      args: {},
      config,
    }).then((response) => {
      assert.property(response.data, 'message', 'List of Collection IDs.');
      expect(response.data.data)
        .to.have.property('CollectionIds')
        .to.be.an('Array').that.is.not.empty;
      done();
    });
  });

  it('returns limited collection IDs based on provided maxResults', (done) => {
    const maxResultsValue = '2';
    run('listCollections', {
      args: { maxResults: maxResultsValue },
      config,
    }).then((response) => {
      assert.property(response.data, 'message', 'List of Collection IDs.');
      assert.lengthOf(response.data.data.CollectionIds, maxResultsValue);
      done();
    });
  });

  it('returns an error message when pagination token(nextTokens) is invalid', (done) => {
    run('listCollections', {
      args: { nextTokens: 'ssjskjskjsd' },
      config,
    }).then((response) => {
      assert.property(response.data, 'status', 400);
      assert.property(response.data, 'code', 'InvalidPaginationTokenException');
      assert.property(response.data, 'message', null);
      done();
    });
  });
});
