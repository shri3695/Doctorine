function authOnly(req, res, next) {
  if (!req.auth.admin)
    return res.status(401).send("You must be logged in to access this");

  next();
}

module.exports = authOnly;
