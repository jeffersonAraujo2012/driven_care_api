import appointmentServices from "../services/appointment.services.js";

export async function findByPatient(req, res) {
  const { patientId } = req.body;

  try {
    const appointments = await appointmentServices.findByPatient(patientId);
    return res.status(200).send(appointments);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function create(req, res) {
  const newAppointment = req.body;

  try {
    await appointmentServices.create(newAppointment);
    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export default {
  findByPatient,
  create,
};
