const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});
const upload = multer({ storage });
/* GET home page */
router.get('/', (req, res) => res.render('index', { title: 'App created with Ironhack generator 🚀' }));

module.exports = router;
