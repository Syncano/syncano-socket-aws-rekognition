# aws-photo-rekognition

[![CircleCI](https://circleci.com/gh/Syncano/syncano-socket-aws-rekognition.svg?style=svg)](https://circleci.com/gh/Syncano/syncano-socket-aws-rekognition)

`version:` **0.0.2**

Amazon Rekognition Integration

To install, run:

```
syncano-cli add aws-photo-rekognition1
```

## Config

| Name | Required | Description | Info
| ---- | -------- | ----------- | ----
| AWS_ACCESS_KEY_ID | true | AWS Access Key | To find the key, log into your AWS account to get it 
| AWS_SECRET_ACCESS_KEY | true | AWS Access Secret Key | To find the key, log into your AWS account to get it 
| region | true | Region | On your AWS Console, search for Rekognition to check supported regions and select one (e.g, us-east-1 ) 

## Endpoints

### compare-faces

Compares a face in the source image with each face detected in the target input image

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| sourceBucketName | string | Name of the source S3 bucket (Optional) | callen-images
| sourceImage | string | a path to the image | an image in S3 bucket image | abc.jpg
| targetBucketName | string | Name of the target S3 bucket (Optional) | callen-images
| targetImage | string | a path to the image | an image in S3 bucket image | abc.jpg
| similarityThreshold | string | The minimum level of confidence in the face matches that a match must meet. (Optional) | 20



#### Response

mimetype: `application/json`

##### Success `200`

```
{
"message": "Comparison result."
"data": {}
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "InvalidParameterType",
  "message": "Expected params.SimilarityThreshold to be a number"
}
```

### create-collection

Create AWS Rekognition collection

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| collectionId | string | ID for the collection that you are creating. | callen-images



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "statusCode": 200,
  "message": "Collection Created."
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "ResourceAlreadyExistsException",
  "message": "The collection id: callen-images already exists"
}
```

### delete-collection

Delete AWS Rekognition collection using the collectionId.

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| collectionId | string | ID of the collection to delete. | callen-images



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "statusCode": 200,
  "message": "Collection Deleted."
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "ResourceNotFoundException",
  "message": "The collection id: calle does not exist"
}
```

### delete-faces

Detect Labels in uploaded images.

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| collectionId | string | Collection from which to remove the specific faces. | callen-images
| faceId | string | Face IDs to delete. | 629e696f-0456-5bd5-aa49-50847570a653



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "message": "Faces Detected",
  "DeletedFaces":[ "11111111-2222-3333-4444-555555555555"]
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "ValidationException",
  "message": "1 validation error detected: Value '[]' at 'faceIds' failed to satisfy constraint"
}
```

### detect-faces

Detect faces in uploaded images.

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| bucketName | string | Name of the S3 bucket (Optional). | callen-images
| image | string | a path to the image | an image in S3 bucket image | abc.jpg
| attr | string |  The facial attributes you want to be returned (Optional) | DEFAULT || ALL 



#### Response

mimetype: `application/json`

##### Success `200`

```
{
"message": "Faces Detected"
"data": {
          "FaceDetails": []
        }
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "InvalidParameterException",
  "message": "Request has Invalid Parameters"
}      
```

### detect-labels

Detect Labels in uploaded images.

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| bucketName | string | Name of the S3 bucket (Optional). | callen-images
| image | string | a path to the image | an image in S3 bucket image | abc.jpg
| maxsLabels | string | Maximum number of labels you want the service to return in the response (Optional) | 4
| minConfidence | string | Specify the minimum confidence level for the labels to return (Optional) | 23.6



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "message": "Labels Detected",
  "data": {
            "Labels": []
          }
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "InvalidParameterException",
  "message": "Requested image should either contain bytes or s3 object."
}
```

### detect-moderation-labels

Detects explicit or suggestive adult content in a specified JPEG or PNG format image.

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| bucketName | string | Name of the S3 bucket (Optional). | callen-images
| image | string | a path to the image | an image in S3 bucket image | abc.jpg
| minConfidence | string | Specify the minimum confidence level for the labels to return (Optional) | 23.6



#### Response

mimetype: `application/json`

##### Success `200`

```
{
"message": "Moderation Labels Detected."
"data": {
          "ModerationLabels": []
        }
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "InvalidParameterException",
  "message": "Requested image should either contain bytes or s3 object."
}
```

### get-celebrity-info

