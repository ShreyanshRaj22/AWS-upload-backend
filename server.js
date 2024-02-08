const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
const port = 8080;
var cors = require('cors')

const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAW3MEFRUDQS6KPIW3',
  secretAccessKey: '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',
  region: 'us-east-1'
});


app.use(cors())

app.use(fileUpload());

// Serve static files from the 'uploads' directory
app.use(express.static(path.join(__dirname, 'uploads')));
app.get('/health', (req,res) => {
	console.log("Up and running!");
	return res.status(200);
});

app.post('/upload', (req, res) => {
  console.log("Uploading file");

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  }

  const uploadedFile = req.files.file;

  // Create an instance of the S3 service
  const s3 = new AWS.S3();

  // Set the parameters for the S3 upload
  const uploadParams = {
    Bucket: 'healthbucket9',
    Key: uploadedFile.name,
    Body: uploadedFile.data
  };

  // Upload the file to S3
  s3.upload(uploadParams, (err, data) => {
    if (err) {
      console.error("Error uploading file to S3:", err);
      return res.status(500).json({ message: 'Error uploading file to S3' });
    }

    console.log("File uploaded successfully to S3:", data.Location);
    res.json({ message: 'File uploaded successfully to S3', location: data.Location });
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
