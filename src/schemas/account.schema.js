import Joi from "joi";

const accountSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  type: Joi.string().valid("patient", "doctor").required(),
});

export default accountSchema;
