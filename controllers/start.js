'use strict';

/*
 * Controller for the Start/Welcome page.
 * Handles rendering the initial landing view of the Photo Gallery app.
 */

import logger from "../utils/looger.js";

const start = {

    /*
     * Creates and renders the Start page view.
     * Assembles the view data with a welcome title and renders the "start" template.
     */
    createView(request, response) {
        logger.debug("Creating start view"); // Log when the start view is being created

        const viewData = {
            title: "Welcome to the Photo Gallery app!", // Set the welcome page title
        };

        response.render("start", viewData); // Render the start view with the prepared data
    },
};

export default start;