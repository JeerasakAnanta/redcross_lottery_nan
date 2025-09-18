require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const sequelize = require("./configs/db");

const os = require("os");

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all origins by default
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Route imports
const lotteriesRoute = require("./routes/lotteries_route");
// const authenRoute = require("./routes/authen_route");
const rewardRoute = require("./routes/reward_route");
const apiRoute = require("./routes/api_route");

// Route setup
app.use("/", [lotteriesRoute, rewardRoute, apiRoute]);

app.get("/", (req, res) => {
  res.json({ message: `Hello from the server running on ${os.hostname()}` });
});

// Database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to PostgreSQL database.");

    // Start the server after successful database connection
    startServer();
  })
  .catch((err) => {
    console.error("Unable to connect to the database: ", err);
    process.exit(1); // Exit the process if the database connection fails
  });

// SSL options for HTTPS
const options = {
  key: process.env.SSL_KEY_PATH
    ? fs.readFileSync(process.env.SSL_KEY_PATH)
    : undefined,
  cert: process.env.SSL_CERT_PATH
    ? fs.readFileSync(process.env.SSL_CERT_PATH)
    : undefined,
};

// Function to start the server
const startServer = () => {
  const port = process.env.PORT || 3001;
  const server =
    process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH
      ? https.createServer(options, app)
      : app;

  server.listen(port, () => {
    console.log(
      `Server is running on ${
        process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH ? "HTTPS" : "HTTP"
      }://${process.env.NODE_HOST || "localhost"}:${port}`
    );
  });
};
