const mongoose = require('mongoose');

const {Schema} = mongoose;

const chatSchema = new Schema({
    message: String,
    sender: String,
    room: { type: Schema.Types.ObjectId, ref: 'Room' }

  },
  {
    timestamps: true

  });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
