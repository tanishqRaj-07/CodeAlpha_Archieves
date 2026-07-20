// ======================
// DOM ELEMENTS
// ======================

const buttons = document.querySelectorAll(".filter_container button");
const imageCards = document.querySelectorAll(".image-card");

const searchBar = document.querySelector(".search_bar");

const galleryImages = document.querySelectorAll(".image-card img");

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector("#lightbox-img");

const closeBtn = document.querySelector(".close-btn");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

const zoomInBtn = document.querySelector(".zoom-in");
const zoomOutBtn = document.querySelector(".zoom-out");


// ======================
// GLOBAL VARIABLES
// ======================

let scale = 1;
let currentIndex = 0;
let currentImages = [];


// ======================
// FILTER FUNCTIONALITY
// ======================

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        imageCards.forEach(card => {

            if (
                filter === "all" ||
                card.dataset.category === filter
            ) {
                card.style.display = "block";
            }
            else {
                card.style.display = "none";
            }

        });

    });

});


// ======================
// SEARCH FUNCTIONALITY
// ======================

searchBar.addEventListener("keydown", (e) => {

    if (e.key !== "Enter") return;

    const searchValue = searchBar.value
        .toLowerCase()
        .trim();

    let found = false;

    buttons.forEach(button => {

        if (button.dataset.filter.includes(searchValue)) {

            button.click();
            found = true;

        }

    });

    if (!found) {

        alert("Category not found!");

    }

});


// ======================
// LIGHTBOX OPEN
// ======================

galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        currentImages = getVisibleImages();

        currentIndex = currentImages.indexOf(image);

        lightboxImg.src = image.src;

        scale = 1;
        lightboxImg.style.transform = `scale(${scale})`;

        lightbox.classList.add("active");

    });

});


// ======================
// LIGHTBOX CLOSE
// ======================

closeBtn.addEventListener("click", () => {

    lightbox.classList.remove("active");

});


lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        lightbox.classList.remove("active");

    }

});


document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {

        lightbox.classList.remove("active");

    }

    if (e.key === "ArrowRight") {

        nextBtn.click();

    }

    if (e.key === "ArrowLeft") {

        prevBtn.click();

    }

});


// ======================
// NEXT IMAGE
// ======================

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= currentImages.length) {

        currentIndex = 0;

    }

    showImage(currentIndex);

});


// ======================
// PREVIOUS IMAGE
// ======================

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = currentImages.length - 1;

    }

    showImage(currentIndex);

});


// ======================
// ZOOM CONTROLS
// ======================

zoomInBtn.addEventListener("click", () => {

    scale += 0.2;

    lightboxImg.style.transform =
        `scale(${scale})`;

});


zoomOutBtn.addEventListener("click", () => {

    if (scale > 0.4) {

        scale -= 0.2;

        lightboxImg.style.transform =
            `scale(${scale})`;

    }

});


// ======================
// HELPER FUNCTIONS
// ======================

function showImage(index) {

    lightboxImg.src = currentImages[index].src;

    scale = 1;

    lightboxImg.style.transform =
        `scale(${scale})`;

}


function getVisibleImages() {

    return [...document.querySelectorAll(".image-card")]

        .filter(card => card.style.display !== "none")

        .map(card => card.querySelector("img"));

}