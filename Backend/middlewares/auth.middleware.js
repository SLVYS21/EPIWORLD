const User = require("../models/user.model")
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
  
      if (!token)
        return res.status(401).json({ message: "No token, authorization denied"});
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      let user = await User.findById(decoded.id);
  
      if (!user)
          return res.status(404).json({ message: "User not found"});

      if (!user.admin && (user.status === "Bloqued" || user.status === "Waiting"))
        return res.redirect("http://localhost:8081/auth");

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };
  
  module.exports = authMiddleware;