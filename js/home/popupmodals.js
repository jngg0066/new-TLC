var homenewsModals = document.querySelectorAll(".homenews");

var openPopupImgs = document.querySelectorAll("[data-popup]");

var openPopupButtons = document.querySelectorAll("[data-popup-btn]");

function showModal(index) {
    homenewsModals[index].style.display = "block";
}

openPopupImgs.forEach(function(image, index) {
    image.onclick = function() {
        showModal(index);
    }
});

openPopupButtons.forEach(function(button, index) {
    button.onclick = function() {
        showModal(index);
    }
});

var homenewsCloses = document.querySelectorAll(".homenews-close");

homenewsCloses.forEach(function(closeBtn) {
    closeBtn.onclick = function() {
        this.parentNode.parentNode.style.display = "none";
    }
});

window.onclick = function(event) {
    homenewsModals.forEach(function(modal) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}
