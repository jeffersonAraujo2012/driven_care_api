import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import patientRepositories from "../repositories/patient.repositories.js";
import doctorRepositories from "../repositories/doctor.repositories.js";
import errors from "../errors/index.js";

export async function signin(user) {
  const { cpf, password, type } = user;

  let foundUser;
  if (type === "patient") {
    foundUser = await patientRepositories.findByCpf(cpf);
  }
  if (type === "doctor") {
    foundUser = await doctorRepositories.findByCpf(cpf);
  }

  const {
    rowCount,
    rows: [account],
  } = foundUser;

  //User exists?
  if (!rowCount) throw errors.unauthorizedError();

  //Password is correct?
  const isCorrect = await bcrypt.compare(password, account.password);
  if (!isCorrect) throw errors.unauthorizedError();

  //Generate the token
  const token = jwt.sign({ id: account.id, type }, process.env.SECRET_JWT);
  return token;
}

export default {
  signin,
};
