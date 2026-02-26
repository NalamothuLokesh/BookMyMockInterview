export const authorize = (roles) => {
  return (req, res, next) => {
    // check user exists (set by protect middleware)
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // check role exists
    if (!req.user.role) {
      return res.status(403).json({ message: "User role not found" });
    }

    // check if user's role is in allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: "Access denied",
        userRole: req.user.role,
        requiredRoles: roles 
      });
    }

    next();
  };
};