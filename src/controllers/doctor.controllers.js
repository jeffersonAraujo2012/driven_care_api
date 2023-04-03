import doctorServices from "../services/doctor.services.js";

export async function create(req, res) {
  const { name, age, email, password, cpf } = req.body;

  try {
    await doctorServices.create({ name, age, email, password, cpf });
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.name + ": " + err.message);
  }
}

export async function findByName(req, res) {
  const { name } = req.body;

  try {
    const doctors = await doctorServices.findByName(name);
    return res.status(200).send(doctors);
  } catch (err) {
    return res.status(500).send("Something went wrong: " + err.message);
  }
}

export async function findBySpecilty(req, res) {
  const { idSpecilty } = req.body;

  try {
    const doctors = await doctorServices.findBySpecilty(idSpecilty);
    return res.status(200).send(doctors);
  } catch (err) {
    return res.status(500).send("Something went wrong: " + err.message);
  }
}

export async function findByAddress(req, res) {
  const { stateId } = req.body;

  try {
    const doctors = await doctorServices.findByAddress(stateId);
    return res.status(200).send(doctors);
  } catch (err) {
    return res.status(500).send("Something went wrong: " + err.message);
  }
}

export async function getSchedules(req, res) {
  const { doctorId } = req.body;

  try {
    const schedules = await doctorServices.getSchedules(doctorId);
    return res.status(200).send(schedules);
  } catch (err) {
    return res.status(500).send(err.name + ": " + err.message);
  }
}

export default {
  create,
  findByName,
  findBySpecilty,
  findByAddress,
  getSchedules,
};
