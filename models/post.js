const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
    },
    text: {
      type: String,
      required: true,
    },
    avatar: {
      type: Buffer,
      default: null,
    },
    name: {
      type: String,
    },
    postPic: {
      type: Buffer,
    },
    postVideo: {
      type: Buffer,
    },
    dataType: {
      type: String,
      defaul: 'new post',
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
        color: {
          type: String,
        },
        name: {
          type: String,
        },
        avatar: {
          type: Buffer,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        dataType: {
          type: String,
          default: 'likes',
        },
      },
    ],
    unlikes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
        color: {
          type: String,
        },
        name: {
          type: String,
        },
        avatar: {
          type: Buffer,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        dataType: {
          type: String,
          default: 'unlikes',
        },
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
        avatar: {
          type: Buffer,
          default: null,
        },
        text: {
          type: String,
          required: true,
        },
        name: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        dataType: {
          type: String,
          default: 'comment on',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

postSchema.methods.toJSON = function () {
  const post = this;
  const postObject = post.toObject();
  // delete postObject.avatar;
  return postObject;
};

module.exports = Post = mongoose.model('post', postSchema);
