// ═══════════════════════════════════
// EXAM FUNCTIONALITY - SUBJECT BY SUBJECT
// ═══════════════════════════════════

// Exam State
let currentExamState = {
  currentSubject: 0,
  currentQuestion: 0,
  answers: {},
  startTime: null,
  endTime: null,
  timerInterval: null,
  subjects: [],
  examCandidate: null,
  selectedStartingSubject: 0
};

// Start Exam
function startExam() {
  // Check if user is authenticated
  if (!checkAuth()) return;
  
  currentExamState.examCandidate = getCurrentUser();
  
  // Reset exam state
  currentExamState.currentSubject = currentExamState.selectedStartingSubject;
  currentExamState.currentQuestion = 0;
  currentExamState.answers = {};
  currentExamState.startTime = new Date();
  
  // Generate exam questions based on candidate's subjects
  currentExamState.subjects = generateSubjectQuestions(currentExamState.examCandidate.subjects);
  
  // Show exam progress, hide start screen
  document.getElementById('exam-start').classList.add('hidden');
  document.getElementById('exam-progress').classList.remove('hidden');
  
  // Initialize subject tabs
  renderSubjectTabs();
  
  // Start timer
  startExamTimer();
  
  // Display selected subject and question
  displayCurrentSubject();
}

// Render subject selection on start screen
function renderSubjectSelection() {
  const container = document.getElementById('subject-selection');
  if (!container) return;
  
  // Get current user
  const user = getCurrentUser();
  if (!user) return;
  
  const subjects = user.subjects;
  
  container.innerHTML = '';
  
  subjects.forEach((subject, index) => {
    const subjectDiv = document.createElement('div');
    subjectDiv.className = `rounded-xl p-4 border cursor-pointer transition-all ${
      index === currentExamState.selectedStartingSubject ? 'selected' : ''
    }`;
    subjectDiv.style.cssText = `background:${
      index === currentExamState.selectedStartingSubject ? '#2A1205' : '#1A1208'
    }; border-color:#3D2B1F;`;
    
    // Get subject icon from SUBJECTS array
    const subjectInfo = SUBJECTS.find(s => s.name === subject);
    const icon = subjectInfo ? subjectInfo.icon : '📚';
    
    subjectDiv.innerHTML = `
      <div class="text-2xl mb-2 text-center">${icon}</div>
      <div class="bebas tracking-wider text-sm text-center" style="color:#F5EDD6;">${subject}</div>
      <div class="text-xs text-center mt-1" style="color:#5C4030;">Start here</div>
    `;
    
    subjectDiv.onclick = () => selectStartingSubject(index);
    container.appendChild(subjectDiv);
  });
}

function selectStartingSubject(index) {
  currentExamState.selectedStartingSubject = index;
  renderSubjectSelection();
}

