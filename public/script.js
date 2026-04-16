import accounts from "../controllers/accounts"
import userStore from "../models/user-store"


document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("logoModal")
    const modalImg = document.getElementById("logoImage")
    const cameraButton = document.getElementById("cameraButton")
    const closeBtn = document.querySelector(".close")
    const mapModal = document.getElementById("mapModal")
    const mapButton = document.getElementById("mapButton")
    const closeMap = document.querySelector(".closeMap")

    cameraButton.onclick = function () {
        modal.style.display = "block"
        modalImg.src = "PG_logo.png"
    }

    closeBtn.onclick = function () {
        modal.style.display = "none"
    }

    mapButton.addEventListener("click", function () {
        mapModal.style.display = "block"
    })

    closeMap.addEventListener("click", function () {
        mapModal.style.display = "none"
    })
})

$('.ui.rating').rating({
    onRate: function (value) {
        $('#ratingValue').val(value);
    }
});

function checkPassword(){
    if (accounts.getCurrentUser(request).password == 'password') {
        alert("Your password has been reset to the default. Please change it.");
    }
}
