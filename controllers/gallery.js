'use strict';

/*
 * Controller for the individual Gallery page.
 * Handles rendering a single gallery view based on the gallery ID from the request.
 */

import logger from "../utils/looger.js";
import galleryStore from "../models/galleries-store.js";
import { v4 as uuidv4 } from 'uuid';

const gallery = {

    /*
     * Creates and renders a single Gallery view.
     * Extracts the gallery ID from the request params, retrieves the matching
     * gallery from the store, and renders the "gallery" template with it.
     */
    createView(request, response) {

        const galleryId = request.params.id; // Extract the gallery ID from the URL params
        logger.info(`Gallery ID: ${galleryId}`); // Log the requested gallery ID

        const viewData = {
            title: 'gallery',
            singleGallery: galleryStore.getGallery(galleryId) // Fetch the specific gallery by ID
        };

        response.render('gallery', viewData); // Render the gallery view with the retrieved data
    },

    addPhoto(request, response) {
        const galleryId = request.params.id;
        const gallery = galleryStore.getGallery(galleryId);
        const newPhoto = {
            id: uuidv4(),
            title: request.body.title,
            photographer: request.body.photographer,
            image: request.body.url
        };
        galleryStore.addPhoto(galleryId, newPhoto);
        response.redirect('/gallery/' + galleryId);
    },
};

export default gallery;