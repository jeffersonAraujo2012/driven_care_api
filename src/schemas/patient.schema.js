import Joi from "joi";

const patientSchema = Joi.object({
  name: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  cpf: Joi.string().min(10).max(11).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default patientSchema;
