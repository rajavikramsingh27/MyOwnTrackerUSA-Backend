
const AWS = require("aws-sdk");

AWS.config.update({
  secretAccessKey: "sT8IbnEeFlQ57iFhMVd59SI9uj6YL5KN4Jf2fzTH",
  accessKeyId: "AKIAZIMDO5I2DYFHXDZQ",
  region: "ap-south-1",
});

var s3 = new AWS.S3();

class FileUpload {
  uploadS3(request, response, next) {
    const { originalname, buffer } = request.file

    let params = {
      // ACL: "public-read", 
      Bucket: "wen-category-pictures",
      Key: originalname,
      Body: buffer,
    }

    s3.upload(params, (err, result) => {
      if (err) {
        return response.status(500).json({
          message: "Failed to upload",
          error: err.message,
        })
      } else {
        // console.log(result.Location);
        request.url = result.Location
        next()
      }
    })

  }

  async uploadS33(request, response, next, pictureURL) {
    let params = {
      // ACL: "public-read", 
      Bucket: "wen-category-pictures",
      Key: request.nameImage,
      Body: request.data,
    }

    s3.upload(params, (err, result) => {
      if (err) {
        return response.status(500).json({
          message: err.message,
          error: "Failed to upload",
        })
      } else {
        pictureURL(result.Location)
      }
    })
  }
}

module.exports = new FileUpload()



// const handleFileUpload = (request, response, next) => {
//   const { originalname, buffer } = request.file;

//   // console.log(buffer);

//   let params = {
//     // ACL: "public-read", 
//     Bucket: "wen-category-pictures",
//     // Bucket: "demowendemo",        
//     Key: originalname,
//     Body: buffer,
//   };

//   // s3.createBucket(params, (error, data) => {
//   //     if (error) {
//   //         console.log(error);

//   //         return response.status(400).json({
//   //             message: "Bucket creation is failed",
//   //             error: error.message
//   //         });
//   //     } else {
//   //         console.log("Bucket is create successfully.", data.Location);

//   //         return response.status(200).json({
//   //             message: "Bucket is create successfully",
//   //             data: data.Location,
//   //         });
//   //     }
//   // })

//   s3.upload(params, (err, result) => {
//     if (err) {
//       return response.status(500).json({
//         message: "Failed to upload",
//         error: err.message,
//       });
//     } else {
//       console.log(result.Location);
//       request.url = result.Location
//       next()

//       //   return response.status(200).json({
//       //       message: "File Uploaded",
//       //       imageURL: result.Location,
//       //       result,
//       //     });
//     }
//   });

// };

// module.exports = {
//   handleFileUpload,
// };


