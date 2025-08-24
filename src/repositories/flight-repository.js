const { Flight } = require('../models')
const CrudRepository = require('./crud-repository')

class FlightRepository extends CrudRepository {
    constructor()
    {
        super(Flight);
    }

    async getAll(filter, sortFilters)
    {
        const res = await Flight.findAll({
            where: filter,
            order: sortFilters
        })

        return res;
    }
}


module.exports = FlightRepository