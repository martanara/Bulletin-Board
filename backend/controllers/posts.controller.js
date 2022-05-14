const Post = require('../models/post.model');

exports.getAllPosts = async (req, res) => {
  try {
    const result = await Post
      .find()
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
};

exports.addNewPost = async (req, res) => {
  const { email, created, updated, status, title, text, image, price, phone, location } = req.body;
  const file = req.file;
  let fileName = '';
  if(file) fileName = file.path.split('/').slice(-1)[0];

  if(updated === 'undefined'){
    try {
      const newPost = new Post({ email, created, status, title, text, image: fileName, price, phone, location });
      await newPost.save();
      res.json(newPost);
    } catch(err) {
      res.status(500).json({ message: err });
    }
  } else {
    try {
      const newPost = new Post({ email, created, updated, status, title, text, image: fileName, price, phone, location });
      await newPost.save();
      res.json(newPost);
    } catch(err) {
      res.status(500).json({ message: err });
    }
  }
};

exports.editPost = async (req, res) => {
  const { email, created, updated, status, title, text, image, price, phone, location } = req.body;
  const file = req.file;
  let fileName = '';
  if (file) fileName = file.path.split('/').slice(-1)[0];

  try {
    const post = await Post.findById(req.params.id);
    if(post){
      post.email = email;
      post.created = created;
      post.updated = updated;
      post.status = status;
      post.title = title;
      post.text = text;
      post.image = fileName;
      post.price = price;
      post.phone = phone;
      post.location = location;
      await post.save();
      res.json(await Post.findById(req.params.id));
    } else res.status(404).json({ message: 'Not found' });
  }
  catch(err) {
    res.status(500).json({ message : err});
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = Post.findById(req.params.id);
    if(post){
      await Post.deleteOne({ _id: req.params.id });
      res.json(req.params.id);
    } else res.status(404).json({ message: 'Not found' });
  }
  catch(err) {
    res.status(500).json({ message : err});
  }
};
