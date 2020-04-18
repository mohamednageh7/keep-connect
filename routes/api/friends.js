const express = require('express');
const router = express.Router();
const auth = require('../../middelware/auth');
const Post = require('../../models/post');
const User = require('../../models/user');
const Friends = require('../../models/friends');
const { check, validationResult } = require('express-validator');

// @route  post api/firends/:id
// @desc   Add new friend
// @access private
router.put('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ msg: 'Not authorized' });
    }

    let friendList = await Friends.findOne({ user: req.user.id });
    if (!friendList) {
      friendList = new Friends({
        user: req.user.id,
      });
    }
    const userPost = await Post.find({ user: req.params.id });
    const addedUser = await User.findById(req.params.id);
    if (!addedUser) {
      return res.status(400).json({ msg: 'User not found' });
    }

    if (
      friendList.friends.filter(
        (friend) => friend.user.toString() === req.params.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: 'User already added' });
    }

    const newFriend = {
      name: addedUser.name,
      user: addedUser.id,
      avatar: addedUser.avatar,
      posts: userPost,
    };

    friendList.friends.unshift(newFriend);

    await friendList.save((err, friend) => {
      // console.log(friend);
      if (err) return res.json({ msg: 'no friends' });
      Friends.find({ _id: friend._id }).exec((err, friend) => {
        io.emit('get friends', friend);
      });
    });
    res.json(friendList);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: "user you try to add don't exsit" });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  get api/firends/
// @desc   get all my friends
// @access private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ msg: 'Not authorized' });
    }
    const friendList = await Friends.findOne({ user: req.user.id });
    if (!friendList) {
      return res.status(400).json({ msg: 'No friend for this user' });
    }

    //   await friendList.save();

    res.json(friendList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  get api/firends/:id
// @desc   get othere user friends
// @access private
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ msg: 'Not authorized' });
    }

    const otherUser = await User.findById(req.params.id);
    console.log(otherUser._id);
    if (!otherUser) {
      return res.status(400).json({ msg: 'User not exsit' });
    }

    const hisFriendList = await Friends.findOne({ user: otherUser.id });
    if (!hisFriendList) {
      return res.status(400).json({ msg: 'No friends found for this user' });
    }

    res.json(hisFriendList);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: "user you get to add don't exsit" });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  Delet api/firends/:id/:friend_id
// @desc   get othere user friends
// @access private
router.delete('/:id/:friend_id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ msg: 'Not Authorized' });
    }
    const friendList = await Friends.findOne({ user: req.params.id });

    if (!friendList) {
      return res
        .status(400)
        .json({ msg: "You don't have friend yet! add some" });
    }

    if (
      friendList.friends.filter((friend) => {
        return friend.user.toString() === req.params.friend_id;
      }).length === 0
    ) {
      return res
        .status(400)
        .json({ msg: 'This user is already not your friend' });
    }

    friendList.friends = friendList.friends.filter((friend) => {
      return friend.user.toString() !== req.params.friend_id;
    });
    // console.log(friendList.friends);

    await friendList.save((err, friend) => {
      // console.log(friend);
      if (err) return res.json({ msg: 'no friends to delete' });
      Friends.find().exec((err, friends) => {
        io.emit('delete friends', friends);
      });
    });
    res.json(friendList);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: "user you get to add don't exsit" });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
