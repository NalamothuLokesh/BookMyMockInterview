export const validateRegister = (data) => {
  const errors = {};
  const validRoles = ["interviewee", "user", "interviewer", "admin"];

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Valid email is required";
  }

  if (!data.password || data.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  // Validate role if provided
  if (data.role && !validRoles.includes(data.role)) {
    errors.role = `Role must be one of: ${validRoles.join(", ")}`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};


// LOGIN VALIDATION
export const validateLogin = (data) => {
  const errors = {};

  if (!data.email) {
    errors.email = "Email required";
  }

  if (!data.password) {
    errors.password = "Password required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};