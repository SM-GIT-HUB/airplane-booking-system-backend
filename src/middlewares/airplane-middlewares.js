
const { StatusCodes } = require('http-status-codes')

const { ErrorResponse } = require('../utils/common')
const AppError = require('../utils/errors/app-error')

function validateCreateRequest(req, res, next)
{
    if (!req.body)
    {
        ErrorResponse.message = "Something went wrong while creating airplane";
        ErrorResponse.error = new AppError(["request body not found in the request"], StatusCodes.BAD_REQUEST);

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (!req.body.modelNumber)
    {
        ErrorResponse.message = "Something went wrong while creating airplane";
        ErrorResponse.error = new AppError(["modelNumber not found in the request"], StatusCodes.BAD_REQUEST);
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}

function validateUpdateRequest(req, res, next)
{
    if (!req.body)
    {
        ErrorResponse.message = "Something went wrong while updating airplane";
        ErrorResponse.error = new AppError(["request body not found in the request"], StatusCodes.BAD_REQUEST);

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (!req.body.id)
    {
        ErrorResponse.message = "Something went wrong while updating airplane";
        ErrorResponse.error = new AppError(["id not found in the request"], StatusCodes.BAD_REQUEST);

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (!req.body.capacity)
    {
        ErrorResponse.message = "Something went wrong while updating airplane";
        ErrorResponse.error = new AppError(["capacity not found in the request"], StatusCodes.BAD_REQUEST);

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}