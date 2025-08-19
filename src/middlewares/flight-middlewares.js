const { StatusCodes } = require('http-status-codes')

const { ErrorResponse } = require('../utils/common')
const AppError = require('../utils/errors/app-error')

function validateCreateRequest(req, res, next)
{
    if (!req.body)
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while creating flight";
        errorResponse.error = new AppError(["request body not found in the request"], StatusCodes.BAD_REQUEST);

        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if (!req.body.flightNumber)
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while creating flight";
        errorResponse.error = new AppError(["flightNumber not found in the request"], StatusCodes.BAD_REQUEST);
        
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if (!req.body.airplaneId || isNaN(req.body.airplaneId))
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while creating flight";
        errorResponse.error = new AppError(["airplaneId not found or invalid in the request"], StatusCodes.BAD_REQUEST);
        
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if (!req.body.departureAirportId)
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while creating flight";
        errorResponse.error = new AppError(["departureAirportId not found in the request"], StatusCodes.BAD_REQUEST);
        
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if (!req.body.arrivalAirportId)
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while creating flight";
        errorResponse.error = new AppError(["arrivalAirportId not found in the request"], StatusCodes.BAD_REQUEST);
        
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if (!req.body.departureTime)
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while creating flight";
        errorResponse.error = new AppError(["departureTime not found in the request"], StatusCodes.BAD_REQUEST);
        
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if (!req.body.arrivalTime)
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while creating flight";
        errorResponse.error = new AppError(["arrivalTime not found in the request"], StatusCodes.BAD_REQUEST);
        
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if (!req.body.price || isNaN(req.body.price))
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while creating flight";
        errorResponse.error = new AppError(["price not found or invalid in the request"], StatusCodes.BAD_REQUEST);
        
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if (!req.body.totalSeats || isNaN(req.body.totalSeats))
    {
        const errorResponse = new ErrorResponse();
        errorResponse.message = "Something went wrong while creating flight";
        errorResponse.error = new AppError(["totalSeats not found or invalid in the request"], StatusCodes.BAD_REQUEST);
        
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    next();
}

function validateUpdateRequest(req, res, next)
{

}


module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}