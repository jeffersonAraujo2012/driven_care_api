import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import patientRepositories from "../repositories/patient.repositories.js";
import doctorRepositories from "../repositories/doctor.repositories.js";

export async function signin(user) {
  const { email, password, type } = user;

  let foundUser;
  if (type === "patient") {
    foundUser = await patientRepositories.findPatientByEmail(email);
  }
  if (type === "doctor") {
    foundUser = await doctorRepositories.findDoctorByEmail(email);
  }

  const {
    rowCount,
    rows: [account],
  } = foundUser;

  //User exists?
  if (!rowCount) throw Error("User not Found");

  //Password is correct?
  const isCorrect = await bcrypt.compare(password, account.password);
  if (!isCorrect) throw Error("UNAUTHORIZADED");

  //Generate the token
  const token = jwt.sign({ id: account.id, type }, process.env.SECRET_JWT);
  return token;
}

export default {
  signin,
};
