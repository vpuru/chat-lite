const fs = require("fs");
const path = require("path");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const knex = require("./knex");

const PUB_KEY = fs.readFileSync(__dirname + "/id_rsa_pub.pem");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithim: ["RS256"],
};

const strategy = new JwtStrategy(options, (payload, done) => {
  console.log(payload);
  return done(null, payload);
  // knex("userdata")
  //   .where("username", payload.sub)
  //   .then((user) => {
  //     if (user) {
  //       return done(null, user);
  //     } else {
  //       return done(null, false);
  //     }
  //   })
  //   .catch((error) => {
  //     return done(error, null);
  //   });
});

module.exports = (passport) => {
  passport.use(strategy);
};

// module.exports = (passport) => {
//   passport.use(
//     new JwtStrategy(options, (payload, done) => {
//       knex("userdata")
//         .where("username", payload.sub)
//         .then((user) => {
//           if (user) {
//             return done(null, user);
//           } else {
//             return done(null, false);
//           }
//         })
//         .catch((error) => {
//           return done(error, null);
//         });
//     })
//   );
// };
