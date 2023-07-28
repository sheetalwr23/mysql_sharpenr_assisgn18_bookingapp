const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const User = require("./models/User");
const sequelize = require("./util/database");
const app = express();

// Importing routes
const userRoutes = require("./routes/userRoutes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  express.static(path.join(__dirname, "..", "public", "css", "style.css"))
);

// API routes
app.use("/api/users", userRoutes);

// Serve the HTML file
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
});

// Sync the model with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
