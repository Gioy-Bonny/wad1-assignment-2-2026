'use strict';

/*
 * Model for the application information.
 * Manages retrieval of app metadata from a JSON store.
 */

import logger from '../utils/looger.js';
import JsonStore from './json-store.js';

const appInfo = {

    store: new JsonStore('./models/app-info.json', { info: {} }), // Initialise the JSON store with the app-info file
    collection: 'info',     // The collection key used to access app info in the store
    array: 'creators',      // The key used to access the creators array in the store

    /*
     * Retrieves all application metadata from the JSON store.
     * Returns the full contents of the 'info' collection.
     */
    getAppInfo() {
        return this.store.findAll(this.collection); // Fetch all entries from the info collection
    },
};

export default appInfo;