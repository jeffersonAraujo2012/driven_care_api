import Joi from "joi";

const accountSchema = Joi.object({
  email: Joi.email().required(),
  password: Joi.string().required(),
  type: Joi.string().allow("patient", "doctor").required(),
});
