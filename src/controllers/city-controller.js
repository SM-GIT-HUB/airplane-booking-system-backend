const { CityService } = require('../services')
const { StatusCodes } = require('http-status-codes')

const { SuccessResponse, ErrorResponse } = require('../utils/common')

const cityService = new CityService();

/*
 POST: /cities
 req-body { name: "some-city-name" }
*/
async function createCity(req, res)
{
    try {
        const city = await cityService.create({
            name: req.body.name
        })

        const successResponse = new SuccessResponse();
        
        successResponse.message = "Successfully created a city";
        successResponse.data = city;

        return res.status(StatusCodes.CREATED).json(successResponse);
    }
    catch(err) {
        const errorResponse = new ErrorResponse();
        errorResponse.error = err;
        return res.status(err.statusCode).json(errorResponse);
    }
}

/*
 PATCH: /cities/:id
 req-body { name: "some-city-name" }
*/
async function updateCity(req, res)
{
    try {
        const city = await cityService.update(req.params.id, {
            name: req.body.name
        })
        
        const successResponse = new SuccessResponse();

        successResponse.message = "Successfully updated the data of city";
        successResponse.data = city;
        
        return res.status(StatusCodes.OK).json(successResponse);
    }
    catch(err) {
        const errorResponse = new ErrorResponse();
        errorResponse.error = err;
        return res.status(err.statusCode).json(errorResponse);
    }
}

/*
 DELETE: /cities/:id
 req-body {}
*/
async function deleteCity(req, res)
{
    try {
        const response = await cityService.delete(req.params.id);

        const successResponse = new SuccessResponse();
        
        successResponse.message = "Successfully deleted the city";
        successResponse.data = response;

        return res.status(StatusCodes.CREATED).json(successResponse);
    }
    catch(err) {
        const errorResponse = new ErrorResponse();
        errorResponse.error = err;
        return res.status(err.statusCode).json(errorResponse);
    }
}


module.exports = {
    createCity,
    updateCity,
    deleteCity
}