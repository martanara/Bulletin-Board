const express = require('express');
const router = express.Router();

const PostController = require('../controllers/posts.controller');

router.get('/posts', PostController.getAllPosts);
router.get('/post/:id', PostController.getPostById);
router.post('/posts', PostController.addNewPost);
router.put('/post/:id', PostController.editPost);
router.delete('/post/:id', PostController.deletePost);

module.exports = router;
