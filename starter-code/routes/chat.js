const express = require('express');
const router = express.Router();
const isAuthenticated = require('../helpers/authMiddleware');
const app = require('../app');
const ChatSchema = require('../models/chat');
const RoomSchema = require('../models/room');

//Socketio
const io = require('socket.io')();
app.socketIO = io;

app.io.on('connection', (socket) => {

  socket.on('room:join', function(room) {
    socket.join(room);
  });

  socket.on('chat:message', data => {
    new ChatSchema({message: data.message, sender: data.userId, room: data.room }).save();
    //app.io.emit('chat:message', data);
    socket.in(data.room).emit('chat:message', data)
  });

});

router.get('/:roomId', isAuthenticated, (req, res, next) => {
  ChatSchema.find({room: req.params.roomId})
    .then(messages =>  res.render('chat', {currentUser: req.session.currentUser, messages, roomId: req.params.roomId}));
});

module.exports = router;

//  new RoomSchema({anuncio: 'anunciox', arrendatario: '5e662b06cc340a1b6266215d', arrendador: '5e6762ae87acef69f8ce90e4' }).save();