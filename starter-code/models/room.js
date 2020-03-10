const mongoose = require('mongoose');

const {Schema} = mongoose;

const roomSchema = new Schema({
    anuncio: String,
    arrendatario: { type: Schema.Types.ObjectId, ref: 'User' },
    arrendador: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true

  });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
