// ═══════════════════════════════════
// EXAM QUESTIONS DATABASE
// ═══════════════════════════════════

const EXAM_QUESTIONS = {
  'Use of English': [
    {
      question: "Choose the word that best completes the sentence: 'The patient was _____ to the hospital immediately after the accident.'",
      options: ["rushed", "rushing", "rush", "rashes"],
      correct: 0
    },
    {
      question: "Identify the figure of speech in the following sentence: 'The world is a stage.'",
      options: ["Simile", "Metaphor", "Personification", "Hyperbole"],
      correct: 1
    },
    {
      question: "Which of the following is the correct pronunciation of 'epitome'?",
      options: ["eh-pi-tome", "eh-pi-tuh-mee", "ep-i-tohm", "ep-i-tuhm"],
      correct: 1
    },
    {
      question: "Choose the correct form of the verb: 'Neither the teacher nor the students _____ satisfied with the result.'",
      options: ["was", "were", "is", "are"],
      correct: 0
    },
    {
      question: "What is the meaning of the idiom 'to bite the bullet'?",
      options: ["To be violent", "To face a difficult situation bravely", "To eat quickly", "To be angry"],
      correct: 1
    },
    {
      question: "Identify the type of clause in the following sentence: 'The book that I bought yesterday is very interesting.'",
      options: ["Main clause", "Subordinate clause", "Relative clause", "Independent clause"],
      correct: 2
    },
    {
      question: "Choose the correct antonym for 'ephemeral':",
      options: ["Temporary", "Permanent", "Brief", "Fleeting"],
      correct: 1
    },
    {
      question: "Which sentence is grammatically correct?",
      options: ["Each of the students have their books", "Each of the students has their book", "Each of the students have his book", "Each of the students has his book"],
      correct: 1
    },
    {
      question: "What is the tone of the following passage? 'The dark clouds gathered ominously, and thunder rumbled in the distance.'",
      options: ["Joyful", "Suspenseful", "Humorous", "Informative"],
      correct: 1
    },
    {
      question: "Choose the correct preposition: 'She is good _____ mathematics.'",
      options: ["in", "at", "on", "with"],
      correct: 1
    },
    {
      question: "Identify the part of speech of the word 'quickly' in the sentence: 'She ran quickly.'",
      options: ["Adjective", "Adverb", "Verb", "Noun"],
      correct: 1
    },
    {
      question: "Which of the following is a compound sentence?",
      options: ["She went to the market", "She went to the market and bought fruits", "Going to the market, she bought fruits", "She went to the market where she bought fruits"],
      correct: 1
    },
    {
      question: "What is the correct spelling of the word?",
      options: ["Accomodate", "Accommodate", "Acommodate", "Accommodate"],
      correct: 1
    },
    {
      question: "Choose the correct conjunction: 'I studied hard _____ I could pass the exam.'",
      options: ["because", "so that", "although", "unless"],
      correct: 1
    },
    {
      question: "What is the literary device used in 'The wind whispered through the trees'?",
      options: ["Simile", "Metaphor", "Personification", "Alliteration"],
      correct: 2
    }
  ],
  'Mathematics': [
    {
      question: "What is the value of x in the equation: 2x + 7 = 15?",
      options: ["3", "4", "5", "6"],
      correct: 1
    },
    {
      question: "Find the area of a circle with radius 7cm. (Take π = 22/7)",
      options: ["154 cm²", "148 cm²", "176 cm²", "132 cm²"],
      correct: 0
    },
    {
      question: "Simplify: (3x²)(2x³)",
      options: ["6x⁵", "6x⁶", "5x⁵", "5x⁶"],
      correct: 0
    },
    {
      question: "What is the sum of angles in a quadrilateral?",
      options: ["180°", "270°", "360°", "450°"],
      correct: 2
    },
    {
      question: "Find the mean of the numbers: 12, 15, 18, 21, 24",
      options: ["16", "17", "18", "19"],
      correct: 2
    },
    {
      question: "If sin θ = 3/5, what is cos θ?",
      options: ["3/5", "4/5", "5/3", "5/4"],
      correct: 1
    },
    {
      question: "Solve: 2(3x - 4) = 10",
      options: ["1", "2", "3", "4"],
      correct: 2
    },
    {
      question: "What is the probability of getting a head when tossing a fair coin?",
      options: ["0", "1/2", "1", "1/4"],
      correct: 1
    },
    {
      question: "Find the value of 2³ + 3²",
      options: ["8", "17", "25", "33"],
      correct: 1
    },
    {
      question: "What is the LCM of 12 and 18?",
      options: ["36", "48", "72", "108"],
      correct: 0
    },
    {
      question: "Simplify: √144",
      options: ["11", "12", "13", "14"],
      correct: 1
    },
    {
      question: "Find the gradient of the line passing through points (2,3) and (4,7)",
      options: ["1", "2", "3", "4"],
      correct: 1
    },
    {
      question: "What is 15% of 200?",
      options: ["20", "25", "30", "35"],
      correct: 2
    }
  ],
  'Physics': [
    {
      question: "What is the SI unit of force?",
      options: ["Newton", "Joule", "Watt", "Pascal"],
      correct: 0
    },
    {
      question: "Which of the following is a renewable energy source?",
      options: ["Coal", "Natural gas", "Solar", "Nuclear"],
      correct: 2
    },
    {
      question: "What happens to the resistance of a conductor when temperature increases?",
      options: ["Decreases", "Increases", "Remains constant", "Becomes zero"],
      correct: 1
    },
    {
      question: "What is the speed of light in vacuum?",
      options: ["3×10⁶ m/s", "3×10⁸ m/s", "3×10⁹ m/s", "3×10¹⁰ m/s"],
      correct: 1
    },
    {
      question: "Which law states that energy cannot be created or destroyed?",
      options: ["Newton's First Law", "Conservation of Energy", "Ohm's Law", "Coulomb's Law"],
      correct: 1
    },
    {
      question: "What is the unit of electric current?",
      options: ["Volt", "Ampere", "Ohm", "Farad"],
      correct: 1
    },
    {
      question: "Which type of lens is used to correct short-sightedness?",
      options: ["Convex lens", "Concave lens", "Bifocal lens", "Cylindrical lens"],
      correct: 1
    },
    {
      question: "What is the acceleration due to gravity on Earth?",
      options: ["8.8 m/s²", "9.8 m/s²", "10.8 m/s²", "11.8 m/s²"],
      correct: 1
    },
    {
      question: "Which electromagnetic wave has the highest frequency?",
      options: ["Radio waves", "Microwaves", "X-rays", "Gamma rays"],
      correct: 3
    },
    {
      question: "What is the principle behind hydraulic machines?",
      options: ["Pascal's Law", "Archimedes' Principle", "Bernoulli's Principle", "Newton's Law"],
      correct: 0
    }
  ],
  'Chemistry': [
    {
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correct: 2
    },
    {
      question: "Which gas is most abundant in Earth's atmosphere?",
      options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
      correct: 2
    },
    {
      question: "What is the pH value of pure water?",
      options: ["6", "7", "8", "9"],
      correct: 1
    },
    {
      question: "Which element has the atomic number 6?",
      options: ["Oxygen", "Nitrogen", "Carbon", "Sulfur"],
      correct: 2
    },
    {
      question: "What type of bond is formed between sodium and chlorine?",
      options: ["Covalent bond", "Ionic bond", "Metallic bond", "Hydrogen bond"],
      correct: 1
    },
    {
      question: "What is the chemical formula for water?",
      options: ["HO", "H₂O", "H₂O₂", "OH"],
      correct: 1
    },
    {
      question: "Which process separates mixtures based on boiling points?",
      options: ["Filtration", "Distillation", "Evaporation", "Crystallization"],
      correct: 1
    },
    {
      question: "What is the valency of oxygen in most compounds?",
      options: ["1", "2", "3", "4"],
      correct: 1
    },
    {
      question: "Which acid is found in vinegar?",
      options: ["Sulfuric acid", "Hydrochloric acid", "Acetic acid", "Nitric acid"],
      correct: 2
    },
    {
      question: "What is the mass number of an element with 12 protons and 13 neutrons?",
      options: ["12", "13", "25", "26"],
      correct: 2
    }
  ],
  'Biology': [
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
      correct: 1
    },
    {
      question: "Which organ produces insulin?",
      options: ["Liver", "Kidney", "Pancreas", "Stomach"],
      correct: 2
    },
    {
      question: "What type of blood vessel carries blood away from the heart?",
      options: ["Veins", "Arteries", "Capillaries", "Lymphatics"],
      correct: 1
    },
    {
      question: "Which process do plants use to make their own food?",
      options: ["Respiration", "Photosynthesis", "Transpiration", "Germination"],
      correct: 1
    },
    {
      question: "What is the largest bone in the human body?",
      options: ["Skull", "Rib", "Femur", "Humerus"],
      correct: 2
    },
    {
      question: "Which part of the brain controls balance and coordination?",
      options: ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"],
      correct: 1
    },
    {
      question: "What is the function of white blood cells?",
      options: ["Carry oxygen", "Fight infections", "Clot blood", "Transport nutrients"],
      correct: 1
    },
    {
      question: "Which gas do plants release during photosynthesis?",
      options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
      correct: 1
    },
    {
      question: "What is the basic unit of life?",
      options: ["Atom", "Molecule", "Cell", "Tissue"],
      correct: 2
    },
    {
      question: "Which organ system includes the heart and blood vessels?",
      options: ["Respiratory system", "Digestive system", "Circulatory system", "Nervous system"],
      correct: 2
    }
  ],
  'Economics': [
    {
      question: "What is the basic economic problem?",
      options: ["Unemployment", "Inflation", "Scarcity", "Poverty"],
      correct: 2
    },
    {
      question: "Which of the following is a factor of production?",
      options: ["Money", "Labor", "Demand", "Price"],
      correct: 1
    },
    {
      question: "What is inflation?",
      options: ["Decrease in prices", "Increase in prices", "Stable prices", "Fluctuating prices"],
      correct: 1
    },
    {
      question: "Which market structure has many firms selling identical products?",
      options: ["Monopoly", "Oligopoly", "Perfect competition", "Monopolistic competition"],
      correct: 2
    },
    {
      question: "What is GDP?",
      options: ["Gross Domestic Product", "General Domestic Price", "Growth Domestic Production", "Global Development Product"],
      correct: 0
    },
    {
      question: "Which of the following is a direct tax?",
      options: ["Sales tax", "Income tax", "Customs duty", "Excise duty"],
      correct: 1
    },
    {
      question: "What is opportunity cost?",
      options: ["Total cost", "Fixed cost", "Variable cost", "Next best alternative forgone"],
      correct: 3
    },
    {
      question: "Which institution controls monetary policy in most countries?",
      options: ["Commercial banks", "Central bank", "World bank", "IMF"],
      correct: 1
    }
  ],
  'Government': [
    {
      question: "What is democracy?",
      options: ["Rule by one person", "Rule by the people", "Rule by the military", "Rule by the wealthy"],
      correct: 1
    },
    {
      question: "Which arm of government makes laws?",
      options: ["Executive", "Legislature", "Judiciary", "Police"],
      correct: 1
    },
    {
      question: "What is the principle of separation of powers?",
      options: ["One branch controls all", "Division of government powers", "No government powers", "Equal powers for all"],
      correct: 1
    },
    {
      question: "Which system of government has a president as head of state and government?",
      options: ["Parliamentary", "Presidential", "Monarchical", "Federal"],
      correct: 1
    },
    {
      question: "What is federalism?",
      options: ["Centralized government", "Division of powers between levels", "Local government only", "Military rule"],
      correct: 1
    },
    {
      question: "Which document outlines the fundamental laws of a country?",
      options: ["Manifesto", "Constitution", "Bill", "Act"],
      correct: 1
    },
    {
      question: "What is suffrage?",
      options: ["Suffering", "Right to vote", "Tax payment", "Military service"],
      correct: 1
    },
    {
      question: "Which court is typically the highest in a country?",
      options: ["Magistrate court", "High court", "Supreme court", "Appeal court"],
      correct: 2
    }
  ]
};

