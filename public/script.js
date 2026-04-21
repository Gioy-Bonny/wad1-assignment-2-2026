document.addEventListener("DOMContentLoaded", function () {

    // --- Logo Modal ---
    const modal = document.getElementById("logoModal");
    const modalImg = document.getElementById("logoImage");
    const cameraButton = document.getElementById("cameraButton");
    const closeBtn = document.querySelector(".close");

    if (cameraButton) {
        cameraButton.onclick = function () {
            modal.style.display = "block";  // Show the logo modal
            modalImg.src = "PG_logo.png";   // Set the logo image source
        };
    }

    if (closeBtn) {
        closeBtn.onclick = function () {
            modal.style.display = "none";   // Hide the logo modal
        };
    }

    // --- Map Modal ---
    const mapModal = document.getElementById("mapModal");
    const mapButton = document.getElementById("mapButton");
    const closeMap = document.querySelector(".closeMap");

    if (mapButton) {
        mapButton.addEventListener("click", function () {
            mapModal.style.display = "block"; // Show the map modal
        });
    }

    if (closeMap) {
        closeMap.addEventListener("click", function () {
            mapModal.style.display = "none"; // Hide the map modal
        });
    }

    // --- Star Rating ---
    if ($('.ui.rating').length) {
        $('.ui.rating').rating({
            onRate: function (value) {
                $('#ratingValue').val(value); // Store the selected rating in the hidden input
            }
        });
    }

    // --- Photo Fullscreen Modal ---
    const closePhoto = document.querySelector(".closePhoto");
    const photoModal = document.getElementById("photoModal");

    if (closePhoto) {
        closePhoto.addEventListener("click", function () {
            photoModal.style.display = "none"; // Hide the photo modal when X is clicked
        });
    }

    if (photoModal) {
        photoModal.addEventListener("click", function (e) {
            if (e.target === this) {
                this.style.display = "none"; // Hide the photo modal when clicking outside the image
            }
        });
    }

});

// Opens the fullscreen photo modal with the selected image and title
function openPhotoModal(url, title) {
    const modal = document.getElementById("photoModal");
    const img = document.getElementById("photoModalImg");
    const caption = document.getElementById("photoModalTitle");

    img.src = url;                   // Set the full size image source
    caption.textContent = title;     // Set the photo title as caption
    modal.style.display = "block";   // Show the modal
}