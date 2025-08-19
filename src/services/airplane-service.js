const { AirplaneRepository } = require("../repositories")

const CrudService = require('./crud-service')

const airplaneRepository = new AirplaneRepository();

class AirplaneService extends CrudService {
    constructor()
    {
        super('Airplane', airplaneRepository);
    }
}


module.exports = AirplaneService