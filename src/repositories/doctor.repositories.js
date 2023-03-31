import db from "../config/database.js";

export async function findDoctorByEmail(email) {
  const result = await db.query(`SELECT * FROM doctors WHERE email = $1`, [
    email,
  ]);
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

export async function create(doctor) {
  const { name, age, email, hashPassword: password, cpf } = doctor;

  await db.query(
    `INSERT INTO doctors (name, age, email, password, cpf)
     VALUES ($1, $2, $3, $4, $5)`,
    [name, age, email, password, cpf]
  );
}

export default {
  create,
  findDoctorByEmail,
  findByName,
};
