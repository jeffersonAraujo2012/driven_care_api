import express from "express";
import patientRoutes from "./patient.routes.js";
import doctorRoutes from "./doctor.routes.js";
import authRoutes from "./auth.routes.js";
import appointmentRoutes from "./appointment.routes.js";
const routes = express.Router();

routes.use("/patients", patientRoutes);
routes.use("/doctors", doctorRoutes);
routes.use("/appointments", appointmentRoutes);
routes.use("/", authRoutes);

export default routes;
