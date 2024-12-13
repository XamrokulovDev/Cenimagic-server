const ErrorResponse = require('../utils/ErrorResponse');

const errorHandle = (err, req, res, next) => {
    let error = { ...err };  
    error.message = err.message;  
    console.log(err.stack.red);
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server error"
    });
}

module.exports = errorHandle;