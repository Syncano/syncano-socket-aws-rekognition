# Syncano Socket Aws-photo-rekognition

[![CircleCI](https://circleci.com/gh/Syncano/syncano-socket-aws-rekognition/tree/implement-photo-rekognition-using-imageUrl.svg?style=svg)](https://circleci.com/gh/Syncano/syncano-socket-aws-rekognition/tree/implement-photo-rekognition-using-imageUrl)

Aws-photo-rekognition is a service that enables you to add image analysis to your applications. With Rekognition, you can detect objects, scenes, and faces in images. You can also search and compare faces.

### Current Features

Aws-photo-rekognition features the following actions

| Action                 | Description                                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| compareFaces           | Compares a face in the source image with each face detected in the target input image                 |
| createCollection       | Create AWS Rekognition collection                                                                     |
| deleteCollection       | Delete AWS Rekognition collection using the collectionId.                                             |
| deleteFaces            | Deletes Faces in uploaded images.                                                                     |
| detectFaces            | Detect faces in uploaded images.                                                                      |
| detectLabels           | Detect Labels in uploaded images.                                                                     |
| detectModerationLabels | Detects explicit or suggestive adult content in a specified JPEG or PNG format image.                 |
| getCelebrityInfo       | Gets the name and additional information about a celebrity based on his or her Rekognition ID.        |
| indexFaces             | Detects faces in the input image and adds them to the specified collection.                           |
| listCollections        | Returns list of collection IDs in your account.                                                       |
| listFaces              | Returns metadata for faces in the specified collection.                                               |
| recognizeCelebrities   | Returns an array of celebrities recognized in the input image.                                        |
| searchFaces            | Searches for matching faces in the collection the face belongs to.                                    |
| searchFacesByImage     | Detects the largest face in the image, and then searches the specified collection for matching faces. |

For more information, lookup [Amazon Polly API Reference](https://docs.aws.amazon.com/polly/latest/dg/API_Reference.html)

### Installation

```
syncano-cli add aws-photo-rekognition
```

### Configuration

To use this socket, you will need an AWS account and credentials. Ensure your credentials corresponds with the folllowing below:

```
AWS_ACCESS_KEY_ID="myAccessKey"
AWS_SECRET_ACCESS_KEY="mySecretKey"
region=us-east-1
```

Configuration values can be set on command line when you run

```
syncano-cli deploy aws-photo-rekognition
```

## Socket Documentation

To view socket endpoints and corresponding parameters, kindly visit [here](https://syncano.io/#/sockets/aws-photo-rekognition)

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

* Ensure all your tests are written in the `test` directory
* Use the command `npm test` to run tests
