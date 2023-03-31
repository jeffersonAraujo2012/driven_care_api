import express from "express";
import patientRoutes from "./patient.routes.js";
const routes = express.Router();

routes.use("/patients", patientRoutes);

export default routes;