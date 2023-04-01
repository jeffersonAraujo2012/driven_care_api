import Joi from "joi";

const patientSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().min(0).max(120).required(),
  cpf: Joi.string().min(10).max(11).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default patientSchema;
