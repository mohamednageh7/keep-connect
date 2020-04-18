const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const connectDB = require('./config/db');
const app = express();
const server = http.createServer(app);
module.exports = io = socketio(server);
const PORT = process.env.PORT;
// Connect Database
connectDB();

// Init Middelware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => {
//   res.send('Api running');
// });

// connect to socket
io.on('connection', (socket) => {
  //   console.log('socket connected');
});
// Define Route
app.use('/api/users', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/post'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/friends', require('./routes/api/friends'));
app.use('/api/notification', require('./routes/api/notification'));

server.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
