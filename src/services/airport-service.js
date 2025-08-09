const { StatusCodes } = require('http-status-codes')

const AppError = require('../utils/errors/app-error')
const { AirportRepository } = require("../repositories")

const CrudService = require('./crud-service')

const airportRepository = new AirportRepository();

class AirportService extends CrudService {
    constructor()
    {
        super('Airport', airportRepository);
    }
}


module.exports = AirportService