function generateSubjectQuestions(subjects) {
  return subjects.map(subject => ({
    name: subject,
    questions: EXAM_QUESTIONS[subject] ? shuffleArray([...EXAM_QUESTIONS[subject]]) : []
  }));
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Timer
function startExamTimer() {
  let timeRemaining = 2 * 60 * 60; // 2 hours in seconds
  
  currentExamState.timerInterval = setInterval(() => {
    timeRemaining--;
    
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;
    
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const timerEl = document.getElementById('exam-timer');
    if (timerEl) timerEl.textContent = timeString;
    
    // Change color when time is running out
    if (timeRemaining < 300) { // Less than 5 minutes
      if (timerEl) timerEl.style.color = '#E24B4A';
    }
    
    if (timeRemaining <= 0) {
      clearInterval(currentExamState.timerInterval);
      submitExam();
    }
  }, 1000);
}

// Subject Tabs
function renderSubjectTabs() {
  const tabsContainer = document.getElementById('subject-tabs');
  if (!tabsContainer) return;
  
  tabsContainer.innerHTML = '';
  
  currentExamState.subjects.forEach((subject, index) => {
    const tab = document.createElement('button');
    tab.className = `subject-tab px-4 py-2 rounded-lg text-sm bebas tracking-wider transition-all ${
      index === currentExamState.currentSubject ? 'active' : ''
    }`;
    tab.textContent = subject.name;
    tab.onclick = () => switchToSubject(index);
    tabsContainer.appendChild(tab);
  });
}

function switchToSubject(subjectIndex) {
  // Save current question index for this subject
  if (!currentExamState.answers[currentExamState.currentSubject]) {
    currentExamState.answers[currentExamState.currentSubject] = {};
  }
  currentExamState.answers[currentExamState.currentSubject][currentExamState.currentQuestion] = 
    document.querySelector('.option-card.selected')?.dataset.optionIndex || null;
  
  // Switch to new subject
  currentExamState.currentSubject = subjectIndex;
  currentExamState.currentQuestion = 0;
  
  // Update UI
  renderSubjectTabs();
  displayCurrentSubject();
}

// Display Current Subject
function displayCurrentSubject() {
  const subject = currentExamState.subjects[currentExamState.currentSubject];
  if (!subject || !subject.questions.length) return;
  
  // Update subject name
  const subjectNameEl = document.getElementById('current-subject-name');
  if (subjectNameEl) {
    subjectNameEl.textContent = subject.name;
  }
  
  // Display question
  displayQuestion();
}

function displayQuestion() {
  const subject = currentExamState.subjects[currentExamState.currentSubject];
  if (!subject || !subject.questions.length) return;
  
  const question = subject.questions[currentExamState.currentQuestion];
  if (!question) return;
  
  // Update question number and counter
  const questionNumberEl = document.getElementById('question-number');
  if (questionNumberEl) {
    questionNumberEl.textContent = currentExamState.currentQuestion + 1;
  }
  
  const counterEl = document.getElementById('question-counter');
  if (counterEl) {
    counterEl.textContent = `${currentExamState.currentQuestion + 1} of ${subject.questions.length}`;
  }
  
  // Update question text
  const questionTextEl = document.getElementById('question-text');
  if (questionTextEl) {
    questionTextEl.textContent = question.question;
  }
  
  // Update options
  const optionsContainer = document.getElementById('options-container');
  if (!optionsContainer) return;
  
  optionsContainer.innerHTML = '';
  
  // Get current answer for this question
  const subjectAnswers = currentExamState.answers[currentExamState.currentSubject] || {};
  const selectedAnswer = subjectAnswers[currentExamState.currentQuestion];
  
  question.options.forEach((option, index) => {
    const isSelected = selectedAnswer == index;
    const optionDiv = document.createElement('div');
    optionDiv.className = `option-card rounded-xl p-4 border cursor-pointer transition-all ${
      isSelected ? 'selected' : ''
    }`;
    optionDiv.style.cssText = `background:${
      isSelected ? '#2A1205' : '#1A1208'
    }; border-color:${
      isSelected ? '#C8601A' : '#3D2B1F'
    };`;
    optionDiv.dataset.optionIndex = index;
    
    optionDiv.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0" style="border-color:${
          isSelected ? '#C8601A' : '#3D2B1F'
        }; background:${
          isSelected ? '#C8601A' : 'transparent'
        };">
          ${isSelected ? '<div class="w-2 h-2 rounded-full" style="background:#F5EDD6;"></div>' : ''}
        </div>
        <div class="flex-1 text-sm" style="color:#F5EDD6;">${option}</div>
      </div>
    `;
    
    optionDiv.onclick = () => selectAnswer(index);
    optionsContainer.appendChild(optionDiv);
  });
  
  // Update navigation buttons
  updateNavigationButtons();
  
  // Update question navigation
  updateQuestionNavigation();
}

function selectAnswer(optionIndex) {
  // Save answer
  if (!currentExamState.answers[currentExamState.currentSubject]) {
    currentExamState.answers[currentExamState.currentSubject] = {};
  }
  currentExamState.answers[currentExamState.currentSubject][currentExamState.currentQuestion] = optionIndex;
  
  // Update UI
  displayQuestion();
}

function updateNavigationButtons() {
  const subject = currentExamState.subjects[currentExamState.currentSubject];
  if (!subject) return;
  
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  if (prevBtn) {
    prevBtn.disabled = currentExamState.currentQuestion === 0;
    prevBtn.style.opacity = currentExamState.currentQuestion === 0 ? '0.5' : '1';
  }
  
  if (nextBtn) {
    const isLastQuestion = currentExamState.currentQuestion === subject.questions.length - 1;
    const isLastSubject = currentExamState.currentSubject === currentExamState.subjects.length - 1;
    
    if (isLastQuestion && isLastSubject) {
      nextBtn.textContent = 'Submit Exam';
      nextBtn.style.background = '#E24B4A';
    } else if (isLastQuestion) {
      nextBtn.textContent = 'Next Subject →';
      nextBtn.style.background = '#C8601A';
    } else {
      nextBtn.textContent = 'Next →';
      nextBtn.style.background = '#C8601A';
    }
  }
}

function previousQuestion() {
  if (currentExamState.currentQuestion > 0) {
    // Save current answer
    if (!currentExamState.answers[currentExamState.currentSubject]) {
      currentExamState.answers[currentExamState.currentSubject] = {};
    }
    currentExamState.answers[currentExamState.currentSubject][currentExamState.currentQuestion] = 
      document.querySelector('.option-card.selected')?.dataset.optionIndex || null;
    
    currentExamState.currentQuestion--;
    displayQuestion();
  }
}

function nextQuestion() {
  const subject = currentExamState.subjects[currentExamState.currentSubject];
  if (!subject) return;
  
  // Save current answer
  if (!currentExamState.answers[currentExamState.currentSubject]) {
    currentExamState.answers[currentExamState.currentSubject] = {};
  }
  currentExamState.answers[currentExamState.currentSubject][currentExamState.currentQuestion] = 
    document.querySelector('.option-card.selected')?.dataset.optionIndex || null;
  
  if (currentExamState.currentQuestion < subject.questions.length - 1) {
    currentExamState.currentQuestion++;
    displayQuestion();
  } else {
    // Move to next subject or submit
    if (currentExamState.currentSubject < currentExamState.subjects.length - 1) {
      currentExamState.currentSubject++;
      currentExamState.currentQuestion = 0;
      renderSubjectTabs();
      displayCurrentSubject();
    } else {
      submitExam();
    }
  }
}

function updateQuestionNavigation() {
  const navContainer = document.getElementById('question-nav');
  if (!navContainer) return;
  
  const subject = currentExamState.subjects[currentExamState.currentSubject];
  if (!subject) return;
  
  navContainer.innerHTML = '';
  
  // Show navigation dots for current subject
  const maxDots = Math.min(10, subject.questions.length);
  for (let i = 0; i < maxDots; i++) {
    const dot = document.createElement('button');
    dot.className = 'w-2 h-2 rounded-full transition-all';
    
    const subjectAnswers = currentExamState.answers[currentExamState.currentSubject] || {};
    const isAnswered = subjectAnswers.hasOwnProperty(i);
    const isCurrent = i === currentExamState.currentQuestion;
    
    if (isCurrent) {
      dot.style.background = '#C8601A';
      dot.style.borderColor = '#D4A017';
    } else if (isAnswered) {
      dot.style.background = '#4CAF50';
      dot.style.borderColor = '#2A6A3A';
    } else {
      dot.style.background = '#3D2B1F';
      dot.style.borderColor = '#5C4030';
    }
    
    dot.style.cssText = `background:${dot.style.background}; border:1px solid ${dot.style.borderColor};`;
    dot.onclick = () => goToQuestion(i);
    navContainer.appendChild(dot);
  }
  
  if (subject.questions.length > 10) {
    const moreText = document.createElement('span');
    moreText.className = 'text-xs ml-2';
    moreText.style.cssText = 'color:#5C4030;';
    moreText.textContent = `+${subject.questions.length - 10} more`;
    navContainer.appendChild(moreText);
  }
}

function goToQuestion(questionIndex) {
  // Save current answer
  if (!currentExamState.answers[currentExamState.currentSubject]) {
    currentExamState.answers[currentExamState.currentSubject] = {};
  }
  currentExamState.answers[currentExamState.currentSubject][currentExamState.currentQuestion] = 
    document.querySelector('.option-card.selected')?.dataset.optionIndex || null;
  
  currentExamState.currentQuestion = questionIndex;
  displayQuestion();
}

// Submit Exam
function submitExam() {
  if (currentExamState.timerInterval) {
    clearInterval(currentExamState.timerInterval);
  }
  
  // Save last answer
  if (!currentExamState.answers[currentExamState.currentSubject]) {
    currentExamState.answers[currentExamState.currentSubject] = {};
  }
  currentExamState.answers[currentExamState.currentSubject][currentExamState.currentQuestion] = 
    document.querySelector('.option-card.selected')?.dataset.optionIndex || null;
  
  currentExamState.endTime = new Date();
  
  // Calculate results
  const results = calculateResults();
  
  // Update candidate with exam results
  const candidate = getCurrentUser();
  if (candidate) {
    candidate.examResults = results;
    candidate.examCompletedAt = currentExamState.endTime.toLocaleString('en-NG');
    updateUserProgress(candidate);
  }
  
  // Show results
  displayResults(results);
  
  // Hide progress, show results
  const progressEl = document.getElementById('exam-progress');
  const resultsEl = document.getElementById('exam-results');
  if (progressEl) progressEl.classList.add('hidden');
  if (resultsEl) resultsEl.classList.remove('hidden');
}

function calculateResults() {
  let correct = 0;
  let total = 0;
  let subjectScores = {};
  
  currentExamState.subjects.forEach(subject => {
    const subjectAnswers = currentExamState.answers[currentExamState.subjects.indexOf(subject.name)] || {};
    let subjectCorrect = 0;
    
    subject.questions.forEach((question, index) => {
      total++;
      const userAnswer = subjectAnswers[index];
      const isCorrect = userAnswer === question.correct;
      
      if (isCorrect) {
        correct++;
        subjectCorrect++;
      }
    });
    
    subjectScores[subject.name] = {
      correct: subjectCorrect,
      total: subject.questions.length
    };
  });
  
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const timeTaken = Math.floor((currentExamState.endTime - currentExamState.startTime) / 1000 / 60); // in minutes
  
  return {
    totalQuestions: total,
    correct,
    wrong: total - correct,
    percentage,
    timeTaken,
    subjectScores,
    grade: getGrade(percentage)
  };
}

function getGrade(percentage) {
  if (percentage >= 70) return 'A';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 45) return 'D';
  if (percentage >= 40) return 'E';
  return 'F';
}

function displayResults(results) {
  const resultsContent = document.getElementById('results-content');
  if (!resultsContent) return;
  
  // Show simple summary with button to see detailed results
  resultsContent.innerHTML = `
    <div class="text-center mb-6">
      <div class="bebas text-6xl tracking-wider mb-2" style="color:#F5EDD6;">${results.percentage}%</div>
      <div class="bebas text-2xl tracking-wider" style="color:#D4A017;">Grade: ${results.grade}</div>
    </div>
    
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="text-center">
        <div class="bebas text-2xl" style="color:#F5EDD6;">${results.correct}</div>
        <div class="text-xs" style="color:#F5EDD6;">Correct</div>
      </div>
      <div class="text-center">
        <div class="bebas text-2xl" style="color:#F5EDD6;">${results.wrong}</div>
        <div class="text-xs" style="color:#F5EDD6;">Wrong</div>
      </div>
      <div class="text-center">
        <div class="bebas text-2xl" style="color:#F5EDD6;">${results.timeTaken}m</div>
        <div class="text-xs" style="color:#F5EDD6;">Time Taken</div>
      </div>
    </div>
    
    <div class="rounded-lg p-3 mb-6" style="background:#${results.percentage >= 40 ? '#0A2010' : '#2A0A0A'}; border:1px solid #${results.percentage >= 40 ? '#1A4020' : '#4A1A1A'};">
      <div class="text-xs" style="color:#F5EDD6;">
        ${results.percentage >= 40 ? '✓ PASSED' : '✗ FAILED'} - ${results.percentage >= 40 ? 'Congratulations! You passed the exam.' : 'You did not meet the passing score of 40%.'}
      </div>
    </div>
    
    <button onclick="showDetailedResults()" class="bebas tracking-widest px-8 py-3 rounded-lg transition w-full" style="background:#D4A017; color:#F5EDD6;">
      View Detailed Results
    </button>
  `;
  
  // Store results for detailed view
  window.currentResults = results;
}

function showDetailedResults() {
  const results = window.currentResults;
  if (!results) return;
  
  const resultsContent = document.getElementById('results-content');
  if (!resultsContent) return;
  
  const subjectBreakdown = Object.entries(results.subjectScores)
    .map(([subject, scores]) => `
      <div class="flex justify-between items-center py-2 border-b" style="border-color:#2A1A05;">
        <div>
          <div class="text-sm font-semibold" style="color:#F5EDD6;">${subject}</div>
          <div class="text-xs" style="color:#F5EDD6;">${scores.correct}/${scores.total} correct</div>
        </div>
        <div class="bebas text-lg" style="color:#F5EDD6;">
          ${Math.round((scores.correct / scores.total) * 100)}%
        </div>
      </div>
    `).join('');
  
  resultsContent.innerHTML = `
    <div class="text-center mb-6">
      <div class="bebas text-6xl tracking-wider mb-2" style="color:#F5EDD6;">${results.percentage}%</div>
      <div class="bebas text-2xl tracking-wider" style="color:#D4A017;">Grade: ${results.grade}</div>
    </div>
    
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="text-center">
        <div class="bebas text-2xl" style="color:#F5EDD6;">${results.correct}</div>
        <div class="text-xs" style="color:#F5EDD6;">Correct</div>
      </div>
      <div class="text-center">
        <div class="bebas text-2xl" style="color:#F5EDD6;">${results.wrong}</div>
        <div class="text-xs" style="color:#F5EDD6;">Wrong</div>
      </div>
      <div class="text-center">
        <div class="bebas text-2xl" style="color:#F5EDD6;">${results.timeTaken}m</div>
        <div class="text-xs" style="color:#F5EDD6;">Time Taken</div>
      </div>
    </div>
    
    <div class="mb-6">
      <h4 class="bebas tracking-wider text-sm mb-3" style="color:#D4A017;">SUBJECT BREAKDOWN</h4>
      ${subjectBreakdown}
    </div>
    
    <div class="rounded-lg p-3" style="background:#${results.percentage >= 40 ? '#0A2010' : '#2A0A0A'}; border:1px solid #${results.percentage >= 40 ? '#1A4020' : '#4A1A1A'};">
      <div class="text-xs" style="color:#F5EDD6;">
        ${results.percentage >= 40 ? '✓ PASSED' : '✗ FAILED'} - ${results.percentage >= 40 ? 'Congratulations! You passed the exam.' : 'You did not meet the passing score of 40%.'}
      </div>
    </div>
    
    <button onclick="displayResults(window.currentResults)" class="bebas tracking-widest px-8 py-3 rounded-lg transition w-full mt-4" style="background:#3D2B1F; color:#F5EDD6;">
      ← Back to Summary
    </button>
  `;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  // Check URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const viewResults = urlParams.get('view') === 'results';
  
  if (candidates.length > 0) {
    if (viewResults) {
      // Show results list
      showResultsList();
      document.getElementById('exam-start').classList.add('hidden');
      document.getElementById('exam-progress').classList.add('hidden');
      document.getElementById('exam-results').classList.remove('hidden');
      
      // Hide start button and show results button
      const resultsBtn = document.getElementById('view-results-btn');
      if (resultsBtn) {
        resultsBtn.classList.remove('hidden');
      }
    } else {
      // Show start screen with subject selection
      document.getElementById('exam-start').classList.remove('hidden');
      document.getElementById('exam-progress').classList.add('hidden');
      document.getElementById('exam-results').classList.add('hidden');
      
      // Render subject selection
      renderSubjectSelection();
    }
  } else {
    // Show start screen
    document.getElementById('exam-start').classList.remove('hidden');
    document.getElementById('exam-progress').classList.add('hidden');
    document.getElementById('exam-results').classList.add('hidden');
  }
});

function showResultsList() {
  const resultsContent = document.getElementById('results-content');
  if (!resultsContent) return;
  
  // Get all candidates with results
  const candidatesWithResults = candidates.filter(c => c.examResults);
  
  if (candidatesWithResults.length === 0) {
    resultsContent.innerHTML = `
      <div class="text-center py-8">
        <div class="text-4xl mb-4">📋</div>
        <div class="bebas text-xl tracking-wider" style="color:#F5EDD6;">NO EXAM RESULTS YET</div>
        <div class="text-sm" style="color:#F5EDD6;">Complete an exam to see results here</div>
      </div>
    `;
    return;
  }
  
  const resultsTable = candidatesWithResults.map(candidate => `
    <div class="border rounded-lg p-4 mb-4" style="border-color:#3D2B1F; background:#1A1208;">
      <div class="flex justify-between items-start mb-2">
        <div>
          <div class="bebas text-lg tracking-wider" style="color:#D4A017;">${candidate.fullName}</div>
          <div class="text-xs" style="color:#F5EDD6;">${candidate.regNo} • ${candidate.institution}</div>
        </div>
        <div class="text-right">
          <div class="bebas text-2xl" style="color:#F5EDD6;">${candidate.examResults.percentage}%</div>
          <div class="text-xs" style="color:#F5EDD6;">Grade: ${candidate.examResults.grade}</div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div class="text-xs" style="color:#F5EDD6;">Score</div>
          <div class="bebas" style="color:#F5EDD6;">${candidate.examResults.correct}/${candidate.examResults.totalQuestions}</div>
        </div>
        <div>
          <div class="text-xs" style="color:#F5EDD6;">Time</div>
          <div class="bebas" style="color:#F5EDD6;">${candidate.examResults.timeTaken}min</div>
        </div>
      </div>
      <div class="mt-3">
        <div class="text-xs tracking-wider uppercase mb-2" style="color:#D4A017;">Subject Performance</div>
        ${Object.entries(candidate.examResults.subjectScores).map(([subject, scores]) => `
          <div class="flex justify-between items-center py-1">
            <div class="text-sm" style="color:#F5EDD6;">${subject}</div>
            <div class="text-xs" style="color:#F5EDD6;">${scores.correct}/${scores.total}</div>
            <div class="bebas text-sm" style="color:#F5EDD6;">${Math.round((scores.correct / scores.total) * 100)}%</div>
          </div>
        `).join('')}
      </div>
      <div class="text-xs mt-3" style="color:#F5EDD6;">Completed: ${candidate.examCompletedAt}</div>
    </div>
  `).join('');
  
  resultsContent.innerHTML = `
    <div class="mb-6">
      <h3 class="bebas tracking-wider text-lg mb-4" style="color:#D4A017;">EXAM RESULTS HISTORY</h3>
    </div>
    ${resultsTable}
  `;
}
