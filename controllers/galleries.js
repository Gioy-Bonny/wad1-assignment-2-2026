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
        logger.info('Creating view for the galleries page.');

        const searchTerm = request.query.searchTerm || "";

        const galleries = searchTerm
            ? galleriesStore.searchGallery(searchTerm)
            : galleriesStore.getAllGalleries();

        const sortField = request.query.sort;
        const order = request.query.order === "desc" ? -1 : 1;

        let sorted = galleries.slice(); // Create a copy of the galleries array for sorting

        if (sortField) {
            sorted = galleries.slice().sort((a, b) => {
                if (sortField === "title") {
                    return a.title.localeCompare(b.title) * order;
                }

                if (sortField === "rating") {
                    return (a.rating - b.rating) * order;
                }

                return 0;
            });
        }

        const viewData = {
            title: "Photo Gallery Dashboard",
            galleries: sortField ? sorted : galleries,
            search: searchTerm,
            titleSelected: request.query.sort === "title",
            ratingSelected: request.query.sort === "rating",
            ascSelected: request.query.order === "asc",
            descSelected: request.query.order === "desc",
        };

        logger.debug(viewData.galleries.length + " galleries to display");

        response.render("galleries", viewData);
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