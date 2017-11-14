import path from "path";
import fs from "fs";
const helper = {
  config: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.region
  },

  collectionIds: {
    collectionId1: "testing",
    collectionId2: "testing2"
  },

  image: {
    bucketName: process.env.bucketName,
    imageName: process.env.randomImage,
    imageName2: process.env.moderationImage,
    imageName3: process.env.celebritiesImage,
    uploadedImage: path.join(
      __dirname,
      "../images/Salihat-Military-Bridal-Shower-BellaNaija-2016-31.jpg"
    )
  }
};

export default helper;
