const express = require("express")
const { InfoController } = require("../../controllers/index.js")

const airplaneRoutes = require('./airplane-routes.js')

const router = express.Router();

router.use('/airplanes', airplaneRoutes);

router.get('/info', InfoController.info);


module.exports = router