import httpStatus from "http-status";
import Joi from "joi";

const s = Joi.object({
  a: Joi.string(),
});

export default function validate(schema) {
  return (req, res, next) => {
    const data = req.body;
    const result = schema.validate(data, { abortEarly: false });

    if (result.error) {
      const errorMessages = result.error.details.map((error) => error.message);
      return res.status(httpStatus.BAD_REQUEST).send(errorMessages);
    }

    next();
  };
}
