// Hide scroll hint on first scroll
window.addEventListener('scroll', () => {
  document.getElementById('scrollHint').style.opacity = 0;
}, { passive: true, once: true });

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('nav a');

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

// ── Perimeter assets around hero image ──
const assets = ['arduino.png', 'ipod.png', 'meta_headset.png', 'old_mac.png', 'projector.png'];

// Evenly spaced positions around the perimeter (angle in degrees)
const positions = [0, 72, 144, 216, 288];

let revealedCount = 0;
const spawnedIcons = [];

function spawnAsset(index) {
const heroImage = document.querySelector('.image-wrapper');
  if (!heroImage) return;

  const img = document.createElement('img');
  img.src = `photos/${assets[index]}`;
  img.classList.add('perimeter-asset');

  // Convert angle to x/y offset around the image
  const angleDeg = positions[index];
  const angleRad = (angleDeg - 90) * (Math.PI / 180); // start from top
const rx = 55; // push beyond edge horizontally
const ry = 55; // push beyond edge vertically

  const x = 50 + rx * Math.cos(angleRad);
  const y = 50 + ry * Math.sin(angleRad);

  img.style.left = `${x}%`;
  img.style.top = `${y}%`;

  heroImage.appendChild(img);
  spawnedIcons.push(img);

  // Trigger fade-in on next frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => img.classList.add('visible'));
  });
}

// Reveal one asset per second
const spawnInterval = setInterval(() => {
  if (revealedCount < assets.length) {
    spawnAsset(revealedCount);
    revealedCount++;
  } else {
    clearInterval(spawnInterval);
  }
}, 1000);