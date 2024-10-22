import { StatusCodes } from "http-status-codes";
const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.name.includes("CastError")
    ? StatusCodes.NOT_FOUND
    : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.name.includes("CastError")
    ? "No job found with that id"
    : err.message || "Something went wrong, try again later";

  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
