import appointmentRepositories from "../repositories/appointment.repositories.js";
import patientRepositories from "../repositories/patient.repositories.js";

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

export default {
  findByPatient,
};
