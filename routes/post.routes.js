const { Router, urlencoded } = require('express');
const router = new Router();
//const bcryptjs = require('bcryptjs');
//const saltRounds = 10;
const Post = require('../models/Post.model');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');
const routeGuard = require('../configs/route-guard.config');

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});
const upload = multer({ storage });

//router to show the form: GET
router.get('/post-form', (req, res) => res.render('post/post-form'));
//router to create a post: POST
router.post('/post-form', upload.single('attachment'), (req, res, next) => {
  const url = req.file.path;
  //first I need to get the image
  //then get the content and the picname
  //then the path of the uploaded user picture (picPath)
  //then save all that info on database by Post.create
  //colocar um link no user-profile to redirect to /post-form

  //req.bogy são campos do form do view
  const { content, image, name } = req.body;
  Post.create({
    content,
    image,
    name,
    creator: req.session.currentUser._id
  })
    .then(post => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
