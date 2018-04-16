import { assert, expect } from 'chai';
import { run } from '@syncano/test';
import helper from './util/testHelper';

describe('Detect Labels', () => {
  const { config, image } = helper;
  const { imageName, imageName3, bucketName } = image;

  it('returns information of recognized  celebrities in an image', (done) => {
    run('recognize-celebrities', { args: { image: imageName3, bucketName }, config })
      .then((response) => {
        assert.property(response.data, 'message', 'Recognized Celebrity Information');
        expect(response.data.data)
          .to.have.property('CelebrityFaces')
          .to.be.an('Array').that.is.not.empty;
        done();
      });
  });

  it('returns no information if there is no celebrity in an image', (done) => {
    run('recognize-celebrities', { args: { image: imageName, bucketName }, config })
      .then((response) => {
        expect(response.data.data)
          .to.have.property('CelebrityFaces')
          .to.be.an('Array').that.is.empty;
        done();
      });
  });
});
