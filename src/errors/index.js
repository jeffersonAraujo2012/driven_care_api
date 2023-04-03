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

function invalidTokenError() {
  return {
    name: "InvalidTokenError",
    message: "Invalid token",
  };
}

function noTokenError() {
  return {
    name: "NoToken",
    message: "You must be logged",
  };
}

export default {
  conflictError,
  unauthorizedError,
  noTokenError,
  invalidTokenError,
};
