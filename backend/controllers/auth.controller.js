const User = require('../models/user.model');

exports.loginUser = async (req, res) => {
  const { emails, displayName, id } = req.user;
  const email = emails[0].value;

  try {
    const user = await User.find( { email: { $eq: email } } );
    if(!user){
      const newUser = new User({ email, displayName, id, role: 'loggedUser' });
      await newUser.save();
    }
    res.redirect('/auth/logged');
  } catch(err) {
    res.status(500).json({ message: err });
  }
};
