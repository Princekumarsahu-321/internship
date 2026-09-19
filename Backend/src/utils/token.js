import jwt from "jsonwebtoken";

const signToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env");
  }

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "90d",
    }
  );
};

export const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieExpiresIn = Number(
    process.env.JWT_COOKIE_EXPIRES_IN || 90
  );

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        cookieExpiresIn * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const defaultAvatarUrl = (name) => {
  return (
    "https://ui-avatars.com/api/?name=" +
    encodeURIComponent(name || "User") +
    "&background=random"
  );
};

export const filterObj = (obj, ...allowedFields) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => allowedFields.includes(key))
  );
};

export default signToken;