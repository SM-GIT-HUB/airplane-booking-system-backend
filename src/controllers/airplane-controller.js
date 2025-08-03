
const { AirplaneService } = require('../services')
const { StatusCodes } = require('http-status-codes')

const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function createAirplane(req, res)
{
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
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

module.exports = {
    createAirplane
}