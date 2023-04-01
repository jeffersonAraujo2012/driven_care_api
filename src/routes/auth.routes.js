import express from "express";
import authControllers from "../controllers/auth.controllers.js";
import validate from "../middlewares/validate.middleware.js";
import accountSchema from "../schemas/account.schema.js";

const authRoutes = express.Router();
authRoutes.post("/signin", validate(accountSchema), authControllers.signin);

export default authRoutes;
