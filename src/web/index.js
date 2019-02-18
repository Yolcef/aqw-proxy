const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const cors = require('cors');

/**
 * Routes
 */
const SiteRouter = require('./app/routes/Site');

/**
 * Express instance
 */
const app = express();

/**
 * Settings
 */
app.set('views', path.join(__dirname, '.', 'resources/views'));
app.set('view engine', 'pug');

/**
 * Middleware
 */
app.use(express.static(path.join(__dirname, '.', 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

/**
 * Routers
 */
app.use('/', SiteRouter);

/**
 * Express listen
 * @param {string} port Server listen port
 * @returns {Promise<void>}
 */
module.exports = new Promise(resolve => app.listen(process.env.PORT, () => resolve()));
