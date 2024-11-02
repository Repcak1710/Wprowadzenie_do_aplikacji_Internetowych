let currentImageIndex = 0;
const images = document.querySelectorAll('main div img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');

images.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox(img.src);
    });
});

function openLightbox(src) {
    lightbox.style.display = 'flex';
    lightboxImg.src = src;
}

document.querySelector('.close').addEventListener('click', () => {
    lightbox.style.display = 'none';
});

function changeImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }

    lightboxImg.src = images[currentImageIndex].src;
}
