const express = require('express');
const router = express.Router();
const auth = require('../../middelware/auth');
const { check, validationResult } = require('express-validator');
const request = require('request');
const Profile = require('../../models/profile');
const User = require('../../models/user');
const Post = require('../../models/post');

// @route  GET api/profile/me
// @desc   Get my profile
// @access private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  Post api/profile
// @desc   create or update
// @access private
router.post('/', auth, async (req, res) => {
  const {
    username,
    bio,
    company,
    hoppys,
    location,
    githubusername,
    youtube,
    facebook,
    instagram,
    twitter,
    linkedin,
    website,
  } = req.body;

  // Build profile object
  const profileField = {};
  profileField.user = req.user.id;
  if (username) profileField.username = username;
  if (bio) profileField.bio = bio;
  if (company) profileField.company = company;
  if (website) profileField.website = website;
  if (location) profileField.location = location;
  if (githubusername) profileField.githubusername = githubusername;
  if (hoppys) {
    profileField.hoppys = hoppys.split(',').map((hoppy) => hoppy.trim());
  }

  //Build social object
  profileField.social = {};
  if (youtube) profileField.social.youtube = youtube;
  if (twitter) profileField.social.twitter = twitter;
  if (facebook) profileField.social.facebook = facebook;
  if (linkedin) profileField.social.linkedin = linkedin;
  if (instagram) profileField.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileField },
        { new: true }
      );

      return res.json(profile);
    }

    // create profile
    profile = new Profile(profileField);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/profile/:id
// @desc   Get all profile
// @access private
router.get('/', auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    if (!profiles) {
      return res.status(400).json({ msg: 'No Profiles Found' });
    }
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/profile/:id
// @desc   Get single profile by id
// @access private
router.get('/user/:user_id', auth, async (req, res) => {
  try {
    const singleProfile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!singleProfile) {
      return res.status(400).json({ msg: 'Profile not found!' });
    }

    res.json(singleProfile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found!' });
    }
    res.status(500).send('Server Error');
  }
});

// @route  delete api/profile/:id
// @desc   delete all profile
// @access private
router.delete('/', auth, async (req, res) => {
  try {
    //delete user post
    await Post.deleteMany({ user: req.user.id });

    // Delete profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Delete user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User account deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server Error');
  }
});

// @route  Put api/profile/experience
// @desc   create user experience
// @access private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company name require').not().isEmpty(),
      check('from', 'From is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  Put api/profile/experience/:id
// @desc   delete user experience
// @access private
router.delete('/experience/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.experience = profile.experience.filter((exp) => {
      return exp.id !== req.params.id;
    });
    // const removeIndex = profile.experience
    //   .map(item => item.id)
    //   .indexOf(req.params.id);
    // profile.experience.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  Put api/profile/education
// @desc   create user experience
// @access private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is require').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route  Put api/profile/education/:id
// @desc   delete user education
// @access private
router.delete('/education/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education = profile.education.filter((edu) => {
      return edu.id !== req.params.id;
    });
    // const removeIndex = profile.experience
    //   .map(item => item.id)
    //   .indexOf(req.params.id);
    // profile.experience.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  Get api/profile/github/:username
// @desc   Get github repos
// @access private
router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      url: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.Client_Secret}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        res.status(404).json({ msg: 'No Github profile found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
