const User = require('../models/user.model');
const NODE_ENV = process.env.NODE_ENV;

exports.addNewUser = async (req, res) => {
  const { name, email, role, loggedIn } = req.body;

  try {
    const user = await User.findOne( { email: { $eq: email } } );
    if(!user){
      const newUser = new User({ name, email, role, loggedIn });
      await newUser.save();
      res.json(newUser);
    }
    else res.json({ exists: 'true' });
  } catch(err) {
    if(NODE_ENV === 'production') console.log('Database error...');
    else res.status(500).json(err);
  }
};

