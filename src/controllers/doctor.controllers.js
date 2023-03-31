import doctorServices from "../services/doctor.services.js";

export async function create(req, res) {
  const { name, age, email, password, cpf } = req.body;

  try {
    await doctorServices.create({ name, age, email, password, cpf });
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send("Something went wrong: " + err.message);
  }
}

export default {
  create,
};
