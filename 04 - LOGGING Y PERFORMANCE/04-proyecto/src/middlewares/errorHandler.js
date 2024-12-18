import { NotFoundError } from "../utils/error.manager.js";
import { httpResponse } from "../utils/http.response.js";
import { logger } from "../utils/logs.js";

export const errorHandler = (error, req, res, next) => {
    logger.error({
        stack: error.stack,
        message: error
    })
    let statusCode = error.status || 500;
    if(error instanceof NotFoundError) return httpResponse.NotFound(res, error.message);
    // console.log(error.stack);
    return res.status(statusCode).send({
        statusCode,
        error: error.name,
        message: error.message
    })
}