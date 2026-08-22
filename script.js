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
projectGrid?.querySelectorAll('.project').forEach((project) => {
  const selectProject = () => {
    projectGrid.classList.remove('project-one', 'project-two', 'project-three');
    projectGrid.classList.add(`project-${project.dataset.project}`);
  };
  project.addEventListener('click', (event) => {
    event.preventDefault();
    selectProject();
  });
  project.addEventListener('focus', selectProject);
});
