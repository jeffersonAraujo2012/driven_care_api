import bcrypt from "bcrypt";

import doctorRepositories from "../repositories/doctor.repositories.js";
import utilsServices, { generateBasicSchedule } from "./utils.services.js";

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

export async function findByName(name) {
  const { rows } = await doctorRepositories.findByName(name);
  return rows;
}

export async function findBySpecilty(idSpecilty) {
  const { rows } = await doctorRepositories.findBySpecilty(idSpecilty);
  return rows;
}

export async function findByAddress(addressId) {
  const { rows } = await doctorRepositories.findByAddress(addressId);
  return rows;
}

export async function getSchedules(doctorId) {
  const basicSchedules = utilsServices.generateBasicSchedule();
  let { rows: busySchedules } = await doctorRepositories.getSchedules(doctorId);

  //This doctor exists?
  const {rowCount: existsDoctor} = await doctorRepositories.findById(doctorId);
  if (!existsDoctor) throw Error("Doctor not found");

  //It converts all busy schedules into a json
  busySchedules = busySchedules.map((s) => {
    const date = new Date(s.date).toLocaleDateString();
    return JSON.stringify({ date, start: s.starts_at });
  });

  //It removes from basicSchedules the busy schedules and generates the freeSchedules
  const freeSchedules = basicSchedules.filter((s) => {
    //Generates a json with the same format as busy schedules
    const schedule = JSON.stringify({
      date: s.date,
      start: s.start,
    });

    //Is this schedules in busySchedules[]?
    const isBusySchedules = busySchedules.includes(schedule);

    //If the schedule is busy then it wilt be removed from the freeSchedule else it will be added
    return isBusySchedules ? false : true;
  });

  return freeSchedules;
}

export default {
  create,
  findByName,
  findBySpecilty,
  findByAddress,
  getSchedules,
};
