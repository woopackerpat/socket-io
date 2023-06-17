import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    err.statusCode = 400;
    err.message = err.errors[0].message;
  }

  if (err.name === "TokenExpiredError") {
    err.statusCode = 401;
    return res.redirect("https://localhost:3000/auth/login");
  }

  if (err.name === "TokenWebTokenError") {
    err.statusCode = 401;
  }

  res.status(err.statusCode || 500).json({ message: err.message });
};

export default errorHandler;
