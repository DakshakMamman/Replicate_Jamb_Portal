// ═══════════════════════════════════
// REGISTRATION FUNCTIONALITY
// ═══════════════════════════════════

let selectedSubjects = ['Use of English']; // compulsory locked in

// Initialize registration form
function initRegistration() {
  // Populate states
  const stateSelect = document.getElementById('stateOrigin');
  if (stateSelect) {
    NIGERIAN_STATES.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s; 
      opt.textContent = s;
      stateSelect.appendChild(opt);
    });
  }

  // Populate exam towns (reuse states)
  const examTownSel = document.getElementById('examTown');
  if (examTownSel) {
    NIGERIAN_STATES.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s; 
      opt.textContent = s;
      examTownSel.appendChild(opt);
    });
  }

  // Populate institutions
  const instSel = document.getElementById('institution');
  if (instSel) {
    INSTITUTIONS.forEach(i => {
      const opt = document.createElement('option');
      opt.value = i; 
      opt.textContent = i;
      instSel.appendChild(opt);
    });
  }

  renderSubjectGrid();
}

// Step Management
function goToStep(n) {
  [1,2,3,4].forEach(i => {
    document.getElementById('step-' + i).classList.add('hidden');
    const dot = document.getElementById('step' + i + '-dot');
    const label = document.getElementById('step' + i + '-label');
    if (i < n) {
      dot.style.background = '#4CAF50'; 
      dot.style.color = '#fff';
      label.style.color = '#4CAF50';
    } else if (i === n) {
      dot.style.background = '#C8601A'; 
      dot.style.color = '#F5EDD6';
      label.style.color = '#C8601A';
    } else {
      dot.style.background = '#3D2B1F'; 
      dot.style.color = '#6B5A3E';
      label.style.color = '#6B5A3E';
    }
  });
  document.getElementById('step-' + n).classList.remove('hidden');
  document.getElementById('progress-bar').style.width = (n * 25) + '%';
  currentStep = n;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep(n) {
  if (n > currentStep && !validateStep(currentStep)) return;
  if (n === 4) buildReview();
  goToStep(n);
}

// Validation
function validateStep(step) {
  const required = {
    1: ['firstName','lastName','dob','gender','phone','email','stateOrigin','lga'],
    2: ['institution','course','examTown','olevel','examYear'],
    3: null
  };
  if (step === 3) {
    if (selectedSubjects.length < 4) {
      showToast('Select exactly 4 subjects (3 more beside English)', 'warn');
      return false;
    }
    return true;
  }
  const fields = required[step];
  if (!fields) return true;
  for (const id of fields) {
    const el = document.getElementById(id);
    if (!el || !el.value.trim()) {
      showToast('Please fill in all required fields', 'warn');
      el && el.focus();
      el && (el.style.borderColor = '#C8601A');
      setTimeout(() => el && (el.style.borderColor = '#3D2B1F'), 2000);
      return false;
    }
  }
  // Email validation
  if (step === 1) {
    const email = document.getElementById('email').value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address', 'warn');
      return false;
    }
  }
  return true;
}

// Subject Selection
function renderSubjectGrid() {
  const grid = document.getElementById('subjects-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  SUBJECTS.forEach(sub => {
    const isSelected = selectedSubjects.includes(sub.name);
    const maxReached = selectedSubjects.length >= 4 && !isSelected;
    const div = document.createElement('div');
    div.className = `subject-card rounded-xl p-4 border cursor-pointer${isSelected ? ' selected' : ''}${maxReached ? ' disabled' : ''}`;
    div.style.cssText = `background:${isSelected ? '#2A1205' : '#1A1208'}; border-color:${isSelected ? '#C8601A' : '#3D2B1F'};`;
    div.innerHTML = `
      <div class="flex items-start justify-between mb-2">
        <span class="text-2xl">${sub.icon}</span>
        <div class="w-5 h-5 rounded border flex items-center justify-center flex-shrink-0" style="border-color:${isSelected ? '#C8601A' : '#3D2B1F'}; background:${isSelected ? '#C8601A' : 'transparent'};">
          ${isSelected ? '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}
        </div>
      </div>
      <div class="bebas tracking-wider text-sm" style="color:${isSelected ? '#D4A017' : '#F5EDD6'}; line-height:1.2;">${sub.name.toUpperCase()}</div>
      <div class="text-xs mt-1" style="color:#5C4030;">${sub.group}</div>
    `;
    if (!maxReached) {
      div.onclick = () => toggleSubject(sub.name);
    }
    grid.appendChild(div);
  });
  updateSubjectPips();
}

