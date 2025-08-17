const express = require('express')
const { AirportController } = require('../../controllers')
const { AirportMiddlewares } = require('../../middlewares')

const router = express.Router();

router.get('/', AirportController.getAirports); // /api/v1/airports GET

router.get('/:id', AirportController.getAirport); // /api/v1/airports/:id GET

router.post('/', AirportMiddlewares.validateCreateRequest, AirportController.createAirport); // /api/v1/airports POST

router.patch('/:id', AirportMiddlewares.validateUpdateRequest, AirportController.updateAirport); // /api/v1/airports/:id PATCH

router.delete('/:id', AirportController.deleteAirport); // /api/v1/airports/:id DELETE


module.exports = router