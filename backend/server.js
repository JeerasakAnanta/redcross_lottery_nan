require("dotenv").config();

const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const sequelize = require("./configs/db.config");
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Route imports
const lotteriesRoute = require("./routes/lotteries_route");
const authenRoute = require("./routes/authen_route");
const rewardRoute = require("./routes/reward_route");

// Route setup
app.use("/", [lotteriesRoute, authenRoute, rewardRoute]);

// Database connection
sequelize
  .authenticate()
  .then(() => console.log("Connected to MySQL database."))
  .catch((err) => console.error("Unable to connect to the database: ", err));

// SSL options
const options = {
  key: process.env.SSL_KEY_PATH
    ? fs.readFileSync(process.env.SSL_KEY_PATH)
    : undefined,
  cert: process.env.SSL_CERT_PATH
    ? fs.readFileSync(process.env.SSL_CERT_PATH)
    : undefined,
};

// Start server
const port = process.env.NODE_PORT || 3000;
const server =
  process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH
    ? https.createServer(options, app)
    : app;

server.listen(port, () => {
  console.log(
    `Server is running on ${
      process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH ? "HTTPS" : "HTTP"
    }://${process.env.NODE_HOST}:${port}`
  );
});
