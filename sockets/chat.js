module.exports = (io, socket, onlineUsers) => {
  // Listen for "new user" socket emits
  socket.on('new user', (username) => {
    console.log(`${username} has joined the chat! ✋`);
    // Save the username to the socket as well as
    // the session
    onlineUsers[username] = socket.id;
    socket['username'] = username;

    io.emit('new user', username);
  });

  socket.on('new message', (data) => {
    console.log(`🎤 ${data.sender}: ${data.message} 🎤`);
    io.emit('new message', data);
  });

  socket.on('get online users', () => {
    socket.emit('get online users', onlineUsers);
  });

  socket.on('disconnect', () => {
    //This deletes the user by using the username we saved to the socket
    delete onlineUsers[socket.username];
    io.emit('user has left', onlineUsers);
  });
};
