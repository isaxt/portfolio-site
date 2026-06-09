/* ═══════════════════════════════════════════
   Isabella Tedesco Portfolio — script.js
   Shared across index.html, art.html, about.html
   ═══════════════════════════════════════════ */
 
/* ── Scroll hint (index.html only) ── */
const scrollHint = document.getElementById('scrollHint');
if (scrollHint) {
    window.addEventListener('scroll', () => {
        scrollHint.style.opacity = 0;
    }, { passive: true, once: true });
}
 
/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
 
/* ── Active nav link on scroll (index.html only) ── */
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks  = document.querySelectorAll('nav a');
 
if (sections.length) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.4 });
 
    sections.forEach(s => observer.observe(s));
}
 
/* ── Lightbox (art.html only) ── */
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
 
if (lightbox && lightboxImg) {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    let currentIndex = 0;
 
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            lightbox.classList.add('active');
            lightboxImg.src = img.src;
        });
    });
 
    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
 
    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('active')) return;
 
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            lightboxImg.src = galleryImages[currentIndex].src;
        }
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            lightboxImg.src = galleryImages[currentIndex].src;
        }
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        }
    });
}
 
/* ── Perimeter floating icons around hero image (index.html only) ── */
const imageWrapper = document.querySelector('.image-wrapper');
 
if (imageWrapper) {
    const assets    = ['arduino.png', 'ipod.png', 'meta_headset.png', 'old_mac.png', 'projector.png'];
    const positions = [0, 72, 144, 216, 288]; // degrees, evenly spaced
 
    let revealedCount = 0;
 
    function spawnAsset(index) {
        const img = document.createElement('img');
        img.src = `photos/${assets[index]}`;
        img.classList.add('perimeter-asset');
 
        const angleDeg = positions[index];
        const angleRad = (angleDeg - 90) * (Math.PI / 180);
        const rx = 55;
        const ry = 55;
        const x = 50 + rx * Math.cos(angleRad);
        const y = 50 + ry * Math.sin(angleRad);
 
        img.style.left = `${x}%`;
        img.style.top  = `${y}%`;
 
        imageWrapper.appendChild(img);
 
        requestAnimationFrame(() => {
            requestAnimationFrame(() => img.classList.add('visible'));
        });
    }
 
    const spawnInterval = setInterval(() => {
        if (revealedCount < assets.length) {
            spawnAsset(revealedCount);
            revealedCount++;
        } else {
            clearInterval(spawnInterval);
        }
    }, 1000);
}