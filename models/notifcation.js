const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  notifications: {
    type: Array,
  },
});

module.exports = Notification = mongoose.model(
  'notification',
  notificationSchema
);
