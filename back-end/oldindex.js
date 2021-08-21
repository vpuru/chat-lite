const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const PORT = 3000;

// cors
const cors = require("cors");
app.use(cors());

// our users!
const users = [];

// our messages!
const messages = {
  general: [],
  room1: [],
  room2: [],
  room3: [],
  room4: [],
};

// check if server is running
app.get("/", (req, res) => {
  res.send("chat lite backend");
});

// listen for connections
io.on("connection", (socket) => {
  console.log(`Socket connected ${socket.id}`);

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

  // test
  socket.on("test", (msg) => {
    console.log(msg);
  });

  socket.on("error", (err) => {
    console.log(err);
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
