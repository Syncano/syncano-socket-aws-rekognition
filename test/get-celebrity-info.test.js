import { assert, expect } from 'chai';
import { run } from '@syncano/test';
import helper from './util/testHelper';

describe('Get Celebrity Information', () => {
  const { config, image } = helper;
  const { imageName3, bucketName } = image;

  let celebrityId;
  let celebrityName;

  before((done) => {
    run('recognize-celebrities', { args: { image: imageName3, bucketName }, config })
      .then(({ data }) => {
        celebrityId = data.data.CelebrityFaces[0].Id;
        celebrityName = data.data.CelebrityFaces[0].Name;
        done();
      });
  });

  it('returns information of requested celebrity', (done) => {
    run('get-celebrity-info', { args: { celebrityId }, config })
      .then((res) => {
        expect(res.data.data)
          .to.have.property('Name')
          .to.equal(celebrityName);
        done();
      });
  });

  it('returns a `not found` error if a celebrity Id does not exist', (done) => {
    run('get-celebrity-info', { args: { celebrityId: '3Ir0du6' }, config })
      .then((res) => {
        assert.property(res.data, 'code', 'ResourceNotFoundException');
        assert.exists(res, 'message');
        done();
      });
  });

  it('returns a missing parameter message if celebrity id is not provided', (done) => {
    run('get-celebrity-info', { args: {}, config })
      .then((res) => {
        assert.property(res.data, 'code', 'MissingRequiredParameter');
        assert.exists(res, 'message');
        done();
      });
  });
});
