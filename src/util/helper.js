import AWS from "aws-sdk";

class helper {
  constructor(configDetails) {
    this.rekognition = new AWS.Rekognition({
      accessKeyId: configDetails.AWS_ACCESS_KEY_ID,
      secretAccessKey: configDetails.AWS_SECRET_ACCESS_KEY,
      region: configDetails.region
    });
  }

  checkImage(image) {}

  compareFaces() {}

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
        FaceIds: faceIds
      })
      .promise();
  }

  detectFaces(image, attr) {
    return this.rekognition
      .detectFaces({
        Attributes: attr || null,
        Image: image
      })
      .promise();
  }

  detectLabels(image, maxsLabels, minConfidence) {
    return this.rekognition
      .detectLabels({
        Image: image,
        MaxLabels: maxsLabels || null,
        MinConfidence: minConfidence || null
      })
      .promise();
  }

  detectModerationLabels(image, minConfidence) {
    return this.rekognition
      .detectModerationLabels({
        Image: image,
        MinConfidence: minConfidence || null
      })
      .promise();
  }

  getCelebrityInfo(celebRecognitionId) {
    return this.rekognition
      .getCelebrityInfo({
        Id: celebRecognitionId
      })
      .promise();
  }

  indexFaces(collectionId, image, detectionAttributes, externalImageId) {
    return this.rekognition
      .indexFaces({
        Image: image,
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
  recognizeCelebrities(image) {
    return this.rekognition
      .recognizeCelebrities({
        Image: image
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

  searchFacesByImage(collectionId, faceMatchThreshold, image, maxFaces) {
    return this.rekognition
      .searchFacesByImage({
        Image: image,
        CollectionId: collectionId
      })
      .promise();
  }
}

module.exports = helper;
