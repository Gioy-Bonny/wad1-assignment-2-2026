'use strict';

/*
 * Application router.
 * Defines all the routes for the Photo Gallery App and maps them to their
 * corresponding controller methods.
 */

import express from 'express';
import logger from './utils/looger.js';

const router = express.Router(); // Initialise the Express router

/*
 * Import all page controllers.
 * Each controller handles the view logic for its respective page.
 */
import start from './controllers/start.js';
import galleries from './controllers/galleries.js';
import about from './controllers/about.js';
import gallery from './controllers/gallery.js';

/*
 * Route definitions.
 * Each route maps an HTTP GET request to its corresponding controller method.
 */
router.get('/', start.createView);                // Home/Start page
router.get('/galleries', galleries.createView);   // Galleries dashboard page
router.get('/about', about.createView);           // About page
router.get('/gallery/:id', gallery.createView);   // Single gallery page, dynamic ID param

router.get('/error', (request, response) => response.status(404).end('Page not found.')); // Catch-all error route returning a 404 response

export default router;