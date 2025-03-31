const errorHandler = (err, req, res, next) =>
{
    console.error(err.stack);

    let statusCode = 500;
    let message = "Internal Server Error";

    if (err.name === "ValidationError") {
      statusCode = 400;
      message = Object.values(err.errors).map(val => val.message).join(', ');  
    } else if (err.name === "CastError") {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    } else if (typeof err === "string") {
      message = err;
    } else if (err.statusCode && err.message){
        statusCode = err.statusCode;
        message = err.message;
    }
    res.status(statusCode).json({ message });
};

module.exports = errorHandler;