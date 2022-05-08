const express = require('express');
const router = express.Router();
const imageUpload = require('../config/imageUpload');

const PostController = require('../controllers/posts.controller');

router.get('/posts', PostController.getAllPosts);
router.get('/post/:id', PostController.getPostById);
router.post('/posts', imageUpload.single('image'), PostController.addNewPost);
router.put('/post/:id', imageUpload.single('image'), PostController.editPost);
router.delete('/post/:id', PostController.deletePost);

module.exports = router;
