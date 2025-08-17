const { AirportService } = require('../services')
const { StatusCodes } = require('http-status-codes')

const { SuccessResponse, ErrorResponse } = require('../utils/common')

const airportService = new AirportService();

/*
 POST: /airports
 req-body { name: 'some-airport-name', code: 'some-code', address: 'some-address', cityId: some-city-id (10) }
*/
async function createAirport(req, res)
{
    try {
        const airport = await airportService.create({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        })
        
        const successResponse = new SuccessResponse();

        successResponse.message = "Successfully created an airport";
        successResponse.data = airport;
        
        return res.status(StatusCodes.CREATED).json(successResponse);
    }
    catch(err) {
        const errorResponse = new ErrorResponse();
        errorResponse.error = err;
        return res.status(err.statusCode).json(errorResponse);
    }
}

/*
 GET: /airports
 req-body {}
*/
async function getAirports(req, res)
{
    try {
        const airports = await airportService.getAll();
        
        const successResponse = new SuccessResponse();

        successResponse.message = "Successfully fetched the data of all airports";
        successResponse.data = airports;
        
        return res.status(StatusCodes.OK).json(successResponse);
    }
    catch(err) {
        const errorResponse = new ErrorResponse();
        errorResponse.error = err;
        return res.status(err.statusCode).json(errorResponse);
    }
}

/*
 GET: /airports/:id
 req-body {}
*/
async function getAirport(req, res)
{
    try {
        const airports = await airportService.get(req.params.id);
        
        const successResponse = new SuccessResponse();

        successResponse.message = "Successfully fetched the data of airport";
        successResponse.data = airports;
        
        return res.status(StatusCodes.OK).json(successResponse);
    }
    catch(err) {
        const errorResponse = new ErrorResponse();
        errorResponse.error = err;
        return res.status(err.statusCode).json(errorResponse);
    }
}

/*
 PATCH: /airports/:id
 req-body { name: 'some-airport-name', code: 'some-code', address: 'some-address' }
*/
async function updateAirport(req, res)
{
    try {
        const airport = await airportService.get(req.params.id);

        const updatedAirport = await airportService.update(req.params.id, {
            name: req.body.name || airport.name,
            code: req.body.code || airport.code,
            address: req.body.address || airport.address
        })
        
        const successResponse = new SuccessResponse();

        successResponse.message = "Successfully updated the data of airport";
        successResponse.data = updatedAirport;
        
        return res.status(StatusCodes.OK).json(successResponse);
    }
    catch(err) {
        const errorResponse = new ErrorResponse();
        errorResponse.error = err;
        return res.status(err.statusCode).json(errorResponse);
    }
}

/*
 DELETE: /airports/:id
 req-body {}
*/
async function deleteAirport(req, res)
{
    try {
        const response = await airportService.delete(req.params.id);
        
        const successResponse = new SuccessResponse();

        successResponse.message = "Successfully deleted the airport";
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
    createAirport,
    getAirports,
    getAirport,
    updateAirport,
    deleteAirport
}