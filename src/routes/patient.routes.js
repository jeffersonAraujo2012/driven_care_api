import express from "express";
import patientControllers from "../controllers/patient.controllers.js";
import validate from "../middlewares/validate.middleware.js";
import patientSchema from "../schemas/patient.schema.js";

const patientRoutes = express.Router();

patientRoutes.post("/", validate(patientSchema), patientControllers.create);

export default patientRoutes;
