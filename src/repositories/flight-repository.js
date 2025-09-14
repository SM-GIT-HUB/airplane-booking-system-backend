const db = require("../models")

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
        return await db.sequelize.transaction(async(t) => {
            const flight = await Flight.findByPk(flightId, {
                transaction: t,
                lock: t.LOCK.UPDATE
            })

            if (!flight) {
                throw new AppError("Not able to find the resource", StatusCodes.NOT_FOUND);
            }

            if (parseInt(dec)) {
                await flight.decrement('totalSeats', { by: seats, transaction: t });
            }
            else
                await flight.increment('totalSeats', { by: seats, transaction: t });
            
            await flight.reload({ transaction: t });
            return flight;
        })
    }
}


module.exports = FlightRepository