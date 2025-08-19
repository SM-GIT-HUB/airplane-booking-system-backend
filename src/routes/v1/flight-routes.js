const express = require('express')
const { FlightController } = require('../../controllers')
const { FlightMiddlewares } = require('../../middlewares')

const router = express.Router();

router.get('/', FlightController.getFlights); // /api/v1/flights GET

router.get('/:id', FlightController.getFlight); // /api/v1/flights/:id GET

router.post('/', FlightMiddlewares.validateCreateRequest, FlightController.createFlight); // /api/v1/flights POST

router.patch('/:id', FlightMiddlewares.validateUpdateRequest, FlightController.updateFlight); // /api/v1/flights/:id PATCH

router.delete('/:id', FlightController.deleteFlight); // /api/v1/flights/:id DELETE


module.exports = router