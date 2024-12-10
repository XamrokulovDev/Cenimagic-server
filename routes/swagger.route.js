const { Router } = require("express");
const router = Router();

// importing swagger configuration  
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');

// Swagger route
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;