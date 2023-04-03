import express from "express";
import appointmentControllers from "../controllers/appointment.controllers.js";

const appointmentRoutes = express.Router();
appointmentRoutes.get("/patients", appointmentControllers.findByPatient);
appointmentRoutes.get("/doctors", appointmentControllers.findByDoctor);
appointmentRoutes.post("/", appointmentControllers.create);
appointmentRoutes.patch("/:appointmentId/status", appointmentControllers.updateStatus);

export default appointmentRoutes;
