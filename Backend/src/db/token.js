// ============================================================
// token.js - helpers used by login, signup and password reset
// ============================================================

const jwt = require("jsonwebtoken");


// ============================================================
// 1. MAKE JWT TOKEN
// ============================================================

const signinToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env");
  }

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};


// ============================================================
// 2. CREATE TOKEN + COOKIE + RESPONSE
// ============================================================

const createSendToken = (user, statusCode, res) => {

  // Create JWT
  const token = signinToken(user._id);

  // Cookie expiration in days
  const cookieExpiresIn = Number(
    process.env.JWT_COOKIE_EXPIRES_IN || 7
  );

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        cookieExpiresIn *
          24 *
          60 *
          60 *
          1000
    ),

    // JavaScript cannot access this cookie
    httpOnly: true,

    // Local development = lax
    // Production = none because frontend/backend
    // may be on different domains
    sameSite:
      process.env.NODE_ENV === "production"
        ? "none"
        : "lax",

    // HTTPS only in production
    secure:
      process.env.NODE_ENV === "production",
  };


  // Send JWT through cookie
  res.cookie(
    "jwt",
    token,
    cookieOptions
  );


  // Don't send password to frontend
  user.password = undefined;


  // Send response
  res.status(statusCode).json({
    status: "Success",

    // Useful for Postman/API testing
    token,

    user,
  });
};


// ============================================================
// 3. DEFAULT AVATAR URL
// ============================================================

const defaultAvatarUrl = (name) => {
  return (
    "https://ui-avatars.com/api/?name=" +
    encodeURIComponent(name || "User") +
    "&background=0e8b53" +
    "&color=fff" +
    "&size=256" +
    "&bold=true"
  );
};


// ============================================================
// 4. FILTER OBJECT
// ============================================================

const filterObj = (obj, ...allowedFields) => {

  const newObj = {};

  // Make sure obj exists
  if (!obj || typeof obj !== "object") {
    return newObj;
  }

  Object.keys(obj).forEach((field) => {

    if (allowedFields.includes(field)) {
      newObj[field] = obj[field];
    }

  });

  return newObj;
};


// ============================================================
// EXPORT
// ============================================================

module.exports = {
  signinToken,
  createSendToken,
  defaultAvatarUrl,
  filterObj,
};