const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const sharp = require('sharp');
const auth = require('../../middelware/auth');
const avatarUpload = require('../../utils/avatar');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/user');

// @route  Post api/users
// @desc   Rgister User
// @access publuc
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      // See if user exsit
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exsits' }] });
      }

      user = new User({
        name,
        email,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      // return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7 days',
      });
      user.tokens = user.tokens.concat({ token });
      await user.save();
      res.json({ user, token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route  Post api/users/logout
// @desc   logout User
// @access private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
  }
});

// @route  get api/users/
// @desc   get all User
// @access private
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
  }
});

// @route  Post api/users/logout
// @desc   logout User from one device
// @access private
router.post('/logout', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.tokens = user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await user.save();
    res.json(user.tokens);
  } catch (err) {
    console.error(err.message);
    res.status(500).send();
  }
});

// @route  Post api/users/logout
// @desc   logout User from one device
// @access private
router.post('/logout/all', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.tokens = [];
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send();
  }
});

// Adding my avatart
// @route  Post api/users/avatar
// @desc   upload profile image
// @access private
router.put(
  '/avatar',
  auth,
  avatarUpload.single('avatar'),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 400, height: 400 })
        .png()
        .toBuffer();
      user.avatar = buffer;
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
    }
  },
  (err, req, res, next) => {
    res.status(400).send({ error: err.message });
  }
);

// Adding my avatart
// @route  Delete api/users/avatar
// @desc   delete profile image
// @access private
router.delete(
  '/avatar',
  auth,
  avatarUpload.single('avatar'),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      user.avatar = undefined;
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
    }
  },
  (err, req, res, next) => {
    res.status(400).send({ error: err.message });
  }
);

// get my avatart
// @route  Get api/users/avatar/:id
// @desc   get user image by id
// @access private
router.get(
  '/avatar/:id',
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user || !user.avatar) {
        return res
          .status(400)
          .json({ msg: "The user you try to get it's image not exsit " });
      }
      res.set('Content-Type', 'image/png');
      res.send(user.avatar);
    } catch (err) {
      console.error(err.message);
      res.status(400).send('Seever Error');
    }
  },
  (err, req, res, next) => {
    res.status(400).send({ error: err.message });
  }
);

module.exports = router;
