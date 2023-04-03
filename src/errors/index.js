function conflictError(message) {
  return {
    name: "ConflictError",
    message,
  };
}

function unauthorizedError() {
  return {
    name: "UnauthorizedError",
    message: "Cpf or password is incorrect",
  };
}

export default {
  conflictError,
  unauthorizedError,
};
