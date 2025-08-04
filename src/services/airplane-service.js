const { StatusCodes } = require('http-status-codes')

const AppError = require('../utils/errors/app-error')
const { AirplaneRepository } = require("../repositories")

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data)
{
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    }
    catch(err) {
        if (err.name == "SequelizeValidationError")
        {
            let explanation = [];
            err.errors.forEach((e) => {
                explanation.push(e.message);
            })
            
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        throw new AppError("Cannot create a new Airplane Object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes()
{
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    }
    catch(err) {
        throw new AppError("Cannot fetch data of all airplanes", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id)
{
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    }
    catch(err) {
        if (err.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The airplane you requested is not present", err.statusCode);
        }

        throw new AppError("Cannot fetch data of airplane", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirplane(id, data)
{
    try {
        const airplane = await airplaneRepository.update(id, data);
        return airplane;
    }
    catch(err) {
        if (err.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The airplane you requested to update is not present", err.statusCode);
        }

        throw new AppError("Cannot update data of airplane", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteAirplane(id)
{
    try {
        const response = await airplaneRepository.destroy(id);
        return response;
    }
    catch(err) {
        if (err.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The airplane you requested to delete is not present", err.statusCode);
        }

        throw new AppError("Cannot delete airplane", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    updateAirplane,
    deleteAirplane
}