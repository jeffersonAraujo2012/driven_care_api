import express from "express";
import doctorControllers from "../controllers/doctor.controllers.js";
import validate from "../middlewares/validate.middleware.js";
import doctorSchema from "../schemas/doctor.schema.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const doctorRoutes = express.Router();

doctorRoutes.post("/", validate(doctorSchema), doctorControllers.create);
doctorRoutes.get(
  "/name/:name",
  authMiddleware,
  doctorControllers.findByName
);
doctorRoutes.get(
  "/specilty/:speciltyId",
  authMiddleware,
  doctorControllers.findBySpecilty
);
doctorRoutes.get(
  "/address/:stateId",
  authMiddleware,
  doctorControllers.findByAddress
);
doctorRoutes.get("/schedules", doctorControllers.getSchedules);

export default doctorRoutes;
