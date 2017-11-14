import { assert, expect } from "chai";
import { run } from "syncano-test";
import helper from "./util/testHelper";

describe("Detect Labels", () => {
  const config = helper.config;

  it("returns a details of labels if detected", done => {
    run("detectLabels", {
      args: {
        image: helper.image.imageName,
        bucketName: helper.image.bucketName
      },
      config
    }).then(response => {
      assert.property(response.data, "message", "Labels Detected.");
      expect(response.data.data)
        .to.have.property("Labels")
        .to.be.an("Array").that.is.not.empty;
      done();
    });
  });

  it("returns an error message if uploaded image is not existing in 3S Bucket", done => {
    run("detectFaces", {
      args: {
        image: helper.image.uploadedImage
      },
      config
    }).then(response => {
      assert.property(response.data, "statusCode", 400);
      assert.property(response.data, "code", "InvalidS3ObjectException");
      assert.exists(response, "message");
      done();
    });
  });

  it("returns an error message if argument parameter is not entered  ", done => {
    run("detectLabels", {
      args: {},
      config
    }).then(response => {
      assert.property(response.data, "status", 400);
      assert.property(response.data, "code", "InvalidParameterException");
      assert.exists(response, "message");
      done();
    });
  });
});
