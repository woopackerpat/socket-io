import { NextFunction, Request, Response } from "express";
import createError from "../utils/createError";
import prisma from "../config/prisma";
import jwt from "jsonwebtoken";

const authenticate = async (req: any, res: any, next: NextFunction) => {
  try {
    const authorization = req.cookies?.access_token;

    if (!authorization || !authorization.startsWith("Bearer")) {
      return createError("You are unauthorized", 401);
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return createError("You are unauthorized", 401);
    }

    const jwtPayload = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);

    const payload = JSON.parse(JSON.stringify(jwtPayload));

    if (
      typeof payload !== "object" ||
      !payload?.id ||
      typeof payload.id !== "string"
    ) {
      return createError("Payload is invalid", 404);
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) {
      return createError("You are unauthorized", 401);
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;
