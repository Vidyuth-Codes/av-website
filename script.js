// Header: solid/blurred background once the page has scrolled.
const header = document.getElementById('siteHeader');
const onScroll = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 24);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile nav: hamburger toggle, backdrop, and closing on link click.
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const navScrim = document.getElementById('navScrim');

const setMenu = (open) => {
  menuBtn?.classList.toggle('is-open', open);
  menuBtn?.setAttribute('aria-expanded', String(open));
  navLinks?.classList.toggle('is-open', open);
  navScrim?.classList.toggle('is-open', open);
};

menuBtn?.addEventListener('click', () => {
  const open = menuBtn.getAttribute('aria-expanded') === 'true';
  setMenu(!open);
});
navScrim?.addEventListener('click', () => setMenu(false));
navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

// Scroll-reveal: fade/slide sections and the project cards in as they enter view.
const revealTargets = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );
  revealTargets.forEach((el) => io.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}

// Approach steps: click to pin one open (in addition to the CSS hover reveal);
// everything starts closed.
const stepper = document.getElementById('stepper');
stepper?.querySelectorAll('.step').forEach((step) => {
  step.addEventListener('click', () => {
    const alreadyActive = step.classList.contains('is-active');
    stepper.querySelectorAll('.step').forEach((s) => s.classList.remove('is-active'));
    if (!alreadyActive) step.classList.add('is-active');
  });
});

// 3D render / completed-home comparison slider — moved only via the small
// yellow "Move" handle on the range control below the image.
const compareRange = document.getElementById('compareRange');
const compareAfter = document.querySelector('.compare-after');
const compareRangeThumb = document.getElementById('compareRangeThumb');

const setCompare = (value) => {
  const v = Math.max(0, Math.min(100, value));
  if (compareAfter) compareAfter.style.clipPath = `inset(0 0 0 ${v}%)`;
  if (compareRangeThumb) compareRangeThumb.style.left = `${v}%`;
  if (compareRange) compareRange.value = v;
};

compareRange?.addEventListener('input', (e) => setCompare(Number(e.target.value)));
if (compareRange) setCompare(Number(compareRange.value));

// Selected work: desktop paging via arrow buttons (one card at a time), no
// free-drag scrolling — the container itself stays non-scrollable on desktop
// (mobile keeps native touch-swipe instead, see CSS).
const workBento = document.getElementById('workBento');
const workPrev = document.getElementById('workPrev');
const workNext = document.getElementById('workNext');

const workCardStep = () => {
  const card = workBento?.querySelector('.card');
  if (!card || !workBento) return 0;
  const gap = parseFloat(getComputedStyle(workBento).columnGap || getComputedStyle(workBento).gap || '0');
  return card.getBoundingClientRect().width + gap;
};

const updateWorkArrows = () => {
  if (!workBento) return;
  const max = workBento.scrollWidth - workBento.clientWidth;
  if (workPrev) workPrev.disabled = workBento.scrollLeft <= 2;
  if (workNext) workNext.disabled = workBento.scrollLeft >= max - 2;
};

workPrev?.addEventListener('click', () => {
  workBento.scrollBy({ left: -workCardStep(), behavior: 'smooth' });
});
workNext?.addEventListener('click', () => {
  workBento.scrollBy({ left: workCardStep(), behavior: 'smooth' });
});
workBento?.addEventListener('scroll', updateWorkArrows, { passive: true });
window.addEventListener('resize', updateWorkArrows);
updateWorkArrows();

// Enquiry form: build a mailto with the submitted details (no backend required).
const enquiryForm = document.getElementById('enquiryForm');
enquiryForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(enquiryForm);
  const get = (key) => (data.get(key) || '').toString().trim();
  const lines = [
    `Name: ${get('name')}`,
    `Phone: ${get('phone')}`,
    `Location: ${get('location')}`,
    `Plot size: ${get('plot')}`,
    `Project type: ${get('type')}`,
    `Requirements: ${get('requirements')}`,
    `Message: ${get('message')}`,
  ];
  const subject = encodeURIComponent(`New project enquiry — ${get('name') || 'Website'}`);
  const body = encodeURIComponent(lines.join('\n'));
  window.location.href = `mailto:vidyuthrajeshofficial@gmail.com?subject=${subject}&body=${body}`;
});

// Lightbox for the "concept visualisations" thumbnail strip.
const conceptThumbs = Array.from(document.querySelectorAll('#conceptThumbs .concept-thumb'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let lightboxIndex = 0;

const showLightboxImage = (index) => {
  if (!conceptThumbs.length) return;
  lightboxIndex = (index + conceptThumbs.length) % conceptThumbs.length;
  const img = conceptThumbs[lightboxIndex].querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
};

const openLightbox = (index) => {
  showLightboxImage(index);
  lightbox?.classList.add('is-open');
};

const closeLightbox = () => lightbox?.classList.remove('is-open');

conceptThumbs.forEach((thumb, index) => {
  thumb.addEventListener('click', () => openLightbox(index));
});
lightboxClose?.addEventListener('click', closeLightbox);
lightboxPrev?.addEventListener('click', () => showLightboxImage(lightboxIndex - 1));
lightboxNext?.addEventListener('click', () => showLightboxImage(lightboxIndex + 1));
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
window.addEventListener('keydown', (e) => {
  if (!lightbox?.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showLightboxImage(lightboxIndex - 1);
  if (e.key === 'ArrowRight') showLightboxImage(lightboxIndex + 1);
});
