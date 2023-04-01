import Joi from "joi";

const doctorSchema = Joi.object({
  name: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  cpf: Joi.string().min(10).max(11).required(),
  email: Joi.email().required(),
  password: Joi.string().min(6).required(),
});

export default doctorSchema;