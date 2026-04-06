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
    /*
    * Adds a new photo to a specific gallery.
    * Extracts the gallery ID from the request params, creates a new photo object from the request body,
    * adds the photo to the gallery in the store, and redirects back to the gallery view.
    */
    addPhoto(request, response) {
        const galleryId = request.params.id;
        const gallery = galleryStore.getGallery(galleryId);
        const newPhoto = {
        id: 5,
        title: request.body.title,
        };
        galleryStore.addPhoto(galleryId, newPhoto);
        response.redirect('/gallery/' + galleryId);
    },

    /*
    * Deletes a photo from a specific gallery.
    * Extracts the gallery ID and photo ID from the request params, removes the photo from the gallery in the store, and redirects back to the gallery view.
    */
    deletePhoto(request, response) { // Extract the gallery ID and photo ID from the URL params
        const galleryId = request.params.id;// Extract the gallery ID from the URL params
        const photoId = request.params.photoid;// Extract the photo ID from the URL params
        
        logger.debug(`Deleting Photo ${photoId} from Gallery ${galleryId}`);// Log the IDs of the gallery and photo being deleted
        
        galleryStore.removePhoto(galleryId, photoId);// Remove the photo from the gallery in the store
        response.redirect(`/gallery/${galleryId}` );// Redirect back to the gallery view to show the updated gallery without the deleted photo
    },
};

export default gallery;