// Subjects list for registration
const SUBJECTS = [
  { name: 'Mathematics', icon: '📐', group: 'Sciences' },
  { name: 'Physics', icon: '⚡', group: 'Sciences' },
  { name: 'Chemistry', icon: '🧪', group: 'Sciences' },
  { name: 'Biology', icon: '🧬', group: 'Sciences' },
  { name: 'Agricultural Science', icon: '🌾', group: 'Sciences' },
  { name: 'Economics', icon: '📊', group: 'Social Sciences' },
  { name: 'Commerce', icon: '🏪', group: 'Social Sciences' },
  { name: 'Accounting', icon: '💰', group: 'Social Sciences' },
  { name: 'Government', icon: '🏛️', group: 'Social Sciences' },
  { name: 'Geography', icon: '🗺️', group: 'Social Sciences' },
  { name: 'History', icon: '📜', group: 'Humanities' },
  { name: 'Literature in English', icon: '📚', group: 'Humanities' },
  { name: 'Yoruba', icon: '🗣️', group: 'Languages' },
  { name: 'Hausa', icon: '🗣️', group: 'Languages' },
  { name: 'Igbo', icon: '🗣️', group: 'Languages' },
  { name: 'Christian Religious Studies', icon: '✝️', group: 'Religion' },
  { name: 'Islamic Studies', icon: '☪️', group: 'Religion' },
  { name: 'Technical Drawing', icon: '📏', group: 'Technical' },
  { name: 'Further Mathematics', icon: '🔢', group: 'Sciences' },
  { name: 'Computer Studies', icon: '💻', group: 'Technical' },
  { name: 'Home Economics', icon: '🏠', group: 'Vocational' },
  { name: 'French', icon: '🇫🇷', group: 'Languages' },
];
