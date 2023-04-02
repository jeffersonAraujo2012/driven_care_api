import db from "../config/database.js";

export async function findByPatient(patientId) {
  const result = await db.query(
    `
    SELECT a.*, doctors.name, specilties.name FROM appointments a
    LEFT JOIN doctors
    ON doctors.id = a.doctor_id
    LEFT JOIN specilties
    ON specilties.id IN (
      SELECT specilty_id FROM doctors_specilties
      WHERE doctor_id = a.doctor_id
    )
    WHERE patient_id = $1
  `,
    [patientId]
  );

  return result;
}

export default {
  findByPatient,
};
