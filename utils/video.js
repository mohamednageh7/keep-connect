const multer = require('multer');

const videoUplaod = multer({
  limits: {
    fileSize: 50000000
  },
  fileFilter(req, file, cd) {
    if (!file.originalname.match(/\.(mp4| ogg| wmv| AVI| HDV|webm)$/)) {
      return cd(
        new Error('Your video fromat should be mp4,ogg,wmv,AVI,HDV,webm')
      );
    }
    cd(undefined, true);
  }
});

module.exports = videoUplaod;
