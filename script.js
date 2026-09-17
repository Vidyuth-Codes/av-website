const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('nav-open');
});

const approachSteps = document.querySelector('.approach-steps');
const clearActiveStep = () => document.querySelectorAll('.approach-steps li').forEach((item) => item.classList.remove('is-active'));

document.querySelectorAll('.approach-steps li').forEach((step) => {
  const activate = () => {
    clearActiveStep();
    step.classList.add('is-active');
  };
  step.addEventListener('click', activate);
  step.addEventListener('mouseenter', activate);
  step.addEventListener('focus', activate);
});

approachSteps?.addEventListener('mouseleave', clearActiveStep);

const projectGrid = document.querySelector('.project-grid');
const projects = projectGrid ? [...projectGrid.querySelectorAll('.project')] : [];
let activeProject = 0;
let projectTimer;
const slideCurrent = document.querySelector('.slide-current');

const renderProjectCarousel = (direction = 1) => {
  if (!projectGrid) return;
  projectGrid.dataset.direction = direction > 0 ? 'next' : 'previous';
  const total = projects.length;
  projects.forEach((project, index) => {
    project.classList.toggle('is-selected', index === activeProject);
  });
  slideCurrent.textContent = String(activeProject + 1).padStart(2, '0');
};

const moveProjectSlide = (direction) => {
  activeProject = (activeProject + direction + projects.length) % projects.length;
  renderProjectCarousel(direction);
  clearInterval(projectTimer);
  projectTimer = setInterval(() => moveProjectSlide(1), 5000);
};

projects.forEach((project) => {
  const selectProject = () => {
    activeProject = Number(project.dataset.project);
    renderProjectCarousel(1);
    clearInterval(projectTimer);
    projectTimer = setInterval(() => moveProjectSlide(1), 5000);
  };
  project.addEventListener('click', (event) => {
    event.preventDefault();
    selectProject();
  });
  project.addEventListener('focus', selectProject);
});

document.querySelectorAll('.slide-arrow').forEach((button) => {
  button.addEventListener('click', () => {
    moveProjectSlide(button.classList.contains('slide-next') ? 1 : -1);
  });
});

renderProjectCarousel();
projectTimer = setInterval(() => moveProjectSlide(1), 5000);
