document.addEventListener('DOMContentLoaded', () => {
  // Connect to the socket.io server
  const socket = io.connect();

  const createUserBtn = document.getElementById('create-user-btn');
  createUserBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let usernameInput = document.getElementById('username-input');
    let username = usernameInput.value;
    if (username.length > 0) {
      // Emit to the server the new user
      socket.emit('new user', username);
      const usernameForm = document.querySelector('.username-form');
      usernameForm.remove();
    }
  });

  //socket listeners
  socket.on('new user', (username) => {
    console.log(`${username} has joined the chat`);
  });
});
