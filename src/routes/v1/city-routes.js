const express = require('express');
const { CityController } = require('../../controllers');
const { CityMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post('/', CityMiddlewares.validateCreateRequest, CityController.createCity); // /api/v1/cities POST


module.exports = router