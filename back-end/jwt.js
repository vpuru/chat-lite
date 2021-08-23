const jwt = require("jsonwebtoken");
const fs = require("fs");

const PRIV_KEY = fs.readFileSync(__dirname + "/id_rsa_priv.pem", "utf8");
const PUB_KEY = fs.readFileSync(__dirname + "/id_rsa_pub.pem", "utf8");

const payloadObj = {
  name: "Varun Purushothaman",
  admin: false,
};

const signedJWT = jwt.sign(payloadObj, PRIV_KEY, { algorithm: "RS256" });

const verifyJWT = jwt.verify(signedJWT, PUB_KEY, { algorithm: "RS256" }, (err, payload) => {
  console.log(payload);
});
