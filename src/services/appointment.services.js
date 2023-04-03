import appointmentRepositories from "../repositories/appointment.repositories.js";
import patientRepositories from "../repositories/patient.repositories.js";
import doctorRepositories from "../repositories/doctor.repositories.js";
import doctorServices from "../services/doctor.services.js";

export async function findByPatient(patientId) {
  const { rowCount: existsPatient } = await patientRepositories.findById(
    patientId
  );
  if (!existsPatient) throw Error("Patient not found");

  const { rows: appointments } = await appointmentRepositories.findByPatient(
    patientId
  );
  return appointments;
}

export async function create(newAppointment) {
  const { date, start, doctorId, patientId } = newAppointment;

  //Exists doctor and patient?
  const { rowCount: existsDoctor } = await doctorRepositories.findById(
    doctorId
  );
  const { rowCount: existsPatient } = await patientRepositories.findById(
    patientId
  );
  if (!existsDoctor || !existsPatient)
    throw Error("Doctor or patient not found");

  //Is the schedule chosen free?
  const freeSchedules = await doctorServices.getSchedules(doctorId);
  const isFree = freeSchedules.filter((s) => {
    if (s.date === date && s.start === start) {
      return true;
    }
    return false;
  }).length;
  if (!isFree) throw Error("The chosen schedule is busy");

  await appointmentRepositories.create(newAppointment);
}

export default {
  findByPatient,
  create,
};
