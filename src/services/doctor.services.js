import bcrypt from "bcrypt";

import doctorRepositories from "../repositories/doctor.repositories.js";

export async function create(doctor) {
  const { name, age, email, password, cpf } = doctor;

  //Doctor already exists?
  const { rowCount } = await doctorRepositories.findDoctorByEmail(email);
  if (rowCount) throw new Error("doctor already exists");

  //Encrypt password
  const hashPassword = await bcrypt.hash(password, 10);

  //Request doctor creation
  await doctorRepositories.create({ name, age, email, hashPassword, cpf });
}

export default {
  create,
};
