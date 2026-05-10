/* ────────────────────────────────────────────────────────────────────────────
   Portfolio Frontend Logic
   ──────────────────────────────────────────────────────────────────────────── */

// Configuration
const API_BASE_URL = 'http://localhost:3000/api';
const PROJECTS_ENDPOINT = `${API_BASE_URL}/projects`;
const MESSAGES_ENDPOINT = `${API_BASE_URL}/messages`;

// DOM Elements
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');
const projectGrid = document.getElementById('projectGrid');
const projectFilters = document.querySelectorAll('.filter-btn');
const projectEmpty = document.getElementById('projectEmpty');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');

// State
let projectsData = [];
let currentFilter = '';

/* ──────────────────── Navigation ──────────────────── */
function initializeNavigation() {
  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Close menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });

  // Close menu on scroll
  window.addEventListener('scroll', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
    }
  });
}

/* ──────────────────── Projects Section ──────────────────── */
async function fetchProjects() {
  try {
    const url = currentFilter ? `${PROJECTS_ENDPOINT}?category=${currentFilter}` : PROJECTS_ENDPOINT;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    const result = await response.json();
    projectsData = result.data || [];
    renderProjects();
  } catch (err) {
    console.error('Error fetching projects:', err);
    projectEmpty.textContent = 'Error loading projects. Please try again later.';
    projectEmpty.hidden = false;
  }
}

function renderProjects() {
  if (projectsData.length === 0) {
    projectGrid.innerHTML = '';
    projectEmpty.textContent = currentFilter
      ? `No projects found in the "${currentFilter}" category.`
      : 'No projects available yet.';
    projectEmpty.hidden = false;
    return;
  }

  projectEmpty.hidden = true;
  projectGrid.innerHTML = projectsData.map(project => createProjectCard(project)).join('');
}

function createProjectCard(project) {
  const tagsList = (project.tags || []).map(tag => `<li class="project-tag">${escapeHtml(tag)}</li>`).join('');

  let linksHTML = '';
  if (project.liveUrl) {
    linksHTML += `<a href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer" class="project-link">View Live</a>`;
  }
  if (project.repoUrl) {
    linksHTML += `<a href="${escapeHtml(project.repoUrl)}" target="_blank" rel="noopener noreferrer" class="project-link">Repository</a>`;
  }

  return `
    <div class="project-card">
      <div class="project-image">
        ${project.imageUrl ? `<img src="${escapeHtml(project.imageUrl)}" alt="${escapeHtml(project.title)}" loading="lazy" />` : '<span>Image</span>'}
      </div>
      <div class="project-content">
        <span class="project-category">${escapeHtml(project.category)}</span>
        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        <p class="project-description">${escapeHtml(project.description)}</p>
        ${tagsList ? `<ul class="project-tags">${tagsList}</ul>` : ''}
        ${linksHTML ? `<div class="project-links">${linksHTML}</div>` : ''}
      </div>
    </div>
  `;
}

function initializeProjectFilters() {
  projectFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.category;
      fetchProjects();
    });
  });

  // Load initial projects
  fetchProjects();
}

/* ──────────────────── Contact Form ──────────────────── */
function initializeContactForm() {
  contactForm.addEventListener('submit', handleFormSubmit);

  // Real-time validation
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', validateField);
  });
}

function validateField(event) {
  const field = event.target;
  const errorElement = document.getElementById(`${field.name}Error`);

  if (!errorElement) return;

  let error = '';

  if (field.name === 'name') {
    if (!field.value.trim()) {
      error = 'Name is required';
    } else if (field.value.trim().length < 2) {
      error = 'Name must be at least 2 characters';
    }
  } else if (field.name === 'email') {
    if (!field.value.trim()) {
      error = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(field.value)) {
      error = 'Please enter a valid email';
    }
  } else if (field.name === 'body') {
    if (!field.value.trim()) {
      error = 'Message is required';
    } else if (field.value.trim().length < 10) {
      error = 'Message must be at least 10 characters';
    }
  }

  errorElement.textContent = error;
  field.classList.toggle('error', !!error);

  return !error;
}

async function handleFormSubmit(event) {
  event.preventDefault();

  // Validate all fields
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const bodyInput = document.getElementById('body');

  const isNameValid = validateField({ target: nameInput });
  const isEmailValid = validateField({ target: emailInput });
  const isBodyValid = validateField({ target: bodyInput });

  if (!isNameValid || !isEmailValid || !isBodyValid) {
    return;
  }

  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnSpinner = submitBtn.querySelector('.btn-spinner');
  const formFeedback = document.getElementById('formFeedback');

  // Disable button and show loader
  submitBtn.disabled = true;
  btnText.hidden = true;
  btnSpinner.hidden = false;
  formFeedback.hidden = true;

  try {
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      subject: document.getElementById('subject').value.trim(),
      body: bodyInput.value.trim(),
    };

    const response = await fetch(MESSAGES_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.error || 'Failed to send message');
    }

    // Success
    formFeedback.className = 'form-feedback success';
    formFeedback.textContent = 'Message sent successfully! Thank you for reaching out.';
    formFeedback.hidden = false;

    // Reset form
    contactForm.reset();
    document.querySelectorAll('.form-error').forEach(el => (el.textContent = ''));
    document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));
  } catch (err) {
    console.error('Error sending message:', err);
    formFeedback.className = 'form-feedback error';
    formFeedback.textContent = err.message || 'Failed to send message. Please try again.';
    formFeedback.hidden = false;
  } finally {
    // Re-enable button
    submitBtn.disabled = false;
    btnText.hidden = false;
    btnSpinner.hidden = true;
  }
}

/* ──────────────────── Utilities ──────────────────── */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* ──────────────────── Initialize ──────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  currentYearSpan.textContent = new Date().getFullYear();

  // Initialize sections
  initializeNavigation();
  initializeProjectFilters();
  initializeContactForm();
});

/* ──────────────────── Smooth Scroll Behavior ──────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80; // Nav height
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  });
});

/* ──────────────────── API Base URL Config ──────────────────── */
// For development/production, you can override API_BASE_URL
// Example: window.API_BASE_URL = 'https://api.yourdomain.com/api'
if (window.API_BASE_URL) {
  // Use global override if provided
}
