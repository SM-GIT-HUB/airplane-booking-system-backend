const { StatusCodes } = require('http-status-codes')

const { ErrorResponse } = require('../utils/common')
const AppError = require('../utils/errors/app-error')

function validateCreateRequest(req, res, next)
{
    if (!req.body)
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while creating city";
        errorResponse.error = new AppError(["request body not found in the request"], StatusCodes.BAD_REQUEST);

        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if (!req.body.name)
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while creating city";
        errorResponse.error = new AppError(["name not found in the request"], StatusCodes.BAD_REQUEST);
        
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    next();
}


module.exports = {
    validateCreateRequest
}