require("dotenv").config();

module.exports = require("knex")({
  client: "pg",
  connection: process.env.DB_LINK,
  searchPath: ["knex", "public"],
});
