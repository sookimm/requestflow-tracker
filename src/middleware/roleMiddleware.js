const checkManagerRole = (req, res, next) => {
  const userRole = req.headers["role"];

  if (userRole !== "MANAGER") {
    return res.status(403).json({
      message: "Access denied. Manager role required.",
    });
  }

  next();
};

module.exports = {
  checkManagerRole,
};
