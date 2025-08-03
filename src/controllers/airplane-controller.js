
const { AirplaneService } = require('../services')
const { StatusCodes } = require('http-status-codes')

const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function createAirplane(req, res)
{
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity,
            id: req.body.id
        })

        SuccessResponse.message = "Successfully created an airplane";
        SuccessResponse.data = airplane;

        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
    catch(err) {
        ErrorResponse.error = err;
        return res.status(err.statusCode).json(ErrorResponse);
    }
}

async function getAirplanes(req, res)
{
    try {
        const airplanes = await AirplaneService.getAirplanes();

        SuccessResponse.message = "Successfully fetched the data of all airplanes";
        SuccessResponse.data = airplanes;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(err) {
        ErrorResponse.error = err;
        return res.status(err.statusCode).json(ErrorResponse);
    }
}


module.exports = {
    createAirplane,
    getAirplanes
}