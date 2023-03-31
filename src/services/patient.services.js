import bcrypt from "bcrypt";

import patientRepositories from "../repositories/patient.repositories.js";

export async function create(patient) {
  const { name, age, email, password, cpf } = patient;

  //Users already exists?
  const { rowCount } = await patientRepositories.findPatientByEmail(email);
  if (rowCount) throw new Error("Patient already exists");

  //Encrypt password
  const hashPassword = await bcrypt.hash(password, 10);

  //Request patient creation
  await patientRepositories.create({ name, age, email, hashPassword, cpf });
}

export default {
  create,
};
