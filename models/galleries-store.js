'use strict';

/*
 * Model for the galleries data.
 * Manages retrieval of all galleries and individual galleries from a JSON store.
 */

import logger from "../utils/looger.js";
import JsonStore from './json-store.js';

const galleryStore = {

    store: new JsonStore('./models/galleries-store.json', { galleries: [] }), // Initialise the JSON store with the galleries file
    collection: 'galleries', // The key used to access the galleries collection in the store
    array: 'photos',         // The key used to access the photos array within a gallery

    /*
     * Retrieves all galleries from the JSON store.
     * Returns the full contents of the 'galleries' collection.
     */
    getAllGalleries() {
        return this.store.findAll(this.collection); // Fetch all galleries from the store
    },

    /*
     * Retrieves a single gallery by its ID.
     * Searches the 'galleries' collection for a gallery whose ID matches the given ID.
     */
    getGallery(id) {
        return this.store.findOneBy(this.collection, (gallery => gallery.id === id)); // Find and return the gallery matching the given ID
    },
};

export default galleryStore;