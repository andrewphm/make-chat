//App.js
const express = require('express');
const app = express();
//Socket.io has to use the http server
const server = require('http').Server(app);

// Socket.io
const io = require('socket.io')(server);

let onlineUsers = {};
let channels = { General: [] };

io.on('connection', (socket) => {
  require('./sockets/chat.js')(io, socket, onlineUsers, channels);
});

//Express View Engine for Handlebars
const exphbs = require('express-handlebars');

app.use('/public', express.static('public'));
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home');
});

server.listen('3000', () => {
  console.log('Server listening on Port 3000');
});
