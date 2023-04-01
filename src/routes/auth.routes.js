import express from "express";
import authControllers from "../controllers/auth.controllers.js";

const authRoutes = express.Router();
authRoutes.post("/signin", authControllers.signin);

export default authRoutes;
