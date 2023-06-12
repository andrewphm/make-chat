module.exports = (io, socket) => {
  // Listen for "new user" socket emits
  socket.on('new user', (username) => {
    console.log(`${username} has joined the chat! ✋`);
    // Save the username to the socket as well as
    // the session
    io.emit('new user', username);
  });
};
