const path = require("path");

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// Create a new user
router.post("/", UserController.createUser);

// Get all users
router.get("/", UserController.getAllUsers);

// Delete a user
router.delete("/:id", UserController.deleteUser);

module.exports = router;
