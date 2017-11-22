import { assert, expect } from 'chai';
import { run } from 'syncano-test';
import helper from './util/testHelper';

describe('Detect Moderation Labels', () => {
  const config = helper.config;

  it('returns a details of moderation labels if detected', (done) => {
    run('detectModerationLabels', {
      args: {
        image: helper.image.imageName2,
        bucketName: helper.image.bucketName,
      },
      config,
    }).then((response) => {
      assert.property(response.data, 'message', 'Moderation Labels Detected.');
      expect(response.data.data)
        .to.have.property('ModerationLabels')
        .to.be.an('Array').that.is.not.empty;
      done();
    });
  });

  it('returns an empty array if no moderation labels is detected', (done) => {
    run('detectModerationLabels', {
      args: {
        image: helper.image.uploadedImage,
      },
      config,
    }).then((response) => {
      assert.property(response.data, 'message', 'Moderation Labels Detected.');
      expect(response.data.data)
        .to.have.property('ModerationLabels')
        .to.be.an('Array').that.is.empty;
      done();
    });
  });
});
