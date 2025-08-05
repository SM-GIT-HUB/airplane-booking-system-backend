const express = require('express');
const { CityController } = require('../../controllers');
const { CityMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post('/', CityMiddlewares.validateCreateRequest, CityController.createCity); // /api/v1/cities POST

router.delete('/:id', CityController.deleteCity); // /api/v1/cities/:id DELETE


module.exports = router