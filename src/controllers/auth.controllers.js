import httpStatus from "http-status";
import authServices from "../services/auth.services.js";

export async function signin(req, res) {
  const { email, password, type } = req.body;

  try {
    const token = await authServices.signin({ email, password, type });
    return res.status(httpStatus.OK).send({ token });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
}

export default {
  signin,
};
