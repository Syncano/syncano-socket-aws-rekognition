const {
  AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, randomImage, bucketName, moderationImage,
  celebritiesImage, uploadedImage
} = process.env;

const helper = {
  config: {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
  },

  collectionIds: {
    collectionId1: 'testing',
    collectionId2: 'testing2',
  },

  image: {
    bucketName,
    imageName: randomImage,
    imageName2: moderationImage,
    imageName3: celebritiesImage,
    uploadedImage,
  },
};

export default helper;
