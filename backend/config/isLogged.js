const isLogged = (req, res, next) => {
  if (!req.user) {
    res.redirect('/user/no-permission');
  } else {
    next();
  }
};

module.exports = isLogged;