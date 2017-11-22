import { assert, expect } from 'chai';
import { run } from 'syncano-test';
import helper from './util/testHelper';

describe('Get Celebrity Information', () => {
  const config = helper.config;

  it('returns information of requested celebrity', (done) => {
    run('recognizeCelebrities', {
      args: {
        image: helper.image.imageName3,
        bucketName: helper.image.bucketName,
      },
      config,
    }).then((response) => {
      const celebrityId = response.data.data.CelebrityFaces[0].Id;
      const celebrityName = response.data.data.CelebrityFaces[0].Name;
      run('getCelebrityInfo', {
        args: {
          celebrityId,
        },
        config,
      }).then((res) => {
        expect(res.data.data)
          .to.have.property('Name')
          .to.equal(celebrityName);
        done();
      });
    });
  });

  it('returns a `not found` error if a celebrity Id does not exist', (done) => {
    run('recognizeCelebrities', {
      args: {
        image: helper.image.imageName3,
        bucketName: helper.image.bucketName,
      },
      config,
    }).then((response) => {
      run('getCelebrityInfo', {
        args: {
          celebrityId: '3Ir0du6',
        },
        config,
      }).then((res) => {
        assert.property(res.data, 'code', 'ResourceNotFoundException');
        assert.exists(res, 'message');
        done();
      });
    });
  });

  it('returns a missing parameter message if celebrity id is not provided', (done) => {
    run('recognizeCelebrities', {
      args: {
        image: helper.image.imageName3,
        bucketName: helper.image.bucketName,
      },
      config,
    }).then((response) => {
      run('getCelebrityInfo', {
        args: {},
        config,
      }).then((res) => {
        assert.property(res.data, 'code', 'MissingRequiredParameter');
        assert.exists(res, 'message');
        done();
      });
    });
  });
});
