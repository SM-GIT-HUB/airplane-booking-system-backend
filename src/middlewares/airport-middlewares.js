const { StatusCodes } = require('http-status-codes')

const { ErrorResponse } = require('../utils/common')
const AppError = require('../utils/errors/app-error')

function validateCreateRequest(req, res, next)
{
    if (!req.body)
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while creating airport";
        errorResponse.error = new AppError(["request body not found in the request"], StatusCodes.BAD_REQUEST);

        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if (!req.body.name)
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while creating airport";
        errorResponse.error = new AppError(["name not found in the request"], StatusCodes.BAD_REQUEST);
        
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if (!req.body.code)
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while creating airport";
        errorResponse.error = new AppError(["code not found in the request"], StatusCodes.BAD_REQUEST);
        
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if (!req.body.cityId)
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while creating airport";
        errorResponse.error = new AppError(["cityId not found in the request"], StatusCodes.BAD_REQUEST);
        
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    next();
}

function validateUpdateRequest(req, res, next)
{
    if (!req.body)
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while updating airport";
        errorResponse.error = new AppError(["request body not found in the request"], StatusCodes.BAD_REQUEST);

        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if (!req.body.name && !req.body.code && !req.body.cityId)
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while updating airport";
        errorResponse.error = new AppError(["doesn't have any parameters to update in the request"], StatusCodes.BAD_REQUEST);

        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if (req.body.cityId && isNaN(req.body.cityId))
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while updating airport";
        errorResponse.error = new AppError(["invalid cityId in the request"], StatusCodes.BAD_REQUEST);

        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    next();
}


module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}