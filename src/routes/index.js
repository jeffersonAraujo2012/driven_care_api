import express from "express";
import patientRoutes from "./patient.routes.js";
import doctorRoutes from "./doctor.routes.js";
import authRoutes from "./auth.routes.js";
const routes = express.Router();

routes.use("/patients", patientRoutes);
routes.use("/doctors", doctorRoutes);
routes.use("/", authRoutes);

export default routes;
