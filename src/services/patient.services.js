import bcrypt from "bcrypt";

import patientRepositories from "../repositories/patient.repositories.js";
import errors from "../errors/index.js";

export async function create(patient) {
  const { name, age, email, password, cpf } = patient;

  //Users already exists?
  const { rowCount: existsCpf} = await patientRepositories.findByCpf(cpf);
  if (existsCpf) throw errors.conflictError("Patient already exists");

  //Encrypt password
  const hashPassword = await bcrypt.hash(password, 10);

  //Request patient creation
  await patientRepositories.create({ name, age, email, hashPassword, cpf });
}

export default {
  create,
};
