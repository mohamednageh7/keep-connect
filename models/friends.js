const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const friendSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    friends: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
        avatar: {
          type: Buffer,
        },
        name: {
          type: String,
        },
        posts: {
          type: Object,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

friendSchema.methods.toJSON = function () {
  const friends = this;

  const friendsObject = friends.toObject();

  delete friendsObject.avatar;

  return friendsObject;
};

module.exports = Friends = mongoose.model('friends', friendSchema);
