import express from "express";
import appointmentControllers from "../controllers/appointment.controllers.js";

const appointmentRoutes = express.Router();
appointmentRoutes.get("/patients", appointmentControllers.findByPatient);
appointmentRoutes.post("/", appointmentControllers.create);

export default appointmentRoutes;