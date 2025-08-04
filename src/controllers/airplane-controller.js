
const { AirplaneService } = require('../services')
const { StatusCodes } = require('http-status-codes')

const { SuccessResponse, ErrorResponse } = require('../utils/common');

/*
 POST: /airplanes
 req-body { modelNumber: "some-model-name", capacity: some-integer (200) }
*/
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

/*
 GET: /airplanes
 req-body {}
*/
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

/*
 GET: /airplanes/:id
 req-body {}
*/
async function getAirplane(req, res)
{
    try {
        const airplanes = await AirplaneService.getAirplane(req.params.id);

        SuccessResponse.message = "Successfully fetched the data of airplane";
        SuccessResponse.data = airplanes;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(err) {
        ErrorResponse.error = err;
        return res.status(err.statusCode).json(ErrorResponse);
    }
}

/*
 DELETE: /airplanes/:id
 req-body {}
*/
async function deleteAirplane(req, res)
{
    try {
        const response = await AirplaneService.deleteAirplane(req.params.id);
        
        SuccessResponse.message = "Successfully deleted the airplane";
        SuccessResponse.data = response;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(err) {
        ErrorResponse.error = err;
        return res.status(err.statusCode).json(ErrorResponse);
    }
}


module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane
}