const { StatusCodes } = require('http-status-codes')

const { ErrorResponse } = require('../utils/common')
const AppError = require('../utils/errors/app-error')

function validateCreateRequest(req, res, next)
{
    if (!req.body)
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while creating airplane";
        errorResponse.error = new AppError(["request body not found in the request"], StatusCodes.BAD_REQUEST);

        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if (!req.body.modelNumber)
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while creating airplane";
        errorResponse.error = new AppError(["modelNumber not found in the request"], StatusCodes.BAD_REQUEST);
        
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    next();
}

function validateUpdateRequest(req, res, next)
{
    if (!req.body)
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while updating airplane";
        errorResponse.error = new AppError(["request body not found in the request"], StatusCodes.BAD_REQUEST);

        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if (!req.body.capacity || isNaN(req.body.capacity))
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while updating airplane";
        errorResponse.error = new AppError(["missing or invalid capacity in the request"], StatusCodes.BAD_REQUEST);

        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    next();
}


module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}