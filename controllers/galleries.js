'use strict';

/*
 * Controller for the Galleries page.
 * Handles rendering the galleries view with all available photo galleries.
 */

import logger from "../utils/logger.js";
import galleriesStore from '../models/galleries-store.js';
import { v4 as uuidv4 } from 'uuid';
import accounts from "./accounts.js";
const galleries = {

    /*
     * Creates and renders the Galleries page view.
     * Retrieves all galleries from the store, prepares the view data and renders the "galleries" template.
     */
    createView(request, response) {
        logger.info("Dashboard page loading!");

        const loggedInUser = accounts.getCurrentUser(request);

        if (loggedInUser) {
            const searchTerm = request.query.searchTerm || "";

            const galleries = searchTerm
                ? galleriesStore.searchUserGalleries(searchTerm, loggedInUser.id)
                : galleriesStore.getUserGalleries(loggedInUser.id);

            const sortField = request.query.sort;
            const order = request.query.order === "desc" ? -1 : 1;

            let sorted = galleries;

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
                title: "Photo Galleries Dashboard",
                fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
                galleries: sortField ? sorted : galleries,
                search: searchTerm,
                titleSelected: request.query.sort === "title",
                ratingSelected: request.query.sort === "rating",
                ascSelected: request.query.order === "asc",
                descSelected: request.query.order === "desc",
            };

            logger.info('about to render' + viewData.galleries);

            response.render('galleries', viewData);
        }
        else response.redirect('/');

    },



    addGallery(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        const timestamp = new Date();
        const newGallery = {
            id: uuidv4(),
            title: request.body.title,
            photographer: request.body.photographer,
            date: timestamp.toISOString(),
            rating: parseInt(request.body.rating) || 0, // Default to 0 if no rating is provided
            photos: [],
            userid: loggedInUser.id
        };
        galleriesStore.addGallery(newGallery); {
            response.redirect('/galleries');
        }
    },

    async deleteGallery(request, response) {
        const galleryId = request.params.id;
        logger.debug(`Deleting Gallery ${galleryId}`);

        try {
            await galleriesStore.removeGallery(galleryId);
            response.redirect("/galleries");
        } catch (err) {
            logger.error('error deleting gallery: ' + err.message);
            response.status(500).json({ error: 'Failed to delete gallery' });
        }
    },

};

export default galleries;