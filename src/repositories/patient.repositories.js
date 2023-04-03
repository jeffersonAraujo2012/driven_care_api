import db from "../config/database.js";

export async function findPatientByEmail(email) {
  const findResult = await db.query(`SELECT * FROM patients WHERE email = $1`, [
    email,
  ]);
  return findResult;
}

export async function findById(id) {
  const result = await db.query(`SELECT * FROM patients WHERE id = $1`, [
    id,
  ]);
  return result;
}

export async function findByCpf(cpf) {
  const result = await db.query(`SELECT * FROM patients WHERE cpf = $1`, [
    cpf,
  ]);
  return result;
}

export async function create(patient) {
  const { name, age, email, hashPassword: password, cpf } = patient;

  await db.query(
    `INSERT INTO patients (name, age, email, password, cpf)
     VALUES ($1, $2, $3, $4, $5)`,
    [name, age, email, password, cpf]
  );
}

export default {
  create,
  findPatientByEmail,
  findById,
  findByCpf
};
