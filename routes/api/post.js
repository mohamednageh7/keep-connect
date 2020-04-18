const express = require('express');
const router = express.Router();
const auth = require('../../middelware/auth');
const Post = require('../../models/post');
const User = require('../../models/user');
const Friends = require('../../models/friends');
const { check, validationResult } = require('express-validator');
const io = require('../../server');

// @route  Post api/posts
// @desc   add post route
// @access private
router.post(
  '/',
  [auth, [check('text', 'Post can not be empty').not().isEmpty()]],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        res.status(400).json({ msg: 'User not found' });
      }
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
        dataType: 'new post',
      });
      newPost.save((err, post) => {
        // console.log(post);
        if (err) return res.json({ msg: 'faild to post' });
        Post.find({ _id: post._id }).exec((err, post) => {
          io.emit('new post created', post);
        });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Not Authorized');
    }
  }
);

// @route  Get api/posts/
// @desc  get my posts
// @access private

router.get('/', auth, async (req, res) => {
  try {
    let friendList = await Friends.findOne({ user: req.user.id });

    let postitem = await Post.find({ user: req.user.id }).sort({ data: 1 });

    if (!postitem) {
      return res.status(400).json({ msg: 'No post Found! Start now' });
    }

    if (friendList) {
      if (friendList.friends.map((item) => item.posts).length > 0) {
        friendList.friends.forEach(async (friend) => {
          const friendPost = await Post.find({
            user: friend.user,
          }).sort({ data: -1 });

          if (friendPost.length > 0) {
            friendPost.map((item) => {
              postitem.push(item);
              postitem.sort((a, b) => b.createdAt - a.createdAt);
            });
            return res.json(postitem);
          }
          postitem.sort((a, b) => b.createdAt - a.createdAt);
          return res.json(postitem);
        });
      }
    } else {
      postitem.sort((a, b) => b.createdAt - a.createdAt);
      res.json(postitem);
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server Error');
  }
});

// @route  Get api/posts/:id
// @desc   get post by id
// @access private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ error: { msg: 'No post found' } });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'No post found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route  Delete api/posts/delete/id
// @desc   delete post
// @access private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: 'No post found' });
    }
    // Check on user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ error: { msg: 'User not authorized' } });
    }
    await post.remove((err, post) => {
      // console.log(post);
      if (err) return res.json({ msg: 'no post to delete' });
      Post.findOneAndDelete({ _id: post._id }).exec((err, posts) => {
        io.emit('delete post');
      });
    });
    res.json({ msg: 'Post removed' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'No post found' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  put api/posts/likes/:id
// @desc   add likes
// @access private

router.put('/likes/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if user unlike this post
    if (
      post.unlikes.filter((unlike) => unlike.user.toString() === req.user.id)
        .length > 0
    ) {
      const removeIndex = post.unlikes
        .map((item) => item.id)
        .indexOf(req.user.id);
      post.unlikes.splice(removeIndex, 1);

      // post.unlikes = post.unlikes.filter(
      //   (unlike) => unlike.user.toString() !== req.user.id
      // );
    }

    // Check if user already like the post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      post.likes = post.likes.filter(
        (like) => like.user.toString() !== req.user.id
      );
    } else {
      post.likes.unshift({
        user: req.user.id,
        name: req.user.name,
        avatar: req.user.avatar,
        dataType: 'likes your post',
      });
    }

    await post.save((err, post) => {
      if (err) return res.json({ msg: 'no like to do' });
      Post.find({ _id: post._id }).exec((err, post) => {
        io.emit('add likes', post);
      });
    });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  put api/posts/unlike/:id
// @desc   add unlikes
// @access private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if user like this post
    if (
      post.likes.map((like) => like.user.toString() === req.user.id).length > 0
    ) {
      // post.likes = post.likes.splice(req.user.id, 1);
      // post.likes = post.likes.filter(
      //   (like) => like.user.toString() !== req.user.id
      // );

      const removeIndex = post.likes
        .map((item) => item.id)
        .indexOf(req.user.id);
      post.likes.splice(removeIndex, 1);
    }

    // Check if user already like the post
    if (
      post.unlikes.filter((unlike) => unlike.user.toString() === req.user.id)
        .length > 0
    ) {
      post.unlikes = post.unlikes.filter(
        (unlike) => unlike.user.toString() !== req.user.id
      );
      // return res.status(400).json({ msg: 'Post already unliked' });
    } else {
      post.unlikes.unshift({
        user: req.user.id,
        name: req.user.name,
        avatar: req.user.avatar,
        dataType: 'unlikes you post',
      });
    }

    await post.save((err, post) => {
      if (err) return res.json({ msg: 'no unlike to do' });
      Post.find({ _id: post._id }).exec((err, post) => {
        io.emit('add unlikes', post);
      });
    });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  put api/posts/comments/:id
// @desc   add comment route
// @access private
router.post(
  '/comments/:id',
  [auth, [check('text', 'Comment can not be empty').not().isEmpty()]],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(400).json({ msg: 'User not found' });
      }
      const post = await Post.findById(req.params.id);
      const newcomment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
        dataType: 'comments on your post',
      };
      post.comments.push(newcomment);
      await post.save((err, post) => {
        if (err) return res.json({ msg: 'no comment' });
        Post.find({ _id: post._id }).exec((err, post) => {
          io.emit('add comment', post);
        });
      });
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Not Authorized');
    }
  }
);

// @route  Delete api/posts/comments/:id/:comment_id
// @desc   add comment route
// @access private
router.delete('/comments/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: 'Post not found' });
    }
    const myComment = await post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!myComment) {
      return res
        .status(400)
        .json({ msg: 'The comment your try to delete is already deleted' });
    }

    if (myComment.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: 'User not authorized' });
    }
    post.comments = post.comments.filter((comment) => {
      return comment.id !== myComment.id.toString();
    });
    await post.save((err, post) => {
      if (err) return res.json({ msg: 'no comment deleted' });
      Post.find({ _id: post._id }).exec((err, post) => {
        io.emit('delete comment', post);
      });
    });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
