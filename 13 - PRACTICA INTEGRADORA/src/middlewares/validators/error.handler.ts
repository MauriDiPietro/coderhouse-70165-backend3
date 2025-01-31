import { Request, Response } from "express";
import { httpResponse } from "../../utils/http.response";
import {
  NotFoundError,
  UnhauthorizedError,
  ValidationError,
} from "../../utils/error.custom";

const errorHandler = (error: Error | NotFoundError | UnhauthorizedError | ValidationError, req: Request, res: Response): Response => {
  if (error instanceof NotFoundError)
    return httpResponse.NotFound(res, error.message);
  if (error instanceof UnhauthorizedError)
    return httpResponse.Unauthorized(res, error.message);
  if (error instanceof ValidationError)
    return httpResponse.NotFound(res, error.message);
  return httpResponse.ServerError(res, error, req.url);
};

export default errorHandler
