import AWS from "aws-sdk";
import fs from "fs";

const path = require("path");

class helper {
  constructor(configDetails) {
    this.rekognition = new AWS.Rekognition({
      accessKeyId: configDetails.AWS_ACCESS_KEY_ID,
      secretAccessKey: configDetails.AWS_SECRET_ACCESS_KEY,
      region: configDetails.region
    });
  }

  confirmImage(image, bucketName) {
    return bucketName !== null
      ? {
          S3Object: {
            Bucket: bucketName,
            Name: image
          }
        }
      : {
          Bytes: fs.readFileSync(image)
        };
  }

  compareFaces(sourceUploadedImage, targetUploadedImage, similarityThreshold) {
    return this.rekognition
      .compareFaces({
        SimilarityThreshold: similarityThreshold,
        SourceImage: sourceUploadedImage,
        TargetImage: targetUploadedImage
      })
      .promise();
  }

  createCollection(collectionId) {
    return this.rekognition
      .createCollection({ CollectionId: collectionId })
      .promise();
  }

  deleteCollection(collectionId) {
    return this.rekognition
      .deleteCollection({ CollectionId: collectionId })
      .promise();
  }

  deleteFaces(collectionId, faceIds) {
    return this.rekognition
      .deleteFaces({
        CollectionId: collectionId,
        FaceIds: [faceIds]
      })
      .promise();
  }

  detectFaces(uploadeds3Image, attr) {
    return this.rekognition
      .detectFaces({
        Attributes: [attr] || attr.length < 1,
        Image: uploadeds3Image
      })
      .promise();
  }

  detectLabels(uploadeds3Image, maxsLabels, minConfidence) {
    return this.rekognition
      .detectLabels({
        Image: uploadeds3Image,
        MaxLabels: maxsLabels || null,
        MinConfidence: minConfidence || null
      })
      .promise();
  }

  detectModerationLabels(uploadeds3Image, minConfidence) {
    return this.rekognition
      .detectModerationLabels({
        Image: uploadeds3Image,
        MinConfidence: minConfidence || null
      })
      .promise();
  }

  getCelebrityInfo(celebInfoId) {
    return this.rekognition
      .getCelebrityInfo({
        Id: celebInfoId
      })
      .promise();
  }

  indexFaces(
    collectionId,
    uploadedImage,
    detectionAttributes,
    externalImageId
  ) {
    return this.rekognition
      .indexFaces({
        Image: uploadedImage,
        CollectionId: collectionId,
        DetectionAttributes: [detectionAttributes] || null,
        ExternalImageId: externalImageId || null
      })
      .promise();
  }

  listCollections(maxResults, nextTokens) {
    return this.rekognition
      .listCollections({
        MaxResults: maxResults || null,
        NextToken: nextTokens || null
      })
      .promise();
  }

  listFaces(collectionId, maxResults, nextToken) {
    return this.rekognition
      .listFaces({
        CollectionId: collectionId,
        MaxResults: maxResults || null,
        NextToken: nextToken || null
      })
      .promise();
  }
  recognizeCelebrities(uploadedImage) {
    return this.rekognition
      .recognizeCelebrities({
        Image: uploadedImage
      })
      .promise();
  }

  searchFaces(collectionId, faceId, faceMatchThreshold, maxFaces) {
    return this.rekognition
      .searchFaces({
        CollectionId: collectionId,
        FaceId: faceId,
        FaceMatchThreshold: faceMatchThreshold || null,
        MaxFaces: maxFaces || null
      })
      .promise();
  }

  searchFacesByImage(
    collectionId,
    faceMatchThreshold,
    uploadedImage,
    maxFaces
  ) {
    return this.rekognition
      .searchFacesByImage({
        Image: uploadedImage,
        CollectionId: collectionId
      })
      .promise();
  }
}

module.exports = helper;
