import express from "express";
import doctorControllers from "../controllers/doctor.controllers.js";
import validate from "../middlewares/validate.middleware.js";
import doctorSchema from "../schemas/doctor.schema.js";

const doctorRoutes = express.Router();

doctorRoutes.post("/", validate(doctorSchema), doctorControllers.create);
doctorRoutes.get("/findByName", doctorControllers.findByName);
doctorRoutes.get("/findBySpecilty", doctorControllers.findBySpecilty);
doctorRoutes.get("/address", doctorControllers.findByAddress);
doctorRoutes.get("/schedules", doctorControllers.getSchedules);

export default doctorRoutes;
