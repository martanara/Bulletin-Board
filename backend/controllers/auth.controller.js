const User = require('../models/user.model');

exports.loginUser = async (req, res) => {
  const { emails, displayName } = req.user;
  const email = emails[0].value;

  try {
    const user = await User.find( { email: { $eq: email } } );
    if(!user){
      const newUser = new User({ email, displayName, role: 'loggedUser' });
      await newUser.save();
    }
    res.redirect('http://localhost:3000/');
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getUser = async (req, res) => {
  const { emails } = req.user;
  const email = emails[0].value;

  console.log(req.user);

  try {
    const user = await User.find( { email: { $eq: email } } );
    if(!user) res.status(404).json({ post: 'Not found' });
    else {
      console.log('user', user);
      res.json(user);}
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

