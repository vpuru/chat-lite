const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const { callbackify } = require("util");
const io = socket(server);
const PORT = 5000;

// our users!
const users = [];

// our messages!
const messages = {
  room1: [],
  room2: [],
  room3: [],
  room4: [],
};

// listen for connections
io.on("connection", (socket) => {
  // join the server
  socket.on("join server", (username) => {
    const user = {
      username,
      id: socket.id,
    };

    users.push(user);
    io.emit("update users", users);
  });

  // join a room
  socket.on("join room", (roomName, callBack) => {
    socket.join(roomName);
    callBack(messages[roomName]);
  });

  // send a message
  socket.on(
    "send message",
    (content, recipient, sender, chatName, isChannel) => {
      // create our payload
      const payload = {
        content,
        chatName,
        sender,
      };

      // if we're doing a direct message
      payload.chatName = sender;

      // emit our event
      socket.to(recipient).emit("new message", payload);

      // add to our message logs if it's a room
      if (messages[roomName]) {
        messages[roomName].push({
          sender,
          content,
        });
      }
    }
  );

  // disconnect
  socket.on("disconnect", (socket) => {
    users = users.filter((user) => user.id != socket.id);
    io.emit("update users", users);
  });
});

app.listen(PORT, () => {
  console.log(`Listening on *${PORT}`);
});
