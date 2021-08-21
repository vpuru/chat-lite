const PORT = 5000;
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

// cors
const cors = require("cors");
app.use(cors());

// our rooms
const rooms = ["room1", "room2", "room3", "room4"];

// default route
app.get("/", (req, res) => {
  res.send("chat lite backend");
});

// listen for connections
io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);

  // join a specific room
  socket.on("join room", (roomName) => {
    console.log(`Socket ${socket.id} has joined room ${roomName}`);
    socket.join(roomName);
  });

  // message in a room
  socket.on("message room", (message, roomName) => {
    console.log(`${roomName}: ${message}`);
    io.to(roomName).emit("new message", message);
  });

  // leave room
  socket.on("leave room", (roomName) => {
    console.log(`Socket ${socket.id} has left room ${roomName}`);
    socket.leave(roomName);
  });
});

// listen on port
server.listen(PORT, () => {
  console.log(`Listening on *${PORT}`);
});
