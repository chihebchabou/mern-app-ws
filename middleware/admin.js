module.exports = (req, res, next) => {
  // 401 Unauthorised
  // 403 forbiden
  if (!req.user.isAdmin) return res.status(403).json({ msg: "Access denied." });
  next();
};
