// ============================================
// UNDANGAN PERNIKAHAN — SCRIPT
// ============================================

// --- Loading Screen ---
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('gone');
    setTimeout(() => loader.style.display = 'none', 500);
  }, 800);
});

// --- Buka Undangan ---
const btnOpen = document.getElementById('btn-open');
const cover = document.getElementById('cover');
const mainContent = document.getElementById('main-content');
const music = document.getElementById('bg-music');
music.volume = 0.3; // Batasi volume agar tidak terlalu keras
const musicBtn = document.getElementById('music-control');
const floatingNav = document.getElementById('floating-nav');

btnOpen.addEventListener('click', () => {
  cover.style.transform = 'translateY(-100%)';
  cover.style.opacity = '0';

  mainContent.classList.remove('hidden');
  musicBtn.classList.remove('hidden');
  floatingNav.classList.remove('hidden');

  music.play().catch(() => { });
  musicBtn.classList.add('playing');

  initPetals();
  setTimeout(checkAnimations, 150);

  setTimeout(() => cover.style.display = 'none', 1000);
});

// --- Music ---
musicBtn.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    musicBtn.classList.add('playing');
  } else {
    music.pause();
    musicBtn.classList.remove('playing');
  }
});

// --- Countdown ---
const targetDate = new Date('Jun 09, 2026 08:00:00').getTime();

function tick() {
  const now = Date.now();
  const d = targetDate - now;

  if (d < 0) {
    document.querySelector('.timer').innerHTML = '<p style="width:100%;text-align:center;color:var(--sage)">Acara Sedang Berlangsung!</p>';
    return;
  }

  const days = Math.floor(d / 86400000);
  const hrs = Math.floor((d % 86400000) / 3600000);
  const mins = Math.floor((d % 3600000) / 60000);
  const secs = Math.floor((d % 60000) / 1000);

  const pad = n => n < 10 ? '0' + n : n;

  document.getElementById('days').textContent = pad(days);
  document.getElementById('hours').textContent = pad(hrs);
  document.getElementById('minutes').textContent = pad(mins);
  document.getElementById('seconds').textContent = pad(secs);
}

tick();
setInterval(tick, 1000);

// --- Gallery ---
const galleryBox = document.getElementById('gallery-container');
const images = [
  'IMG_2290.png',
  'IMG_2310.png',
  'IMG_2307.png'
];
images.forEach((url, idx) => {
  const div = document.createElement('div');
  div.className = 'gal-item';
  div.innerHTML = `<img src="${url}" alt="Prewedding ${idx + 1}" loading="lazy" onclick="openLightbox('${url}')">`;
  galleryBox.appendChild(div);
});

// --- Lightbox ---
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');

function openLightbox(src) {
  lightbox.style.display = 'flex';
  lbImg.src = src;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});



// --- Petals ---
function initPetals() {
  const box = document.getElementById('petals-container');
  const colors = ['rgba(212,166,154,0.35)', 'rgba(168,184,156,0.3)', 'rgba(235,228,214,0.35)'];

  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.width = (Math.random() * 10 + 8) + 'px';
    p.style.height = (Math.random() * 10 + 8) + 'px';
    p.style.background = colors[Math.floor(Math.random() * 3)];
    p.style.animationDuration = (Math.random() * 5 + 6) + 's';
    p.style.animationDelay = (Math.random() * 7) + 's';
    box.appendChild(p);
  }
}

// --- Scroll Animation ---
function checkAnimations() {
  document.querySelectorAll('.anim-up:not(.show)').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 60) {
      el.classList.add('show');
    }
  });
}

window.addEventListener('scroll', () => {
  checkAnimations();
  updateNav();
});

// --- Active Nav ---
function updateNav() {
  let current = '';
  document.querySelectorAll('section[id]').forEach(sec => {
    if (window.pageYOffset >= sec.offsetTop - 200) {
      current = sec.id;
    }
  });
  document.querySelectorAll('.nav-dot').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href').includes(current));
  });
}

// --- Smooth Scroll ---
document.querySelectorAll('.nav-dot').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Init
