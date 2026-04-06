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
    /*
    * Adds a new photo to a specific gallery.
    * Takes the gallery ID and the new photo object, and adds the photo to the gallery's photos array in the store.
    */
    addPhoto(id, photos) {
        this.store.addItem(this.collection, id, this.array, photos);
    },
    /*
    * Adds a new gallery to the store.
    * Takes a gallery object and adds it to the 'galleries' collection in the JSON store.
    */
    addGallery(gallery) {
        this.store.addCollection(this.collection, gallery);
    },

    /*
    * Removes a song from a specific gallery.
    * Takes the gallery ID and the photo ID, and removes the photo from the gallery's photos array in the store.
    */
    removePhoto(id, galleryId) {
        this.store.removeItem(this.collection, id, this.array, galleryId);
    },
    /*
    * Removes a gallery from the store.
    * Takes the gallery ID, finds the corresponding gallery in the 'galleries' collection, and removes it from the store.
    */
    removeGallery(id) {
        const gallery = this.getGallery(id);
        this.store.removeCollection(this.collection, gallery);
    },


};

export default galleryStore;