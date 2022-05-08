const multer = require('multer');
const uniqid = require('uniqid');

const imageUpload = multer({
  limits: 1000000000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../public/images');
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uniqid() + '-' + fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

module.exports = imageUpload;
