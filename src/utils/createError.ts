class StatusError extends Error {
  statusCode: number | undefined;
}

const createError = (message: string, statusCode: number) => {
  const error = new StatusError(message);
  error.statusCode = statusCode;
  throw error;
};

export default createError;
