const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 50000000
  },
  fileFilter(req, file, cd) {
    if (!file.originalname.match(/\.(jpg| jpeg | png| PNG| JPG|JPEG)$/)) {
      return cd(new Error('Image must be jpg,jpeg,png'));
    }
    cd(undefined, true);
  }
});

module.exports = upload;
