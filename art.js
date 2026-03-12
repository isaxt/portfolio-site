const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

let currentIndex = 0;

galleryImages.forEach((img, index)=>{

img.addEventListener("click", ()=>{

currentIndex = index;

lightbox.classList.add("active");
lightboxImg.src = img.src;

});

});


lightbox.addEventListener("click", ()=>{

lightbox.classList.remove("active");

});


document.addEventListener("keydown", (e)=>{

if(!lightbox.classList.contains("active")) return;

if(e.key === "ArrowRight"){

currentIndex = (currentIndex + 1) % galleryImages.length;
lightboxImg.src = galleryImages[currentIndex].src;

}

if(e.key === "ArrowLeft"){

currentIndex =
(currentIndex - 1 + galleryImages.length) % galleryImages.length;

lightboxImg.src = galleryImages[currentIndex].src;

}

if(e.key === "Escape"){

lightbox.classList.remove("active");

}

});