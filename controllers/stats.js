"use strict";
import logger from "../utils/looger.js";
import GalleriesStore from "../models/galleries-store.js";

const stats = {
    createView(request, response) {
        logger.info("Stats page loading!");
        const galleries = GalleriesStore.getAllGalleries();

        let numGalleries = galleries.length;

        let numPhoto = galleries.reduce((total, gallery) => total + gallery.photos.length, 0);

        let average = numGalleries > 0 ? (numPhoto / numGalleries).toFixed(2) : 0;


        const statistics = {
            displayNumGalleries: numGalleries,
            displayNumPhotos: numPhoto,
            displayAverage: average
        }

        const viewData = {
            title: "Gallery App Statistics",
            stats: statistics
        };

        response.render("stats", viewData);
    },
};

export default stats;
