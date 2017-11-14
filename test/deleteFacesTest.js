import { assert, expect } from "chai";
import { run } from "syncano-test";
import helper from "./util/testHelper";

describe("Delete Faces", () => {
  const config = helper.config;
  let bucketName = helper.image.bucketName;
  let imageName = helper.image.imageName;

  it("returns validation error if no faceIds is provided", done => {
    run("createCollection", {
      args: { collectionId: helper.collectionIds.collectionId1 },
      config
    });
    run("deleteFaces", {
      args: { collectionId: helper.collectionIds.collectionId1 },
      config
    }).then(response => {
      assert.property(response.data, "statusCode", 400);
      assert.property(response.data, "code", "ValidationException");
      assert.exists(response, "message");
      done();
    });
  });

  it("deletes faces", done => {
    run("indexFaces", {
      args: {
        image: imageName,
        bucketName: bucketName,
        collectionId: helper.collectionIds.collectionId1
      },
      config
    }).then(response => {
      let faceId = response.data.data.FaceRecords[0].Face.FaceId;
      run("deleteFaces", {
        args: {
          collectionId: helper.collectionIds.collectionId1,
          faceId: faceId
        },
        config
      }).then(response => {
        expect(response.data.data)
          .to.have.property("DeletedFaces")
          .to.be.an("Array").that.is.not.empty;
        done();
      });
    });
  });

  it("returns an empty array if faceId does not exist in collectionId", function(
    done
  ) {
    run("createCollection", {
      args: { collectionId: helper.collectionIds.collectionId2 },
      config
    });
    run("indexFaces", {
      args: {
        image: imageName,
        bucketName: bucketName,
        collectionId: helper.collectionIds.collectionId1
      },
      config
    }).then(function(response) {
      let faceId = response.data.data.FaceRecords[0].Face.FaceId;
      run("deleteFaces", {
        args: {
          collectionId: helper.collectionIds.collectionId2,
          faceId: faceId
        },
        config
      }).then(function(response) {
        expect(response.data.data)
          .to.have.property("DeletedFaces")
          .to.be.an("Array").that.is.empty;
        done();
      });
    });
  });
});
