const { AirplaneService } = require('../services')
const { StatusCodes } = require('http-status-codes')

const { SuccessResponse, ErrorResponse } = require('../utils/common')

/*
 POST: /airplanes
 req-body { modelNumber: "some-model-name", capacity: some-integer (200) }
*/
async function createAirplane(req, res)
{
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        })
        
        const successResponse = new SuccessResponse();

        successResponse.message = "Successfully created an airplane";
        successResponse.data = airplane;
        
        return res.status(StatusCodes.CREATED).json(successResponse);
    }
    catch(err) {
        const errorResponse = new ErrorResponse();
        errorResponse.error = err;
        return res.status(err.statusCode).json(errorResponse);
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
        
        const successResponse = new SuccessResponse();

        successResponse.message = "Successfully fetched the data of all airplanes";
        successResponse.data = airplanes;
        
        return res.status(StatusCodes.OK).json(successResponse);
    }
    catch(err) {
        const errorResponse = new ErrorResponse();
        errorResponse.error = err;
        return res.status(err.statusCode).json(errorResponse);
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
        
        const successResponse = new SuccessResponse();

        successResponse.message = "Successfully fetched the data of airplane";
        successResponse.data = airplanes;
        
        return res.status(StatusCodes.OK).json(successResponse);
    }
    catch(err) {
        const errorResponse = new ErrorResponse();
        errorResponse.error = err;
        return res.status(err.statusCode).json(errorResponse);
    }
}

/*
 PATCH: /airplanes/:id
 req-body { capacity: some-integer (100) }
*/
async function updateAirplane(req, res)
{
    try {
        const airplane = await AirplaneService.updateAirplane(req.params.id, {
            capacity: req.body.capacity
        })
        
        const successResponse = new SuccessResponse();

        successResponse.message = "Successfully updated the data of airplane";
        successResponse.data = airplane;
        
        return res.status(StatusCodes.OK).json(successResponse);
    }
    catch(err) {
        const errorResponse = new ErrorResponse();
        errorResponse.error = err;
        return res.status(err.statusCode).json(errorResponse);
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
        
        const successResponse = new SuccessResponse();

        successResponse.message = "Successfully deleted the airplane";
        successResponse.data = response;
        
        return res.status(StatusCodes.OK).json(successResponse);
    }
    catch(err) {
        const errorResponse = new ErrorResponse();
        errorResponse.error = err;
        return res.status(err.statusCode).json(errorResponse);
    }
}


module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    updateAirplane,
    deleteAirplane
}