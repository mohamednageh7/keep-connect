function socketConnect(io, socket, data) {
  io.emit('getPosts', 'happen');
  socket.on('post', (myData) => {
    console.log('this data is available');
    console.log(myData);
  });
}

module.exports = socketConnect;
