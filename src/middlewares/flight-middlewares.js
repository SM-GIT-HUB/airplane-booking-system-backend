const { StatusCodes } = require('http-status-codes')

const { ErrorResponse } = require('../utils/common')
const AppError = require('../utils/errors/app-error')

const bodyContains = [
    { key: "flightNumber" }, { key: "airplaneId", number: 1 }, { key: "departureAirportId" },
    { key: "arrivalAirportId" }, { key: "price", number: 1 }, { key: "totalSeats", number: 1 }
]

const bodyContainsDates = ["departureTime", "arrivalTime"];
const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

function validateDates(req, res)
{
    const times = { departureTime: new Date(req.body.departureTime), arrivalTime: new Date(req.body.arrivalTime) };
    
    for (const dstring of bodyContainsDates)
    {
        if (!req.body[dstring] || !dateRegex.test(req.body[dstring]) || isNaN(times[dstring].getTime()))
        {
            const errorResponse = new ErrorResponse(errorStringCreate, new AppError([`${dstring} not found or invalid in the request`], StatusCodes.BAD_REQUEST));
            return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
        }
    }
    
    if (times.departureTime.getTime() >= times.arrivalTime.getTime())
    {
        const errorResponse = new ErrorResponse(errorStringCreate, new AppError(["departureTime must be before arrivalTime"], StatusCodes.BAD_REQUEST));
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
}

function validateContents(req, res)
{
    for (const obj of bodyContains)
    {
        const check1 = !req.body[obj.key];
        const check2 = (obj.number && !check1 && isNaN(req.body[obj.key]));

        if (check1 || check2)
        {
            const errorResponse = new ErrorResponse(errorStringCreate, new AppError([`${obj.key} ${check2? "invalid" : "not found"} in the request`], StatusCodes.BAD_REQUEST));
            return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
        }
    }
}

function validateCreateRequest(req, res, next)
{
    const errorStringCreate = "Something went wrong while creating flight";

    if (!req.body)
    {
        const errorResponse = new ErrorResponse(errorStringCreate, new AppError(["request body not found in the request"], StatusCodes.BAD_REQUEST));
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if (validateContents(req, res) || validateDates(req, res)) {
        return;
    }

    next();
}

function validateUpdateRequest(req, res, next)
{

}

function validateUpdateSeatsRequest(req, res, next)
{
    const errorStringCreate = "Something went wrong while updating flight";

    if (!req.body)
    {
        const errorResponse = new ErrorResponse(errorStringCreate, new AppError(["request body not found in the request"], StatusCodes.BAD_REQUEST));
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if (!req.body.seats || isNaN(req.body.seats))
    {
        const errorResponse = new ErrorResponse(errorStringCreate, new AppError([`seats not found or invalid in the request`], StatusCodes.BAD_REQUEST));
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if (req.body.dec && isNaN(req.body.dec))
    {
        const errorResponse = new ErrorResponse(errorStringCreate, new AppError([`dec is invalid in the request`], StatusCodes.BAD_REQUEST));
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    
    next();
}


module.exports = {
    validateCreateRequest,
    validateUpdateRequest,
    validateUpdateSeatsRequest
}