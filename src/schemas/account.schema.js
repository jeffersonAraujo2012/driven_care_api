import Joi from "joi";

const accountSchema = Joi.object({
  cpf: Joi.string().min(10).max(11).required(),
  password: Joi.string().required(),
  type: Joi.string().valid("patient", "doctor").required(),
});

export default accountSchema;
