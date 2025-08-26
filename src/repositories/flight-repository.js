const CrudRepository = require('./crud-repository')
const { Flight, Airplane, Airport, City } = require('../models')

class FlightRepository extends CrudRepository {
    constructor()
    {
        super(Flight);
    }

    async getAll(filter, sortFilters)
    {
        const res = await Flight.findAll({
            where: filter,
            order: sortFilters,
            include: [
                { model: Airplane, as: 'airplane', required: true },
                { model: Airport, as: 'departureAirport', required: true, include: { model: City, as: 'city' } },
                { model: Airport, as: 'arrivalAirport', required: true, include: { model: City, as: 'city' } }
            ]
        })

        return res;
    }
}


module.exports = FlightRepository