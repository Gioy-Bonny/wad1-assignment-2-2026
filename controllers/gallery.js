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
     * Handles the asynchronous deletion of a photo from a specific gallery.
     * Retrieves the photo from the store, deletes the image from Cloudinary,
     * removes the photo from the gallery in the store, then redirects back to the gallery view.
     */
    async deletePhoto(request, response) {
        try {
            const galleryId = request.params.id;                                    // Extract the gallery ID from the URL params
            const photoId = request.params.photoid;                                 // Extract the photo ID from the URL params
            const gallery = galleryStore.getGallery(galleryId);                     // Retrieve the gallery from the store
            const photo = galleryStore.getPhoto(galleryId, photoId);                // Retrieve the specific photo from the gallery

            logger.debug(`Deleting photo ${photoId} from gallery ${galleryId}`);   // Log the IDs of the photo and gallery being deleted
            galleryStore.removePhoto(photoId, galleryId);                         // Delete from Cloudinary and remove from store
            response.redirect(`/gallery/${galleryId}`);                             // Redirect back to the gallery view on success
        } catch (error) {
            logger.error("Error deleting photo:", error);                           // Log any unexpected errors
            response.redirect("/error");                                            // Redirect to the error page
        }
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