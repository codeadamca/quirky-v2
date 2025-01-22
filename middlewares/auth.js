const PASSWORD = process.env.QUIRKY_PASSWORD;

const auth = (req, res, next) => {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  res.redirect("/login");
};

module.exports = { auth, PASSWORD };