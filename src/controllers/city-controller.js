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


module.exports = {
    createCity
}