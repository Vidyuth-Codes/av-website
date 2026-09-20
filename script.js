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
