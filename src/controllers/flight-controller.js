const { FlightService } = require('../services')
const { StatusCodes } = require('http-status-codes')

const { SuccessResponse, ErrorResponse } = require('../utils/common')

const flightService = new FlightService();

/*
 POST: /flights
 req-body { flightNumber: 'some-flight-number', airplaneId: some-airplaneId (10), departureAirportId: 'some-airplane-code', arrivalAirportId: 'some-airplane-code',
 departureTime: 'some-date', arrivalTime: 'some-time', price: some-price (1200), boardingGate: 'some-gate-name', totalSeats: some-seat-capacity (100) }
*/
async function createFlight(req, res)
{
    try {
        const flight = await flightService.create({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            departureTime: req.body.departureTime,
            arrivalTime: req.body.arrivalTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        })
        
        const successResponse = new SuccessResponse();

        successResponse.message = "Successfully created a flight";
        successResponse.data = flight;
        
        return res.status(StatusCodes.CREATED).json(successResponse);
    }
    catch(err) {
        const errorResponse = new ErrorResponse();
        errorResponse.error = err;
        return res.status(err.statusCode).json(errorResponse);
    }
}

/*
 GET: /flights
 req-body {}
*/
async function getFlights(req, res)
{
    try {
        const airports = await flightService.getAll();
        
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
 GET: /flights/:id
 req-body {}
*/
async function getFlight(req, res)
{
    try {
        const airports = await flightService.get(req.params.id);
        
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
 PATCH: /flights/:id
 req-body { name: 'some-airport-name', code: 'some-code', address: 'some-address' }
*/
async function updateFlight(req, res)
{
    try {
        const airport = await flightService.get(req.params.id);

        const updatedAirport = await flightService.update(req.params.id, {
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
 DELETE: /flights/:id
 req-body {}
*/
async function deleteFlight(req, res)
{
    try {
        const response = await flightService.delete(req.params.id);
        
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
    createFlight,
    getFlights,
    getFlight,
    updateFlight,
    deleteFlight
}