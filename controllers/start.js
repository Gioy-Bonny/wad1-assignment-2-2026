'use strict';

/*
 * Controller for the Start/Welcome page.
 * Handles rendering the initial landing view of the Photo Gallery App,
 * including live statistics about the galleries and photos.
 */

import logger from "../utils/looger.js";
import galleriesStore from "../models/galleries-store.js";

const start = {

    /*
     * Creates and renders the Start page view.
     * Retrieves all galleries, calculates statistics, assembles the view
     * data and renders the "start" template.
     */
    createView(request, response) {
        logger.debug("Creating start view");

        const galleries = galleriesStore.getAllGalleries(); // Fetch all galleries from the store

        const numGalleries = galleries.length; // Calculate the total number of galleries
        const numPhotos = galleries.reduce((total, gallery) => total + gallery.photos.length, 0); // Calculate the total number of photos across all galleries
        const average = numGalleries > 0 ? (numPhotos / numGalleries).toFixed(1) : 0; // Calculate the average number of photos per gallery, avoiding division by zero

        const viewData = {
            title: "Welcome to the Photo Gallery app!",
            stats: {
                displayNumGalleries: numGalleries, // Total number of galleries
                displayNumPhotos: numPhotos,        // Total number of photos
                displayAverage: average,            // Average photos per gallery
            }
        };

        logger.debug("Start view data: " + JSON.stringify(viewData)); // Log the full view data for debugging
        response.render("start", viewData); // Render the start view with the prepared data
    },
};

export default start;