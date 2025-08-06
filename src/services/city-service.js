const { StatusCodes } = require('http-status-codes')

const AppError = require('../utils/errors/app-error')
const { CityRepository } = require("../repositories")

const cityRepository = new CityRepository();

async function createCity(data)
{
    try {
        const city = await cityRepository.create(data);
        return city;
    }
    catch(err) {
        if (err.name.includes("Sequelize"))
        {
            let explanation = [];
            err.errors.forEach((e) => {
                explanation.push(e.message);
            })
            
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        throw new AppError(`Cannot create a new City Object: ${err.message}`, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id, data)
{
    try {
        const city = await cityRepository.update(id, data);
        return city;
    }
    catch(err) {
        if (err.name.includes("Sequelize"))
        {
            let explanation = [];
            err.errors.forEach((e) => {
                explanation.push(e.message);
            })
            
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        
        if (err.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The city you requested to update is not present", err.statusCode);
        }

        throw new AppError(`Cannot update data of city: ${err.message}`, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteCity(id)
{
    try {
        const response = await cityRepository.destroy(id);
        return response;
    }
    catch(err) {
        if (err.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The city you requested to delete is not present", err.statusCode);
        }

        throw new AppError(`Cannot delete city: ${err.message}`, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createCity,
    updateCity,
    deleteCity
}