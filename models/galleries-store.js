'use strict';

import { response } from "express";
import gallery from "../controllers/gallery.js";
/*
* Model for the galleries data.
* Manages retrieval of all galleries and individual galleries from a JSON store.
*/

import logger from "../utils/logger.js";
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
    * Retrieves a single photo from a specific gallery by their IDs.
    * First retrieves the gallery using the gallery ID, then searches the gallery's photos array for a photo whose ID matches the given photo ID.
    */
    getPhoto(galleryId, photoId) {
        const gallery = this.getGallery(galleryId);
        return gallery.photos.find(photo => photo.id === photoId);
    },

    getAllPhotos(galleryId){
        const gallery = this.getGallery(galleryId);
        return gallery.array;
    },
    /*
 * Asynchronously adds a new photo to a specific gallery.
 * Uploads the image file to Cloudinary, attaches the returned URL to the photo,
 * then saves the photo to the gallery's photos array in the store.
 */
    async addPhoto(gallery, photo, file) {
        photo.image = await this.store.addToCloudinary(file); // Upload image to Cloudinary
        this.store.addItem(this.collection, gallery.id, this.array, photo); // Add photo to gallery
    },
    /*
    * Removes a song from a specific gallery.
    * Takes the gallery ID and the photo ID, and removes the photo from the gallery's photos array in the store.
    */
    /*
     * Asynchronously removes a photo from a specific gallery.
     * Deletes the image from Cloudinary using the public ID,
     * then removes the photo from the gallery's photos array in the store.
     */
    async removePhoto(id, galleryId) {
            const photo = this.getPhoto(galleryId, id);
            try{
                await this.store.deleteFromCloudinary(photo.image.public_id); // Delete the image from Cloudinary
                logger.info("Cloudinary image deleted");
            }catch(err){
                logger.error("Failed to delete Cloudinary image:", err);
            }
            await this.store.removeItem(this.collection, galleryId, this.array, id);
        },

    /*
    * Updates a photo in a specific gallery.
    * Takes the gallery ID, photo ID, and the updated photo object, and updates the corresponding photo in the gallery's photos array in the store.
    */
    updatePhoto(id, photoId, updatedPhoto) {
        this.store.editItem(this.collection, id, photoId, this.array, updatedPhoto);
    },
    /*
    * Adds a new gallery to the store.
    * Takes a gallery object and adds it to the 'galleries' collection in the JSON store.
    */
    addGallery(gallery) {
        this.store.addCollection(this.collection, gallery);
    },
    /*
    * Removes a gallery from the store.
    * Takes the gallery ID, finds the corresponding gallery in the 'galleries' collection, and removes it from the store.
    */
   
    async removeGallery(id) {
    const gallery = this.getGallery(id);
        if (!gallery) {
        logger.error('gallery not found for id: ' + id);
        return;
    }
    const images = gallery.photos;
    logger.info('images array: ' + JSON.stringify(images));

    try {
        await this.store.deleteManyFromCloudinary(images);
        logger.info('deleted photos from cloudinary for gallery: ' + id);

        await this.store.removeCollection(this.collection, gallery);
        logger.info('removed gallery collection: ' + id);
    } catch (err) {
        logger.error('failed to remove gallery ' + id + ': ' + err.message);
        throw err;
    }
},
    /*
    * Searches for galleries by title.
    * Takes a search string and returns an array of galleries whose titles include the search string (case-insensitive).
    */
    searchGalleries(search) {
        return this.store.findBy(
            this.collection,
            (gallery => gallery.title.toLowerCase().includes(search.toLowerCase())))
    },
    /*
    * Retrieves all galleries for a specific user.
    * Takes a user ID and returns an array of galleries that belong to that user from the 'galleries' collection in the store.
    */
    getUserGalleries(userid) {
        return this.store.findBy(this.collection, (gallery => gallery.userid === userid));
    },
    /*
    * Searches for galleries by title for a specific user.
    * Takes a search string and a user ID, and returns an array of galleries that belong to that user and whose titles include the search string (case-insensitive).
    */
    searchUserGalleries(search, userid) {
        return this.store.findBy(
            this.collection,
            (gallery => gallery.userid === userid && gallery.title.toLowerCase().includes(search.toLowerCase())))
    },
};

export default galleryStore;