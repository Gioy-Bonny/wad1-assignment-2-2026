'use strict';

/*
 * Main application entry point for the Photo Gallery App.
 * Configures and initialises the Express server, Handlebars view engine,
 * static file serving, and application routes.
 */

import { create } from 'express-handlebars';
import express from 'express';
import routes from './routes.js';
import logger from './utils/looger.js';

const app = express();       // Initialise the Express application
const port = 3000;           // Define the port number for the server

app.use(express.static("public")); // Serve static files (CSS, JS, images) from the "public" directory

/*
 * Configure the Handlebars view engine.
 * Sets .hbs as the file extension for all view templates.
 */
const handlebars = create({ extname: '.hbs' }); // Create a Handlebars instance with .hbs extension
app.engine(".hbs", handlebars.engine);           // Register the Handlebars engine with Express
app.set("view engine", ".hbs");                  // Set Handlebars as the default view engine

app.use("/", routes); // Mount all application routes defined in routes.js

/*
 * Start the Express server and listen on the defined port.
 * Logs a confirmation message once the server is up and running.
 */
app.listen(port, () => logger.info(`Express app running on port ${port}!`));