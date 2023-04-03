import jwt from "jsonwebtoken";
import errors from "../errors/index.js";
import dotenv from "dotenv";
dotenv.config();

export default async function authMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    if (!token) return res.status(401).send(errors.noTokenError());
    jwt.verify(token, process.env.SECRET_JWT, (err, payload) => {
      if (err) return res.status(401).send(errors.invalidTokenError());
      res.locals.user = payload;
      next();
    });
  } catch (err) {
    return res.sendStatus(500);
  }
}
