import express from "express";
import patientControllers from "../controllers/patient.controllers.js";

const patientRoutes = express.Router();

patientRoutes.post("/", patientControllers.create);

export default patientRoutes;
