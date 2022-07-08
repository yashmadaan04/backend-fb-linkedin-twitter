
import ErrorResponse from "../utils/errorResponse";

const errorHandler = (err: any, req: any, res: any, next: any) => {
  let error = { ...err };
  error.message = err.message;

  if (err.code === 11000) {
    const message = `Duplicate Field value entered`;
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val: any) => val.message);
    error = new ErrorResponse(message, 400);
  }

  if (error.statusCode == 500) {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      status: "Failed",
      error: "Internal Server Error",
      message: err.message
    });
  } else {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      status: "Failed",
      error: err.message,
      message: error.message
    });
  }
};

export default errorHandler