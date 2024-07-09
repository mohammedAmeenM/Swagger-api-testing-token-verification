const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const authRoutes = require('./src/routes/authRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const userRouter = require('./src/routes/userRoutes');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//routes

app.use('/api/auth/',authRoutes);
app.use('/api/users/',userRouter)

module.exports = app    