import { assert, expect } from 'chai';
import { run } from '@syncano/test';
import helper from './util/testHelper';

describe('Detect Moderation Labels', () => {
  const { config, image } = helper;
  const { imageName2, uploadedImage, bucketName } = image;

  it('returns a details of moderation labels if detected', (done) => {
    run('detect-moderation-labels', { args: { image: imageName2, bucketName }, config })
      .then((response) => {
        assert.property(response.data, 'message', 'Moderation Labels Detected.');
        expect(response.data.data)
          .to.have.property('ModerationLabels')
          .to.be.an('Array').that.is.not.empty;
        done();
      });
  });

  it('returns an empty array if no moderation labels is detected', (done) => {
    run('detect-moderation-labels', { args: { image: uploadedImage }, config })
      .then((response) => {
        assert.property(response.data, 'message', 'Moderation Labels Detected.');
        expect(response.data.data)
          .to.have.property('ModerationLabels')
          .to.be.an('Array').that.is.empty;
        done();
      });
  });
});
