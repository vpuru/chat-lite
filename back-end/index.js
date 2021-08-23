const PORT = 5000;
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

// auth task list
// - register accounts
// - create a jwt
// - issue the jwt to the client
// - validate existing jwt

// cors
const cors = require("cors");
app.use(cors());

// middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// database
const knex = require("./knex.js");

// crypto for passwords
const utils = require("./utils");

// passport
const passport = require("passport");
require("./passport.js")(passport);

// protected route
app.get("/protected", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.send("Authorized User");
});

// default route
app.get("/", (req, res) => {
  res.send("chat lite backend");
});

app.post("/register", (req, res) => {
  // hash our password
  const saltHash = utils.genPassword(req.body.password);

  // create our new user object
  const newUser = {
    username: req.body.username,
    hash: saltHash.hash,
    salt: saltHash.salt,
    accesslevel: "1",
  };

  // insert new user into the database
  knex("userdata")
    .insert(newUser)
    .then(() => {
      res.send({
        success: true,
        msg: "Registration Success!",
      });
    })
    .catch((err) => {
      console.log(err.code);
      switch (parseInt(err.code)) {
        case 23505:
          res.send({ success: false, msg: "Username already exists!" });
          break;
        default:
          console.log(err);
          res.send({ success: false, msg: "Internal Error" });
          break;
      }
    });
});

app.post("/login", (req, res) => {
  console.log(req.body.username);
  console.log(req.body.password);

  // search for the username
  knex("userdata")
    .where("username", req.body.username)
    .then((user) => {
      // no user was found
      if (user.length === 0) {
        res.status(200).json({ success: false, msg: "Could not find user" });
        return;
      }

      // verify the password against stored hash
      const isValid = utils.validPassword(req.body.password, user[0].hash, user[0].salt);

      // issue our token if valid
      if (isValid) {
        // create and send our jwt
        const tokenObject = utils.issueJWT(user[0]);
        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res.send({ msg: "Invalid password" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false, msg: "an error occured" });
    });
});

// listen for connections
io.on("connection", (socket) => {
  // console.log(`socket ${socket.id} connected`);

  // join a specific room
  socket.on("join room", (roomName) => {
    console.log(`socket ${socket.id} has joined room ${roomName}`);
    socket.join(roomName);
  });

  // message in a room
  socket.on("message room", (message, roomName) => {
    console.log(`${roomName}: ${message}`);
    io.to(roomName).emit("new message", message);
  });

  // leave room
  socket.on("leave room", (roomName) => {
    console.log(`socket ${socket.id} has left room ${roomName}`);
    socket.leave(roomName);
  });

  socket.on("disconnect", (socket) => {
    // console.log(`socket ${socket.id} has disconnected`);
  });
});

// listen on port
server.listen(PORT, () => {
  console.log(`Listening on *${PORT}`);
});