function toggleSubject(name) {
  if (selectedSubjects.includes(name)) {
    selectedSubjects = selectedSubjects.filter(s => s !== name);
  } else {
    if (selectedSubjects.length >= 4) return;
    selectedSubjects.push(name);
  }
  renderSubjectGrid();
}

function updateSubjectPips() {
  [1,2,3,4].forEach(i => {
    const pip = document.getElementById('pip' + i);
    if (pip) {
      pip.style.background = i <= selectedSubjects.length ? '#C8601A' : '#3D2B1F';
    }
  });
  const textEl = document.getElementById('subject-count-text');
  if (textEl) {
    textEl.textContent = `${selectedSubjects.length} of 4 selected${selectedSubjects.length === 4 ? ' ✓' : ''}`;
  }
}

// Review
function buildReview() {
  const get = id => document.getElementById(id)?.value || '';
  const data = {
    firstName: get('firstName'), 
    lastName: get('lastName'), 
    middleName: get('middleName'),
    dob: get('dob'), 
    gender: get('gender'), 
    phone: get('phone'), 
    email: get('email'),
    stateOrigin: get('stateOrigin'), 
    lga: get('lga'),
    institution: get('institution'), 
    course: get('course'),
    examTown: get('examTown'), 
    olevel: get('olevel'), 
    examYear: get('examYear'),
    subjects: [...selectedSubjects]
  };

  const row = (label, value) => `
    <div class="flex justify-between py-2 border-b" style="border-color:#2A1A05;">
      <span class="text-xs tracking-wider uppercase" style="color:#5C4030;">${label}</span>
      <span class="text-sm font-semibold" style="color:#F5EDD6;">${value || '—'}</span>
    </div>`;

  const reviewContent = document.getElementById('review-content');
  if (reviewContent) {
    reviewContent.innerHTML = `
      <h3 class="bebas tracking-widest text-lg mb-4" style="color:#D4A017;">PERSONAL INFORMATION</h3>
      ${row('Full Name', `${data.firstName} ${data.middleName} ${data.lastName}`)}
      ${row('Date of Birth', data.dob)} ${row('Gender', data.gender)}
      ${row('Phone', data.phone)} ${row('Email', data.email)}
      ${row('State of Origin', data.stateOrigin)} ${row('LGA', data.lga)}
      <h3 class="bebas tracking-widest text-lg mt-6 mb-4" style="color:#D4A017;">ACADEMIC DETAILS</h3>
      ${row('Institution', data.institution)} ${row('Course', data.course)}
      ${row('Exam Town', data.examTown)} ${row('O\'Level', `${data.olevel} (${data.examYear})`)}
      <h3 class="bebas tracking-widest text-lg mt-6 mb-4" style="color:#D4A017;">SELECTED SUBJECTS</h3>
      <div class="flex flex-wrap gap-2 mt-1">
        ${data.subjects.map(s => `<span class="px-3 py-1 rounded-full text-xs bebas tracking-wider" style="background:#2A1205; color:#D4A017; border:1px solid #C8601A;">${s}</span>`).join('')}
      </div>
    `;
    window._reviewData = data;
  }
}

// Submit Registration
function submitRegistration() {
  const data = window._reviewData;
  const regNo = generateRegNumber();
  const candidate = {
    regNo,
    firstName: data.firstName,
    lastName: data.lastName,
    middleName: data.middleName,
    fullName: `${data.firstName} ${data.lastName}`,
    dob: data.dob,
    gender: data.gender,
    phone: data.phone,
    email: data.email,
    stateOrigin: data.stateOrigin,
    lga: data.lga,
    institution: data.institution,
    course: data.course,
    examTown: data.examTown,
    olevel: data.olevel,
    examYear: data.examYear,
    subjects: data.subjects,
    registeredAt: new Date().toLocaleString('en-NG')
  };
  candidates.push(candidate);
  saveData();
  showToast(`Registration successful! Reg No: ${regNo}`, 'success');
  updateStatCount();
  
  // Auto-login after registration
  localStorage.setItem('currentUser', JSON.stringify(candidate));
  showToast(`Welcome, ${candidate.firstName}! You are now logged in.`, 'success');
  
  // Redirect to exam after successful registration
  setTimeout(() => {
    window.location.href = 'exam.html';
  }, 1500);
}

// Reset form
function resetForm() {
  ['firstName','lastName','middleName','dob','gender','phone','email','stateOrigin','lga',
   'institution','course','examTown','olevel','examYear'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  selectedSubjects = ['Use of English'];
  renderSubjectGrid();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initRegistration);
