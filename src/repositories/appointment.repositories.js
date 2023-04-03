import db from "../config/database.js";

export async function findByPatient(patientId) {
  const result = await db.query(
    `
    SELECT a.*, doctors.name AS "doctorName", array_agg(specilties.name) AS specilty FROM appointments a
    LEFT JOIN doctors
    ON doctors.id = a.doctor_id
    LEFT JOIN specilties
    ON specilties.id IN (
      SELECT specilty_id FROM doctors_specilties
      WHERE doctor_id = a.doctor_id
    )
    WHERE patient_id = $1
    GROUP BY a.id, doctors.name
  `,
    [patientId]
  );

  return result;
}

export async function findByDoctor(doctorId) {
  const result = await db.query(
    `
    SELECT a.*, patients.name AS "patientsName", specilties.name AS specilty FROM appointments a
    LEFT JOIN patients
    ON patients.id = a.patient_id
    LEFT JOIN specilties
    ON specilties.id = a.specilty_id
    WHERE a.doctor_id = $1
  `,
    [doctorId]
  );

  return result;
}

export async function create(newAppointment) {
  const { date, start, doctorId, patientId, speciltyId } = newAppointment;

  //date DD:MM:YYYY --> YYYY-MM-DD
  let formatedDate = date.split("/");
  const aux = formatedDate[0];
  formatedDate[0] = formatedDate[2];
  formatedDate[2] = aux;

  formatedDate = formatedDate.join("-");

  const result = await db.query(
    `
    INSERT INTO appointments (date, starts_at, doctor_id, patient_id, specilty_id)
    VALUES ($1, $2, $3, $4, $5)
  `,
    [formatedDate, start, doctorId, patientId, speciltyId]
  );
}

export default {
  findByPatient,
  findByDoctor,
  create,
};
