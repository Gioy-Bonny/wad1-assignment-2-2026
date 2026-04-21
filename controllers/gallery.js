'use strict';

/*
 * Controller for the individual Gallery page.
 * Handles rendering a single gallery view based on the gallery ID from the request.
 */

import logger from "../utils/logger.js";
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
 * Handles the asynchronous addition of a new photo to a gallery.
 * Uploads the photo image to Cloudinary, adds the photo to the gallery
 * in the store, then redirects to the gallery page.
 */
    async addPhoto(request, response) {
    try {
        const galleryId = request.params.id;                          // Extract the gallery ID from the URL params
        const gallery = galleryStore.getGallery(galleryId);           // Retrieve the gallery from the store
        const newPhoto = {
            id: uuidv4(),                                             // Generate a unique ID for the new photo
            title: request.body.title,                                // Get the photo title from the form
            photographer: request.body.photographer,                  // Get the photographer name from the form
        };
        await galleryStore.addPhoto(gallery, newPhoto, request.files.image); // Upload and add the photo to the gallery
        response.redirect(`/gallery/${galleryId}`);                   // Redirect back to the gallery on success
    } catch (error) {
        logger.error("Error adding photo to gallery:", error);        // Log any unexpected errors
        response.redirect("/error");                                  // Redirect to the error page
    }
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
        response.redirect(`/gallery/${galleryId}`);// Redirect back to the gallery view to show the updated gallery without the deleted photo
    },


    updatePhoto(request, response) {
        const galleryId = request.params.id;
        const photoId = request.params.photoid;
        logger.debug("updating photo " + photoId);

        const existingPhoto = galleryStore.getPhoto(galleryId, photoId);

        const updatedPhoto = {
            id: photoId,
            title: request.body.title,
            image: existingPhoto.image
        };
        galleryStore.updatePhoto(galleryId, photoId, updatedPhoto);
        response.redirect('/gallery/' + galleryId);
    }
};

export default gallery;