import express from "express";
import doctorControllers from "../controllers/doctor.controllers.js";

const doctorRoutes = express.Router();

doctorRoutes.post("/", doctorControllers.create);
doctorRoutes.get("/findByName", doctorControllers.findByName);

export default doctorRoutes;
