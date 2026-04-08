'use strict';

/*
 * Controller for the Galleries page.
 * Handles rendering the galleries view with all available photo galleries.
 */

import logger from "../utils/logger.js";
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


        const galleries = galleriesStore.getAllGalleries();
        const images = galleries.flatMap(gallery => gallery.photos.map(photo => photo.image));
        const randomImage = images.length > 0 ? images[Math.floor(Math.random() * images.length)] : null;

        const viewData = {
            galleries: galleries,
            randomImage: randomImage,
            title: "Photo Gallery Dashboard",
        };
        logger.debug(`Random Image: ${randomImage}`);
        logger.debug(viewData.galleries);          // Log the galleries data for debugging
        response.render("galleries", viewData);    // Render the galleries view with the prepared data
    },

    addGallery(request, response) {
        const timestamp = new Date();
        const newGallery = {
            id: uuidv4(),
            title: request.body.title,
            photographer: request.body.photographer,
            date: timestamp.toLocaleString(),
            rating: parseInt(request.body.rating) || 0, // Default to 0 if no rating is provided
            photos: [],
        };
        galleriesStore.addGallery(newGallery);
        response.redirect('/galleries');
    },

    deleteGallery(request, response) { // Extract the gallery ID from the URL params
        const galleryId = request.params.id;// Log the ID of the gallery being deleted
        
        logger.debug(`Deleting Gallery ${galleryId}`);// Remove the gallery from the store using its ID
        
        galleriesStore.removeGallery(galleryId);
        response.redirect("/galleries");
    },

};

export default galleries;