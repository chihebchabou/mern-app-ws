const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

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
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Make sure user does not exist
      let user = await User.findOne({ email });
      console.log(user);
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      user = new User({ name, email, password });
      // Hashage of password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Create a token
      const payload = {
        user: {
          id: user.id,
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

module.exports = router;
