const express = require("express")
const { InfoController } = require("../../controllers/index.js")

const cityRoutes = require('./city-routes.js')
const airplaneRoutes = require('./airplane-routes.js')
const airportRoutes = require('./airport-routes.js')

const router = express.Router();

router.use('/airplanes', airplaneRoutes);
router.use('/cities', cityRoutes);
router.use('/airports', airportRoutes);

router.get('/info', InfoController.info);


module.exports = router