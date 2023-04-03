import jwt from "jsonwebtoken";
import errors from "../errors";

export default async function authMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    if (!token) throw errors.noTokenError();
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) throw errors.unauthorizedError("Invalid or expired token");
      res.locals.user = payload;
    });
    next();
  } catch (err) {
    next(err);
  }
}
