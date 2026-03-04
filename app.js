// ============================================
//  מרפאת צעירים — Application Logic
// ============================================

// --- State ---
const state = {
  selectedStage: null,
  selectedDiagnosis: null,
  selectedNeed: null,
};

// --- Page Navigation ---
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target page
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Reset onboarding steps when re-entering
  if (pageId === 'onboarding') {
    showOnboardingStep(1);
  }
}

// --- Stage Navigation (from home cards) ---
function showStage(stageId) {
  showPage('stages');
  setTimeout(() => {
    const tab = document.querySelector(`[onclick="showStageTab('${stageId}', this)"]`);
    if (tab) showStageTab(stageId, tab);
  }, 100);
}

// --- Stage Tabs ---
function showStageTab(stageId, btn) {
  // Update tabs
  document.querySelectorAll('.stage-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  // Update content
  document.querySelectorAll('.stage-content').forEach(c => c.classList.remove('active'));
  const content = document.getElementById('stage-' + stageId);
  if (content) content.classList.add('active');
}

// --- Diagnosis Info Toggle ---
function showDiag(diagId) {
  // Toggle content
  const content = document.getElementById('diag-' + diagId);
  const isOpen = !content.classList.contains('hidden');

  // Hide all diag contents
  document.querySelectorAll('.diag-content').forEach(c => c.classList.add('hidden'));
  document.querySelectorAll('.diag-btn').forEach(b => b.classList.remove('active'));

  if (!isOpen) {
    content.classList.remove('hidden');
    event.target.classList.add('active');
  }
}

// --- Accordion ---
function toggleAccordion(header) {
  const item = header.parentElement;
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));

  // Open clicked if it was closed
  if (!isOpen) {
    item.classList.add('open');
  }
}

// --- Onboarding ---
function showOnboardingStep(stepNum) {
  document.querySelectorAll('.onboard-step').forEach(s => s.classList.add('hidden'));
  const step = document.getElementById('step-' + stepNum);
  if (step) step.classList.remove('hidden');
}

function nextStep(stepNum) {
  showOnboardingStep(stepNum);
}

function selectStage(stage) {
  state.selectedStage = stage;
  document.querySelectorAll('#step-1 .onboard-option').forEach(o => o.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
}

function selectDiagnosis(diagnosis) {
  state.selectedDiagnosis = diagnosis;
  document.querySelectorAll('#step-2 .onboard-option').forEach(o => o.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
}

function selectNeed(need) {
  state.selectedNeed = need;
  document.querySelectorAll('#step-3 .onboard-option').forEach(o => o.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
}

function showPersonalized() {
  // Navigate based on selection
  const needMap = {
    fertility: 'youngTopics',
    sexuality: 'youngTopics',
    cognitive: 'youngTopics',
    community: 'community',
  };

  const target = state.selectedNeed
    ? (needMap[state.selectedNeed] || 'stages')
    : 'stages';

  showPage(target);

  // If going to stages, show correct tab
  if (target === 'stages' && state.selectedStage) {
    setTimeout(() => {
      const tab = document.querySelector(`.stage-tab:nth-child(${getStageIndex(state.selectedStage)})`);
      if (tab) showStageTab(state.selectedStage, tab);
    }, 150);
  }

  // If going to youngTopics, open relevant accordion
  if (target === 'youngTopics' && state.selectedNeed) {
    setTimeout(() => openNeedAccordion(state.selectedNeed), 300);
  }
}

function getStageIndex(stage) {
  const map = { new: 1, treatment: 2, recovery: 3 };
  return map[stage] || 1;
}

function openNeedAccordion(need) {
  const needIndexMap = {
    fertility: 0,
    sexuality: 1,
    cognitive: 3,
  };
  const idx = needIndexMap[need];
  if (idx !== undefined) {
    const headers = document.querySelectorAll('.accordion-header');
    if (headers[idx]) {
      const item = headers[idx].parentElement;
      item.classList.add('open');
      item.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

// --- Contact Form ---
function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  form.classList.add('hidden');
  document.getElementById('formSuccess').classList.remove('hidden');
}

// --- Mobile Menu ---
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

// --- Nav Scroll Effect ---
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// --- Logo Click ---
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.nav-logo');
  if (logo) logo.addEventListener('click', () => showPage('home'));
});
