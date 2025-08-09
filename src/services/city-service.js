const { StatusCodes } = require('http-status-codes')

const AppError = require('../utils/errors/app-error')
const { CityRepository } = require("../repositories")

const CrudService = require('./crud-service')

const cityRepository = new CityRepository();

class CityService extends CrudService {
    constructor()
    {
        super('City', cityRepository);
    }
}


module.exports = CityService