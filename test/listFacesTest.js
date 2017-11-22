import { assert, expect } from 'chai';
import { run } from 'syncano-test';
import helper from './util/testHelper';

describe('List Faces', () => {
  const config = helper.config;
  const bucketName = helper.image.bucketName;
  const imageName = helper.image.imageName;

  it('returns error message if no collection ID', (done) => {
    run('listFaces', {
      args: {},
      config,
    }).then((response) => {
      assert.property(response.data, 'code', 'MissingRequiredParameter');
      assert.property(response.data, 'statusCode', 400);
      assert.exists(response, 'message');
      done();
    });
  });

  it('returns faces found', (done) => {
    run('listFaces', {
      args: { collectionId: helper.collectionIds.collectionId1 },
      config,
    }).then((response) => {
      assert.property(response.data, 'message', 'List of Faces.');
      expect(response.data.data)
        .to.have.property('Faces')
        .to.be.an('Array').that.is.not.empty;
      done();
    });
  });
});
