const { Op } = require("sequelize");
const { FlightRepository } = require("../repositories")

const CrudService = require('./crud-service')

const flightRepository = new FlightRepository();

class FlightService extends CrudService {
    constructor()
    {
        super('Flight', flightRepository);
    }

    async getAll(query)
    {
        let filter = {};

        if (query.trips)
        {
            const [departure, arrival] = query.trips.split("-");
            filter.departureAirportId = departure;
            filter.arrivalAirportId = arrival;
        }

        if (query.price)
        {
            const [minPrice, maxPrice] = query.price.split("-");
            filter.price = { [Op.between]: [minPrice, maxPrice? maxPrice : 20000] };
        }

        if (query.travellers) {
            filter.totalSeats = { [Op.gte]: query.travellers };
        }

        if (query.tripDate)
        {
            filter.departureTime = {
                [Op.between]: [query.tripDate, query.tripDate + " 23:59:00"]
            }
        }

        try {
            const flights = await flightRepository.getAll(filter);
            return flights;
        }
        catch(err) {
            throw new AppError(`Cannot fetch data of all flights: ${err.message}`, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}


module.exports = FlightService