const User = require("../models/user");

const UserController = {
  createUser: (req, res) => {
    console.log("creating user");
    const { id, name, email, phone, date, time } = req.body;
    User.create({ id, name, email, phone, date, time })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "An error occurred" });
      });
  },

  getAllUsers: (req, res) => {
    User.findAll()
      .then((users) => {
        res.json(users);
      })
      .catch((error) => {
        console.error("Error retrieving users:", error);
        res.status(500).json({ error: "An error occurred" });
      });
  },

  deleteUser: (req, res) => {
    const { id } = req.params;
    User.findByPk(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        return user.destroy();
      })
      .then(() => {
        res.sendStatus(204);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "An error occurred" });
      });
  },
};

module.exports = UserController;
