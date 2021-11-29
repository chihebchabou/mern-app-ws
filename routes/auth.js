const { application } = require("express");
const express = require("express");
const router = express.Router();

/**
 * @route GET api/auth
 * @description Get logged in user
 * @access Private
 */
router.get("/", (req, res) => {
  res.send("Logged in user");
});

module.exports = router;
