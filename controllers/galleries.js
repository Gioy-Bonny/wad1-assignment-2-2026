'use strict';

/*
 * Controller for the Galleries page.
 * Handles rendering the galleries view with all available photo galleries.
 */

import logger from "../utils/looger.js";
import galleriesStore from '../models/galleries-store.js';
import { v4 as uuidv4 } from 'uuid';

const galleries = {

    /*
     * Creates and renders the Galleries dashboard view.
     * Retrieves all galleries from the store, assembles the view data,
     * logs relevant information, and renders the "galleries" template.
     */
    createView(request, response) {
        logger.info('Creating view for the galleries page.'); // Log when the view creation is triggered

        const viewData = {
            galleries: galleriesStore.getAllGalleries(), // Fetch all galleries from the store
            title: "Photo Gallery Dashboard",
        };

        logger.debug(viewData.galleries);          // Log the galleries data for debugging
        response.render("galleries", viewData);    // Render the galleries view with the prepared data
    },

    addGallery(request, response) {
        const newGallery = {
            id: uuidv4(),
            title: request.body.title,
            photos: [],
        };
        galleriesStore.addGallery(newGallery);
        response.redirect('/dashboard');
    },

};

export default galleries;