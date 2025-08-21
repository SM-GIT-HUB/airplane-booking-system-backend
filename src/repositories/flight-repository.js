const { where } = require('sequelize');
const { Flight } = require('../models')
const CrudRepository = require('./crud-repository')

class FlightRepository extends CrudRepository {
    constructor()
    {
        super(Flight);
    }

    async getAll(filter)
    {
        const res = await Flight.findAll({
            where: filter
        })

        return res;
    }
}


module.exports = FlightRepository