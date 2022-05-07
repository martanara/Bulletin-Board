const Post = require('../models/post.model');

exports.getAllPosts = async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
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
  console.log('response', req.body);
  const { author, created, updated, status, title, text, image, price, phone, location } = req.body;

  try {
    const newPost = new Post({ author, created, updated, status, title, text, image, price, phone, location });
    await newPost.save();
    res.json(newPost);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.editPost = async (req, res) => {
  const { author, created, updated, status, title, text, image, price, phone, location } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if(post){
      post.author = author;
      post.created = created;
      post.updated = updated;
      post.status = status;
      post.title = title;
      post.text = text;
      post.image = image;
      post.price = price;
      post.phone = phone;
      post.location = location;
      await post.save();
      res.json(await Post.find());
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
      res.json(await Post.find());
    } else res.status(404).json({ message: 'Not found' });
  }
  catch(err) {
    res.status(500).json({ message : err});
  }
};
