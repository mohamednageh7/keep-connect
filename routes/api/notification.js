const express = require('express');
const router = express.Router();
const auth = require('../../middelware/auth');
const Post = require('../../models/post');
const User = require('../../models/user');
const Friends = require('../../models/friends');
const Notification = require('../../models/notifcation');
const io = require('../../server');

// @route  Post api/notification
// @desc   add notification route
// @access private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    const friendList = await Friends.findOne({ user: req.user.id });
    const user = await User.findById(req.user.id);
    let notification = await Notification.findOne({ user: req.user.id });
    if (!notification) {
      notification = new Notification({
        user: req.user.id,
      });
    }

    // this array will contain all my likesm, unlikes, comment, posts
    let collector = [];
    // get all my likes
    let likesPost = [];
    posts.map((item) => {
      if (item.likes.length > 0) {
        item.likes.map((like) => {
          if (like.user.toString() !== req.user.id) {
            // like[postId] = item.id;
            likesPost.push(like);
          }
        });
      }
    });
    // get all my unlikes
    let unlikesPost = [];
    posts.map((item) => {
      if (item.unlikes.length > 0) {
        item.unlikes.map((unlike) => {
          if (unlike.user.toString() !== req.user.id) {
            unlikesPost.push(unlike);
          }
        });
      }
    });
    //get all my comments
    let commentOnPost = [];
    posts.map((item) => {
      if (item.comments.length > 0) {
        item.comments.map((comment) => {
          if (comment.user.toString() !== req.user.id) {
            commentOnPost.push(comment);
          }
        });
      }
    });
    //get all my posts
    let getPost = [];
    let friendsPost = {
      name: '',
      avatar: '',
      user: '',
      dataType: '',
      data: '',
    };
    if (friendList) {
      if (friendList.friends.map((item) => item.posts).length > 0) {
        friendList.friends.forEach(async (friend) => {
          const friendPost = await Post.find({
            user: friend.user,
          });

          if (friendPost.length > 0) {
            friendPost.map((item) => {
              friendsPost = {
                name: item.name,
                avatar: item.avatar,
                user: item.user,
                dataType: item.dataType,
                date: item.createdAt,
                _id: item._id,
              };
              if (
                !getPost.filter((item) => item._id === friendsPost._id).length >
                0
              ) {
                getPost.push(friendsPost);
              }
            });
            collector = [
              ...likesPost,
              ...unlikesPost,
              ...commentOnPost,
              ...getPost,
            ];
            let myobject = {};
            collector.map((item) => {
              if (!myobject[item._id]) {
                myobject[item._id] = item;
              }
            });

            notification.notifications = Object.values(myobject);
            notification.notifications.sort((a, b) =>
              a.date > b.date ? -1 : 1
            );
            notification.save();
            res.json(notification);
          } else {
            collector = [...likesPost, ...unlikesPost, ...commentOnPost];
            let myobject = {};
            collector.map((item) => {
              if (!myobject[item._id]) {
                myobject[item._id] = item;
              }
            });
            notification.notifications = Object.values(myobject);

            notification.notifications.sort((a, b) =>
              a.date > b.date ? -1 : 1
            );
            notification.save();
            res.json(notification);
          }
        });
      } else {
        collector = [...likesPost, ...unlikesPost, ...commentOnPost];
        let myobject = {};
        collector.map((item) => {
          if (!myobject[item._id]) {
            myobject[item._id] = item;
          }
        });
        notification.notifications = Object.values(myobject);
        notification.notifications.sort((a, b) => (a.date > b.date ? -1 : 1));
        notification.save();
        res.json(notification);
      }
    } else if (!friendList) {
      collector = [...likesPost, ...unlikesPost, ...commentOnPost];
      let myobject = {};
      collector.map((item) => {
        if (!myobject[item._id]) {
          myobject[item._id] = item;
        }
      });
      notification.notifications = Object.values(myobject);
      notification.notifications.sort((a, b) => (a.date > b.date ? -1 : 1));
      notification.save();
      res.json(notification);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Not Authorized');
  }
});

module.exports = router;
