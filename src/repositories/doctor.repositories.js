import db from "../config/database.js";

export async function findDoctorByEmail(email) {
  const result = await db.query(`SELECT * FROM doctors WHERE email = $1`, [
    email,
  ]);
  return result;
}

export async function findById(id) {
  const result = await db.query(`SELECT * FROM doctors WHERE id = $1`, [id]);
  return result;
}

export async function findByName(name) {
  const result = await db.query(
    `
    SELECT * FROM doctors
    WHERE LOWER(name)
    LIKE '%' || LOWER($1) || '%'
  `,
    [name]
  );
  return result;
}

export async function findBySpecilty(idSpecilty) {
  const result = await db.query(
    `
    SELECT d.* FROM doctors d
    WHERE d.id IN (
      SELECT d_s.doctor_id FROM doctors_specilties d_s
      WHERE d_s.specilty = $1
    )
  `,
    [idSpecilty]
  );
  return result;
}

export async function findByAddress(addressId) {
  const result = await db.query(
    `
    SELECT d.* FROM doctors d
    WHERE d.id IN (
      SELECT d_a.doctor_id FROM doctor_address d_a
      WHERE d_a.state_id = $1
    )
  `,
    [addressId]
  );
  return result;
}

export async function create(doctor) {
  const { name, age, email, hashPassword: password, cpf } = doctor;

  await db.query(
    `INSERT INTO doctors (name, age, email, password, cpf)
     VALUES ($1, $2, $3, $4, $5)`,
    [name, age, email, password, cpf]
  );
}

export async function getSchedules(doctorId) {
  const result = await db.query(
    `SELECT * FROM appointments
     WHERE doctor_id = $1 AND
     date BETWEEN (CURRENT_DATE - INTERVAL '1 day') AND (CURRENT_DATE + INTERVAL '29 days')
    `,
    [doctorId]
  );
  return result;
}

export default {
  create,
  findDoctorByEmail,
  findById,
  findByName,
  findBySpecilty,
  findByAddress,
  getSchedules,
};
