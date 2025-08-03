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


module.exports = {
    createAirplane,
    getAirplanes
}