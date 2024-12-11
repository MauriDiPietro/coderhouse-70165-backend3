export const errorHandler = (error, req, res, next) => {
    let statusCode = error.status || 500;
    // console.log(error.stack);
    res.status(statusCode).send({
        statusCode,
        error: error.name,
        message: error.message
    })
}