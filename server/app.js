const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

//import Routes
const dayRoutes = require('./routes/days.route');
const requestRoutes = require('./routes/requests.route');
const topicRoutes = require('./routes/topics.route');
const userRoutes = require('./routes/users.route');
const timeRoutes = require('./routes/times.route');
const timeZonesRoutes = require('./routes/timezones.route')


//middlewares
app.use(bodyParser.json())
app.use(cors())
app.use('/api/days', dayRoutes)
app.use('/api/requests', requestRoutes)
app.use('/api/topics', topicRoutes)
app.use('/api/users', userRoutes)
app.use('/api/times', timeRoutes)
app.use('/api/timezones', timeZonesRoutes)



module.exports = app;