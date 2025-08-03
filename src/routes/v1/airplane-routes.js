const express = require('express')
const { AirplaneController } = require('../../controllers')
const { AirplaneMiddlewares } = require('../../middlewares')

const router = express.Router();

router.get('/', AirplaneController.getAirplanes); // /api/v1/airplanes GET

router.get('/:id', AirplaneController.getAirplane); // /api/v1/airplanes/:id GET

router.post('/', AirplaneMiddlewares.validateCreateRequest, AirplaneController.createAirplane); // /api/v1/airplanes POST


module.exports = router