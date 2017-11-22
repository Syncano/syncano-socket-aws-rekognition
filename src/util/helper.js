import AWS, { Rekognition } from 'aws-sdk';
import fs from 'fs';
import Syncano from 'syncano-server';
import request from 'request';
// var request = require("request").defaults({ encoding: null });

/** Class respresenting AWS rekognition actions */
class helper {
  /**
   * Constructs a service object for each API operation
   *
   * @param {Object} configDetails - Contains the AWS configuration parameters
   */
  constructor(configDetails) {
    this.rekognition = new AWS.Rekognition({
      accessKeyId: configDetails.AWS_ACCESS_KEY_ID,
      secretAccessKey: configDetails.AWS_SECRET_ACCESS_KEY,
      region: configDetails.region,
    });
  }

  /**
   * Converts URL containing an image and converts it to bytes
   *
   * @param {string} imageUrl - Image Url to be converted.
   * @returns {Object} - Byte object
   */

  static convertImagetoBytes(imageUrl) {
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream('image.jpg');
      request.get(imageUrl).on('response', (response) => {
        if (
          response.headers['content-type'] === 'image/jpeg' ||
          response.headers['content-type'] === 'image/png'
        ) {
          return response.pipe(file).on('close', () => {
            if (fs.existsSync('image.jpg')) {
              try {
                return resolve(fs.readFileSync('image.jpg'));
              } catch (err) {
                return reject(err);
              }
            }
            return reject(new Error());
          });
        }
        return reject(new Error());
      });
    });
  }

  /**
   * Confirms if image is an S3 image or image Url
   *
   * @param {string} image - Either an image URL or S3 image.
   * @param {string} bucketName - S3 bucket holding the image if inputing an S3 image.
   * @returns {Object} - image parameter
   */
  static async confirmImage(image, bucketName = null) {
    if (bucketName !== null) {
      return {
        S3Object: {
          Bucket: bucketName,
          Name: image,
        },
      };
    }
    try {
      return {
        Bytes: await helper.convertImagetoBytes(image),
      };
    } catch (err) {
      return { Bytes: [] };
    }
  }

  /**
   * Compares a face in the source input image with each face detected in the target input image
   * @param {string} sourceUploadedImage - The source image, either as image URL or as an S3 image.
   * @param {string} sourceBucketName -  Source S3 bucket holding the image if inputing an S3 image.
   * @param {string} targetUploadedImage - The target image, either as image URL or as an S3 image.
   * @param {string} targetBucketName - The target S3 bucket for the image if inputing an S3 image.
   * @param {string} similarityThreshold - Minimum level of confidence in face matches(Optional).
   * @returns {Promise} - Promise object
   */
  async compareFaces(
    sourceUploadedImage,
    sourceBucketName,
    targetUploadedImage,
    targetBucketName,
    similarityThreshold,
  ) {
    try {
      return this.rekognition
        .compareFaces({
          SimilarityThreshold: similarityThreshold,
          SourceImage: await helper.confirmImage(sourceUploadedImage, sourceBucketName),
          TargetImage: await helper.confirmImage(targetUploadedImage, targetBucketName),
        })
        .promise();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Creates a collection in an AWS Region
   *
   * @param {string} collectionId  - ID for the collection that you are creating.
   * @returns {Promise} - Promise object
   */

  createCollection(collectionId) {
    try {
      return this.rekognition.createCollection({ CollectionId: collectionId }).promise();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Deletes the specified collection.
   *
   * @param {string} collectionId - ID of the collection to delete.
   * @returns {Promise} - Promise object
   */
  deleteCollection(collectionId) {
    try {
      return this.rekognition.deleteCollection({ CollectionId: collectionId }).promise();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Deletes faces from a collection.
   *
   * @param {string} collectionId - Collection from which to remove the specific faces.
   * @param {string} faceIds - An array of face IDs to delete.
   * @returns {Promise} - Promise object
   */
  deleteFaces(collectionId, faceIds) {
    try {
      return this.rekognition
        .deleteFaces({
          CollectionId: collectionId,
          FaceIds: [faceIds],
        })
        .promise();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Detects faces within an image (JPEG or PNG) that is provided as input.
   *
   * @param {string} uploadedImage - Either an image URL or S3 image.
   * @param {string} bucketName - S3 bucket holding the image if inputing an S3 image.
   * @param {string} attr - Facial attributes you want to be returned (ALL || DEFAULT)(Optional).
   * @returns {Promise} - Promise object
   */
  async detectFaces(uploadedImage, bucketName, attr) {
    try {
      return this.rekognition
        .detectFaces({
          Attributes: [attr] || attr.length < 1,
          Image: await helper.confirmImage(uploadedImage, bucketName),
        })
        .promise();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Detects instances of real-world labels within an image (JPEG or PNG) provided
   *
   * @param {string} uploadedImage - Either an image URL or S3 image.
   * @param {string} bucketName - S3 bucket holding the image if inputing an S3 image.
   * @param {string} maxsLabels - Maximum number of labels you want the service to return(Optional).
   * @param {string} minConfidence - Minimum confidence level for the labels to return (Optional).
   * @returns {Promise} - Promise object
   */
  async detectLabels(uploadedImage, bucketName, maxsLabels, minConfidence) {
    try {
      return this.rekognition
        .detectLabels({
          Image: await helper.confirmImage(uploadedImage, bucketName),
          MaxLabels: maxsLabels || null,
          MinConfidence: minConfidence || null,
        })
        .promise();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Detects explicit or suggestive adult content in a specified JPEG or PNG format image.
   *
   * @param {string} uploadedImage - Either an image URL or S3 image.
   * @param {string} bucketName - S3 bucket holding the image if inputing an S3 image.
   * @param {string} minConfidence - Minimum confidence level for the labels to return (Optional).
   * @returns {Promise} - Promise object
   */
  async detectModerationLabels(uploadedImage, bucketName, minConfidence) {
    try {
      return this.rekognition
        .detectModerationLabels({
          Image: await helper.confirmImage(uploadedImage, bucketName),
          MinConfidence: minConfidence || null,
        })
        .promise();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Gets the name and additional information about a celebrity based on his or her Rekognition ID.
   *
   * @param {string} celebInfoId - celebrity's ID. Get ID from recognize celebrities action.
   * @returns {Promise} - Promise object
   */

  getCelebrityInfo(celebInfoId) {
    try {
      return this.rekognition
        .getCelebrityInfo({
          Id: celebInfoId,
        })
        .promise();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Detects faces in the input image and adds them to the specified collection.
   *
   * @param {string} collectionId - Collection ID to which you want to add the detected faces.
   * @param {string} uploadedImage - Either an image URL or S3 image.
   * @param {string} bucketName - S3 bucket holding the image if inputing an S3 image.
   * @param {string} detectionAttributes Facial attributes to be returned (ALL || DEFAULT)(Optional)
   * @param {string} externalImageId - ID to assign all the faces detected in the image(Optional)
   * @returns {Promise} - Promise object
   */
  async indexFaces(collectionId, uploadedImage, bucketName, detectionAttributes, externalImageId) {
    try {
      return this.rekognition
        .indexFaces({
          Image: await helper.confirmImage(uploadedImage, bucketName),
          CollectionId: collectionId,
          DetectionAttributes: [detectionAttributes] || null,
          ExternalImageId: externalImageId || null,
        })
        .promise();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Returns list of collection IDs in your account.
   *
   * @param {string} maxResults - Maximum number of collection IDs to return (Optional).
   * @param {string} nextTokens - Access pagination token from the previous response (Optional).
   * @returns {Promise} - Promise object
   */
  listCollections(maxResults, nextTokens) {
    try {
      return this.rekognition
        .listCollections({
          MaxResults: maxResults || null,
          NextToken: nextTokens || null,
        })
        .promise();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Returns metadata for faces in the specified collection.
   *
   * @param {string} collectionId - ID of the collection from which to list the faces.
   * @param {string} maxResults - Maximum number of collection IDs to return (Optional).
   * @param {string} nextToken - Access pagination token from the previous response (Optional).
   * @returns {Promise} - Promise object
   */
  listFaces(collectionId, maxResults, nextToken) {
    try {
      return this.rekognition
        .listFaces({
          CollectionId: collectionId,
          MaxResults: maxResults || null,
          NextToken: nextToken || null,
        })
        .promise();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Returns an array of celebrities recognized in the input image.
   *
   * @param {string} uploadedImage - Either an image URL or S3 image.
   * @param {string} bucketName - S3 bucket holding the image if inputing an S3 image.
   * @returns {Promise} - Promise object
   */
  async recognizeCelebrities(uploadedImage, bucketName) {
    try {
      return this.rekognition
        .recognizeCelebrities({
          Image: await helper.confirmImage(uploadedImage, bucketName),
        })
        .promise();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Searches for matching faces in the collection the face belongs to.
   *
   * @param {string} collectionId - ID of the collection the face belongs to.
   * @param {string} faceId - ID of a face to find matches for in the collection.
   * @param {string} faceMatchThreshold  -Minimum confidence in the face match to return (Optional).
   * @param {string} maxFaces - Maximum number of faces to return (Optional).
   * @returns {Promise} - Promise object
   */
  searchFaces(collectionId, faceId, faceMatchThreshold, maxFaces) {
    try {
      return this.rekognition
        .searchFaces({
          CollectionId: collectionId,
          FaceId: faceId,
          FaceMatchThreshold: faceMatchThreshold || null,
          MaxFaces: maxFaces || null,
        })
        .promise();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Detects the largest face in an image, then search the specified collection for matching faces.
   *
   * @param {string} collectionId - ID of the collection to search.
   * @param {string} faceMatchThreshold - Minimum confidence in the face match to return (Optional).
   * @param {string} uploadedImage - Either an image URL or S3 image.
   * @param {string} bucketName - S3 bucket holding the image if inputing an S3 image.
   * @param {*} maxFaces - Optional parameter to include maximum number of faces to return.
   * @returns {Promise} - Promise object
   */
  async searchFacesByImage(collectionId, faceMatchThreshold, uploadedImage, bucketName, maxFaces) {
    try {
      return this.rekognition
        .searchFacesByImage({
          Image: await helper.confirmImage(uploadedImage, bucketName),
          CollectionId: collectionId,
          FaceMatchThreshold: faceMatchThreshold || null,
          MaxFaces: maxFaces || null,
        })
        .promise();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = helper;
