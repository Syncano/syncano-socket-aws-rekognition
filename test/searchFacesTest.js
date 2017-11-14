import { assert, expect } from "chai";
import { run } from "syncano-test";
import helper from "./util/testHelper";

describe("Search Faces", () => {
  const config = helper.config;
  let bucketName = helper.image.bucketName;
  let imageName = helper.image.imageName3;
  let collectionId = helper.collectionIds.collectionId1;

  it("returns faces found", done => {
    run("indexFaces", {
      args: {
        image: imageName,
        bucketName: bucketName,
        collectionId: collectionId
      },
      config
    }).then(response => {
      let faceId = response.data.data.FaceRecords[0].Face.FaceId;
      run("searchFaces", {
        args: {
          collectionId: collectionId,
          faceId: faceId
        },
        config
      }).then(response => {
        assert.property(response.data, "message", "Faces found.");
        done();
      });
    });
  });

  it("returns error message if faceId is not provided", done => {
    run("searchFaces", {
      args: {
        collectionId: collectionId
      },
      config
    }).then(response => {
      assert.property(response.data, "statusCode", 400);
      assert.property(response.data, "code", "MissingRequiredParameter");
      assert.exists(response, "message");
      done();
    });
  });
});
