const { FlightRepository } = require("../repositories")

const CrudService = require('./crud-service')

const flightRepository = new FlightRepository();

class FlightService extends CrudService {
    constructor()
    {
        super('Flight', flightRepository);
    }
}


module.exports = FlightService