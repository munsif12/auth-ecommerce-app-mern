const AWS = require("aws-sdk");
const S3 = new AWS.S3({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
});

//actual function which will upload image to amzn s3 bucket
const awsImageUploader = (file) => {
  let params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    ContentType: file.mimetype, //if you dont add this image will stil upload but when u try to view it instead of viwing it will download automatically
    Body: file.buffer,
  };
  return new Promise((res, rej) => {
    S3.upload(params, (err, data) => {
      if (err) rej(err);
      res(data);
    });
  });
};
module.exports = { awsImageUploader };
