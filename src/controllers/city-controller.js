const { CityService } = require('../services')
const { StatusCodes } = require('http-status-codes')

const { SuccessResponse, ErrorResponse } = require('../utils/common')

/*
 POST: /cities
 req-body { name: "some-city-name" }
*/
async function createCity(req, res)
{
    try {
        const city = await CityService.createCity({
            name: req.body.name
        })

        SuccessResponse.message = "Successfully created a city";
        SuccessResponse.data = city;

        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
    catch(err) {
        ErrorResponse.error = err;
        return res.status(err.statusCode).json(ErrorResponse);
    }
}

/*
 DELETE: /cities/:id
 req-body {}
*/
async function deleteCity(req, res)
{
    try {
        const response = await CityService.deleteCity(req.params.id);

        SuccessResponse.message = "Successfully deleted the city";
        SuccessResponse.data = response;

        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
    catch(err) {
        ErrorResponse.error = err;
        return res.status(err.statusCode).json(ErrorResponse);
    }
}


module.exports = {
    createCity,
    deleteCity
}