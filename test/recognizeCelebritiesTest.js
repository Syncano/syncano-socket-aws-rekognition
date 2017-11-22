import { assert, expect } from 'chai';
import { run } from 'syncano-test';
import helper from './util/testHelper';

describe('Detect Labels', () => {
  const config = helper.config;

  it('returns information of recognized  celebrities in an image', (done) => {
    run('recognizeCelebrities', {
      args: {
        image: helper.image.imageName3,
        bucketName: helper.image.bucketName,
      },
      config,
    }).then((response) => {
      assert.property(response.data, 'message', 'Recognized Celebrity Information');
      expect(response.data.data)
        .to.have.property('CelebrityFaces')
        .to.be.an('Array').that.is.not.empty;
      done();
    });
  });

  it('returns no information if there is no celebrity in an image', (done) => {
    run('recognizeCelebrities', {
      args: {
        image: helper.image.imageName,
        bucketName: helper.image.bucketName,
      },
      config,
    }).then((response) => {
      expect(response.data.data)
        .to.have.property('CelebrityFaces')
        .to.be.an('Array').that.is.empty;
      done();
    });
  });
});
