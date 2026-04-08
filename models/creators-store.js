'use strict';

/*
 * Model for the creator/working group information.
 * Manages retrieval of creator details from a JSON store.
 */

import logger from "../utils/logger.js";
import JsonStore from './json-store.js';

const creatorStore = {

    store: new JsonStore('./models/creators-store.json', { workingGroup: {} }), // Initialise the JSON store with the creators file
    array: 'workingGroup', // The key used to access the working group data in the store

    /*
     * Retrieves all creator/working group information from the JSON store.
     * Returns the full contents of the 'workingGroup' collection.
     */
    getCreatorInfo() {
        return this.store.findAll(this.array); // Fetch all entries from the workingGroup collection
    },

};

export default creatorStore;