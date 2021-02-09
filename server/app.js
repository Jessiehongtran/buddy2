const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

//import Routes
const requestRoutes = require('./routes/requests.route');
const topicRoutes = require('./routes/topics.route');
const userRoutes = require('./routes/users.route');
const timeZonesRoutes = require('./routes/timezones.route');
const matchRoutes = require('./routes/matches.route');


//middlewares
app.use(bodyParser.json())
app.use(cors())
app.use('/api/requests', requestRoutes)
app.use('/api/topics', topicRoutes)
app.use('/api/users', userRoutes)
app.use('/api/timezones', timeZonesRoutes)
app.use('/api/matches', matchRoutes)



module.exports = app;