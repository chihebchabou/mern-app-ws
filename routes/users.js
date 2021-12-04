const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const User = require("../models/User");

/**
 * @route POST api/users
 * @description Register user
 * @access Public
 */
router.post(
  "/",
  body("name", "Please add name").notEmpty(),
  body("email", "Please include a valid email").isEmail(),
  body("password", "Please enter a password 6 or more characters").isLength({
    min: 6,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const { name, email, password, isAdmin } = req.body;

    try {
      // Make sure user does not exist
      let user = await User.findOne({ email });
      console.log(user);
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      user = new User({ name, email, password, isAdmin });
      // Hashage of password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Create a token
      const payload = {
        user: {
          id: user.id,
          isAdmin: user.isAdmin,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route       PUT api/users/:id
 * @description Update a user
 * @access      Private
 */
router.put("/:id", auth, async (req, res) => {
  // Validate inputs
  const name =
    typeof req.body.name === "string" && req.body.name.length > 0
      ? req.body.name
      : false;
  const email =
    typeof req.body.email === "string" &&
    String(req.body.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      ? req.body.email
      : false;
  const password =
    typeof req.body.password === "string" && req.body.password.length >= 6
      ? req.body.password
      : false;

  console.log(name, email, password);

  if (!name && !email && !password) {
    // If fields are missing or invalid, return bad request with error message
    return res
      .status(400)
      .json({ msg: "Missing field(s) to update or field(s) are in valid" });
  }

  try {
    // Check if the user exists
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    console.log(req.params.id);
    console.log(req.user.id);
    // Make sure that the user updates his own profile
    if (req.params.id !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Create the updated user object
    const updatedUser = {};

    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;
    if (password) updatedUser.password = password;

    // Find and update user
    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedUser },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

/**
 * @route       DELETE api/users/:id
 * @description Delete a user
 * @access      Private
 */
router.delete("/:id", auth, admin, async (req, res) => {
  // Check if the user exists
  let user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  // Make sure that the user deletes his own profile
  if (req.params.id !== req.user.id) {
    return res.status(401).json({ msg: "Not authorized" });
  }

  try {
    await User.deleteOne({ _id: req.params.id });
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
