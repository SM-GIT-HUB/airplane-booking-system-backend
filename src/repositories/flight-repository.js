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

    async updateRemainingSeats(flightId, seats, dec = 1)
    {
        const flight = await Flight.findByPk(flightId);

        if (parseInt(dec)) {
            await flight.decrement('totalSeats', { by: seats });
        }
        else
            await flight.increment('totalSeats', { by: seats });
        
        await flight.reload();
        return flight;
    }
}


module.exports = FlightRepository