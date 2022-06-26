
const Response = require('../Responses/Response')

const AWS = require("aws-sdk");
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

cloudinary.config({
  cloud_name: "dw8i3sfoa",
  api_key: "173739589868424",
  api_secret: "6RgTOHMuYF_rUqexhPiZsxVca4A"
})

AWS.config.update({
  secretAccessKey: "UVxXsRP9SDetgKf7931RAfzeR27MC8HOXcnGiTUP",
  accessKeyId: "AKIAZIMDO5I2OU2Q7AEK",
  region: "ap-south-1",
});

var s3 = new AWS.S3();

class FileUpload {
  async uploadFile(request, response, next, pictureURL) {
    let params = {
      // ACL: "public-read", 
      Bucket: "wen-category-pictures",
      Key: request.name,
      Body: request.data,
    }

    s3.upload(params, (err, result) => {
      if (err) {
        return response.json(Response.fail(
          error.message,
          "Failed to upload",
        ))
      } else {
        pictureURL(result.Location)
      }
    })

  }

  async uploadFile(request, response, next, pictureURL) {
    let streamUpload = (request) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);

              pictureURL(result.url)
            } else {
              reject(error);

              return response.json(Response.fail(
                error.message,
                "Failed to upload",
              ))
            }
          }
        );

        streamifier.createReadStream(request.file.data).pipe(stream);
      });
    };

    async function upload(request) {
      let result = await streamUpload(request);
    }

    upload(request);
  }

}

module.exports = new FileUpload()

