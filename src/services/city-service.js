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


module.exports = {
    createCity
}