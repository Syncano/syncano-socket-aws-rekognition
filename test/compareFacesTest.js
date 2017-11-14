import { assert, expect } from "chai";
import { run } from "syncano-test";
import helper from "./util/testHelper";

describe("Compare Faces ", () => {
  const config = helper.config;
  let sourceBucketName = helper.image.bucketName;
  let sourceImageName = helper.image.imageName3;
  let targetBucketName = helper.image.bucketName;
  let targetImageName = helper.image.imageName3;

  it("returns faces found", done => {
    run("compareFaces", {
      args: {
        sourceImage: sourceImageName,
        sourceBucketName: sourceBucketName,
        targetBucketName: targetBucketName,
        targetImage: targetImageName
      },
      config
    }).then(response => {
      assert.property(response.data, "message", "Faces Detected");
      assert.isNotEmpty(response.data.data);
      done();
    });
  });

  it("returns error message if targetImage name is not provided", done => {
    run("compareFaces", {
      args: {
        sourceImage: sourceImageName,
        sourceBucketName: sourceBucketName
      },
      config
    }).then(response => {
      assert.property(response.data, "statusCode", 400);
      assert.property(response.data, "code", "InvalidParameterException");
      assert.exists(response, "message");
      done();
    });
  });
});
