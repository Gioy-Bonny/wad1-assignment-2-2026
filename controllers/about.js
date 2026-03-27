'use strict';

/*
 * Controller for the About page.
 * Handles rendering the about view with application and creator information.
 */

import logger from "../utils/looger.js";
import appInfo from "../models/app-info.js";
import creatorStore from "../models/creators-store.js";

const about = {

    /*
     * Creates and renders the About page view.
     * Retrieves app metadata and creator information, assembles the view data,
     * logs relevant information, and renders the "about" template.
     */
    createView(request, response) {
        const info = appInfo.getAppInfo(); // Fetch application metadata

        const viewData = {
            title: "About the Photo Gallery App",
            workingGroup: creatorStore.getCreatorInfo(), // Retrieve creator/team details
            info: appInfo.getAppInfo()                   // Retrieve app metadata
        };

        logger.info(viewData.workingGroup);                                  // Log working group info
        logger.debug("About view data: " + JSON.stringify(viewData));        // Log full view data for debugging
        response.render("about", viewData);                                  // Render the about view with the prepared data
    }
};

export default about;