// ═══════════════════════════════════
// AUTHENTICATION & DATA MANAGEMENT
// ═══════════════════════════════════

// Data Store
let candidates = [];
let currentStep = 1;

// Nigerian States
const NIGERIAN_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT (Abuja)','Gombe',
  'Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos',
  'Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto',
  'Taraba','Yobe','Zamfara'
];

// Institutions
const INSTITUTIONS = [
  'University of Lagos (UNILAG)','University of Ibadan (UI)','Obafemi Awolowo University (OAU)',
  'University of Nigeria Nsukka (UNN)','Ahmadu Bello University (ABU)','University of Benin (UNIBEN)',
  'Lagos State University (LASU)','University of Ilorin (UNILORIN)','Federal University of Technology Akure (FUTA)',
  'Nnamdi Azikiwe University (UNIZIK)','Bayero University Kano (BUK)','University of Jos (UNIJOS)',
  'University of Port Harcourt (UNIPORT)','Covenant University','Pan-Atlantic University',
  'American University of Nigeria','Babcock University','Landmark University'
];

// Authentication Functions
function getCurrentUser() {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
}

function logout() {
  localStorage.removeItem('currentUser');
  showToast('Logged out successfully', 'success');
  window.location.href = 'login.html';
}

function checkAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function updateUserProgress(candidate) {
  const index = candidates.findIndex(c => c.regNo === candidate.regNo);
  if (index !== -1) {
    candidates[index] = { ...candidates[index], ...candidate };
    saveData();
    
    // Update current user in localStorage
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.regNo === candidate.regNo) {
      localStorage.setItem('currentUser', JSON.stringify(candidates[index]));
    }
  }
}

// Helper Functions
function showToast(msg, type = 'success') {
  const colors = {
    success: { bg: '#0A2010', border: '#1A4020', text: '#4CAF50', icon: '✓' },
    warn: { bg: '#2A1A00', border: '#4A3500', text: '#D4A017', icon: '⚠' },
    error: { bg: '#2A0A0A', border: '#4A1A1A', text: '#E24B4A', icon: '✕' }
  };
  const c = colors[type] || colors.success;
  const div = document.createElement('div');
  div.className = 'toast rounded-xl px-5 py-3 flex items-center gap-3 text-sm max-w-xs';
  div.style.cssText = `background:${c.bg}; border:1px solid ${c.border}; color:${c.text};`;
  div.innerHTML = `<span class="font-bold">${c.icon}</span><span>${msg}</span>`;
  document.getElementById('toast-container').appendChild(div);
  setTimeout(() => div.remove(), 3200);
}

function updateStatCount() {
  const el = document.getElementById('stat-count');
  if (el) el.textContent = candidates.length.toLocaleString();
}

function generateRegNumber() {
  return 'JAMB' + Date.now().toString().slice(-8) + Math.random().toString(36).slice(2,4).toUpperCase();
}

// Save/Load from localStorage
function saveData() {
  localStorage.setItem('jambCandidates', JSON.stringify(candidates));
}

function loadData() {
  const saved = localStorage.getItem('jambCandidates');
  if (saved) {
    candidates = JSON.parse(saved);
  }
}

// Initialize on load
loadData();
