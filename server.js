const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
const port = 8080;
var cors = require('cors')

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
  const uploadPath = path.join(__dirname, 'uploads', uploadedFile.name);

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
	    console.log("err uploading",err);
      return res.status(500).send(err);
    }

    res.json({ message: 'File uploaded successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