Gets the name and additional information about a celebrity based on his or her Rekognition ID.

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| celebrityId | string | ID for the celebrity. You can get the celebrity ID from a call to the RecognizeCelebrities operation | 3Ir0du6



#### Response

mimetype: `application/json`

##### Success `200`

```
{
"message": "Celebrity Information"
"data": {}
}
```

##### Failed `400`

```
{
  "code": "MissingRequiredParameter",
  "message": "Missing required key 'Id' in params"
}
```

### index-faces

Detects faces in the input image and adds them to the specified collection.

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| collectionId | string | The ID of an existing collection to which you want to add the faces that are detected in the input images. | callen-images
| bucketName | string | Name of the S3 bucket (Optional). | callen-images
| image | string | a path to the image | name of an image in S3 bucket image | abc.jpg
| detectionAttributes | string |  The facial attributes you want to be returned (Optional) | DEFAULT || ALL 
| externalImageId | string | ID you want to assign to all the faces detected in the image. | indexed images



#### Response

mimetype: `application/json`

##### Success `200`

```
{
"message": "Faces detected for indexing."
"data": {
          "FaceRecords": []
        }
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "InvalidParameterException",
  "message": "Requested image should either contain bytes or s3 object."
}
```

### list-collections

Returns list of collection IDs in your account.

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| maxResults | string | Maximum number of collection IDs to return. (Optional) | 5
| nextTokens | string | Pagination token from the previous response. (Optional) | token



#### Response

mimetype: `application/json`

##### Success `200`

```
{
"message": "Faces Detected"
"data": {
          "CollectionIds": []
        }
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "InvalidPaginationTokenException",
  "message": null
}
```

### list-faces

Returns metadata for faces in the specified collection.

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| collectionId | string | ID of the collection from which to list the faces. | callen-images
| maxResults | string | Maximum number of collection IDs to return.(Optional) | 5
| nextTokens | string | Pagination token from the previous response. (Optional) | token



#### Response

mimetype: `application/json`

##### Success `200`

```
{
"message": "Faces Detected",
"data": {
          "Faces": []
        }
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "MissingRequiredParameter",
  "message": "Missing required key 'CollectionId' in params"
}
```

### recognize-celebrities

Returns an array of celebrities recognized in the input image.

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| bucketName | string | Name of the S3 bucket (Optional). | callen-images
| image | string | a path to the image | name of an image in S3 bucket image | abc.jpg



#### Response

mimetype: `application/json`

##### Success `200`

```
{
"message": "Recognized Celebrity Information"
"data": {
          "CelebrityFaces": []
        }
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "InvalidParameterException",
  "message": "Requested image should either contain bytes or s3 object." 
}
```

### search-faces

Searches for matching faces in the collection the face belongs to.

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| collectionId | string | ID of the collection the face belongs to. | callen-images
| faceId | string | ID of a face to find matches for in the collection. | 629e696f-0456-5bd5-aa49-50847570a653
| faceMatchThreshold | string | Specify the minimum confidence in the face match to return. (Optional) | 1.50
| MaxFaces | string | Maximum number of faces to return. (Optional) | 10



#### Response

mimetype: `application/json`

##### Success `200`

```
{
"message": "Faces Found."
"data": {}
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "MissingRequiredParameter",
  "message": "Missing required key 'FaceId' in params"
}
```

### search-faces-by-image

Detects the largest face in the image, and then searches the specified collection for matching faces.

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| bucketName | string | Name of the S3 bucket (Optional). | callen-images
| image | string | a path to the image | name of an image in S3 bucket image | abc.jpg
| collectionId | string | ID of the collection to search. | callen-images
| faceMatchThreshold | string | Specify the minimum confidence in the face match to return. (Optional) | 1.50
| MaxFaces | string | Maximum number of faces to return. (Optional) | 10



#### Response

mimetype: `application/json`

##### Success `200`

```
{
"message": "Faces Detected"
"data": {}
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "InvalidParameterException",
  "message": "Requested image should either contain bytes or s3 object."
}
```

### Contributing

#### How to Contribute

* Fork this repository
* Clone from your fork
* Make your contributions (Make sure your work is well tested)
* Create Pull request from the fork to this repo

#### Setting up environment variables

* Create a `.envrc` on parent folder
* Copy contents of `.envrc.default` file to newly created `.envrc` file and assign appropriate values to the listed variables.

#### Testing

* Test are written in the `test` directory
* Use the command `npm test` to run test

