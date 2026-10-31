const $ = (id) => document.getElementById(id);

let explorer = {
  name: "",
  age: "",
  avatar: "👩🏽‍🚀",
  xp: 0,
  badges: [],
  quizzes: 0,
  games: 0
};

let activeCategory = "All";
let selectedAvatar = "👩🏽‍🚀";
let currentQuestion = 0;
let quizCorrect = 0;
let answered = false;
let mathAnswer = null;
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;

const subjects = [
  // Languages
  ["English Language","Languages","📘"],
  ["Nigerian Pidgin","Languages","🗣️"],
  ["Hausa","Languages","🌍"],
  ["Yoruba","Languages","🌍"],
  ["Igbo","Languages","🌍"],
  ["Tiv","Languages","🌍"],
  ["Idoma","Languages","🌍"],
  ["Fulfulde","Languages","🌍"],
  ["Kanuri","Languages","🌍"],
  ["Swahili","Languages","🌍"],
  ["Arabic","Languages","🕌"],
  ["French","Languages","🇫🇷"],
  ["Spanish","Languages","🇪🇸"],
  ["Portuguese","Languages","🇵🇹"],
  ["German","Languages","🇩🇪"],
  ["Italian","Languages","🇮🇹"],
  ["Chinese (Mandarin)","Languages","🇨🇳"],
  ["Japanese","Languages","🇯🇵"],
  ["Korean","Languages","🇰🇷"],
  ["Hindi","Languages","🇮🇳"],
  ["Sign Language","Languages","🤟"],
  ["Internet Slang & Gen Z Language","Languages","💬"],
  ["Grammar & Vocabulary","Languages","✍️"],

  // School subjects
  ["Mathematics","School","➗"],
  ["Further Mathematics","School","📐"],
  ["English Literature","School","📚"],
  ["Basic Science","School","🔬"],
  ["Biology","School","🧬"],
  ["Chemistry","School","⚗️"],
  ["Physics","School","⚛️"],
  ["Computer Science","School","💻"],
  ["Geography","School","🌎"],
  ["History","School","🏛️"],
  ["Civic Education","School","🤝"],
  ["Government","School","🏛️"],
  ["Economics","School","📈"],
  ["Business Studies","School","💼"],
  ["Accounting","School","🧾"],
  ["Agricultural Science","School","🌱"],
  ["Religious Studies","School","🕊️"],
  ["Social Studies","School","👥"],
  ["Physical Education","School","⚽"],
  ["Environmental Science","School","🌳"],
  ["Statistics","School","📊"],
  ["Philosophy","School","💭"],
  ["Psychology","School","🧠"],
  ["Sociology","School","👥"],
  ["Astronomy","School","🪐"],

  // Everyday knowledge
  ["Personal Hygiene","Everyday","🧼"],
  ["Healthy Eating","Everyday","🥗"],
  ["First Aid Basics","Everyday","🩹"],
  ["Cooking & Nutrition","Everyday","🍳"],
  ["Money & Budgeting","Everyday","💰"],
  ["Time Management","Everyday","⏰"],
  ["Communication Skills","Everyday","💬"],
  ["Friendship & Relationships","Everyday","💞"],
  ["Road Safety","Everyday","🚦"],
  ["Home Safety","Everyday","🏠"],
  ["Weather & Climate","Everyday","🌦️"],
  ["Parenting & Family Life","Everyday","👨‍👩‍👧"],

  // Technology
  ["Artificial Intelligence","Technology","🤖"],
  ["Coding & Programming","Technology","👩‍💻"],
  ["Web Design","Technology","🌐"],
  ["App Development","Technology","📱"],
  ["Cybersecurity","Technology","🔐"],
  ["Internet Safety","Technology","🛡️"],
  ["Robotics","Technology","🦾"],
  ["Digital Literacy","Technology","🖥️"],
  ["Data Science","Technology","📊"],
  ["Graphic Design","Technology","🎨"],
  ["Digital Citizenship","Technology","🌐"],

  // Creative
  ["Drawing & Painting","Creative","🎨"],
  ["Music","Creative","🎵"],
  ["Dance","Creative","💃"],
  ["Creative Writing","Creative","✍️"],
  ["Photography","Creative","📷"],
  ["Fashion Design","Creative","👗"],
  ["Drama & Theatre","Creative","🎭"],
  ["Crafts & DIY","Creative","✂️"],
  ["Animation","Creative","🎬"],
  ["Storytelling","Creative","📖"],

  // World knowledge
  ["World Cultures","World","🌍"],
  ["Countries & Capitals","World","🗺️"],
  ["World Religions","World","🕊️"],
  ["Space Exploration","World","🚀"],
  ["Animals & Wildlife","World","🦁"],
  ["Ocean Life","World","🐬"],
  ["Inventions & Discoveries","World","💡"],
  ["World History","World","🏺"],
  ["International Organizations","World","🌐"],
  ["Maps & Navigation","World","🧭"],
  ["Climate Change","World","🌱"],

  // Life skills
  ["Leadership","Skills","👑"],
  ["Entrepreneurship","Skills","🚀"],
  ["Public Speaking","Skills","🎤"],
  ["Critical Thinking","Skills","🧠"],
  ["Problem Solving","Skills","🧩"],
  ["Teamwork","Skills","🤝"],
  ["Emotional Intelligence","Skills","💗"],
  ["Goal Setting","Skills","🎯"],
  ["Career Exploration","Skills","🧑‍🚀"],
  ["Study Skills","Skills","📚"],
  ["Financial Literacy","Skills","🏦"],
  ["Environmental Care","Skills","♻️"]
];

const questions = [
  {
    q: "Which planet is known as the Red Planet?",
    a: ["Earth","Mars","Venus","Jupiter"],
    correct: 1
  },
  {
    q: "What is 8 × 7?",
    a: ["54","48","56","64"],
    correct: 2
  },
  {
    q: "What is the largest ocean on Earth?",
    a: ["Atlantic","Indian","Arctic","Pacific"],
    correct: 3
  },
  {
    q: "Which organ pumps blood around the body?",
    a: ["Lungs","Heart","Brain","Kidney"],
    correct: 1
  },
  {
    q: "What language is mainly spoken in Brazil?",
    a: ["Spanish","French","Portuguese","German"],
    correct: 2
  },
  {
    q: "Which gas do plants absorb from the air?",
    a: ["Oxygen","Carbon dioxide","Hydrogen","Helium"],
    correct: 1
  },
  {
    q: "How many sides does a hexagon have?",
    a: ["Five","Six","Seven","Eight"],
    correct: 1
  },
  {
    q: "What does HTML help create?",
    a: ["Web pages","Shoes","Cars","Food"],
    correct: 0
  }
];

const words = [
  ["Curiosity","A strong desire to learn or know something."],
  ["Innovation","A new idea, method, or invention."],
  ["Resilience","The ability to recover after difficulties."],
  ["Universe","All of space, time, matter, and energy."],
  ["Empathy","Understanding how another person may feel."],
  ["Creativity","Using imagination to make something new."]
];

const facts = [
  "🐙 An octopus has three hearts!",
  "🌍 Earth is the only planet currently known to support life.",
  "🐝 Bees communicate with one another through movements called waggle dances.",
  "🦒 A giraffe has the same number of neck bones as a human: seven.",
  "🌊 The Pacific Ocean is the largest ocean on Earth.",
  "🪐 Saturn has a spectacular system of rings.",
  "🦋 Butterflies taste using sensors on their feet."
];

// SAVE AND LOAD PROGRESS
function saveData() {
  try {
    localStorage.setItem("puridoreExplorer", JSON.stringify(explorer));
  } catch (error) {
    console.log("Progress could not be saved on this browser.");
  }
}

function loadData() {
  try {
    const saved = localStorage.getItem("puridoreExplorer");

    if (saved) {
      explorer = { ...explorer, ...JSON.parse(saved) };
      selectedAvatar = explorer.avatar;
      return true;
    }
  } catch (error) {
    console.log("No saved explorer profile found.");
  }

  return false;
}

// CONFETTI
function confetti(amount = 100) {
  const layer = $("confettiLayer");
  if (!layer) return;

  const colors = [
    "#ff5eaa",
    "#8e65f5",
    "#ffce45",
    "#43c9a4",
    "#49a9ff",
    "#ff875e"
  ];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("i");

    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 1.2 + "s";
    piece.style.animationDuration =
      (2 + Math.random() * 1.8) + "s";
    piece.style.transform =
      `rotate(${Math.random() * 360}deg)`;

    layer.appendChild(piece);

    setTimeout(() => piece.remove(), 4500);
  }
}

// NOTIFICATION MESSAGE
let toastTimer;

function showToast(message) {
  const toast = $("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// ACHIEVEMENTS
function updateAchievements() {
  const achievements = [
    ["First Steps", "Complete your first quiz", explorer.quizzes >= 1],
    ["Brain Booster", "Earn 50 XP", explorer.xp >= 50],
    ["Game Champion", "Play 3 games", explorer.games >= 3],
    ["Super Explorer", "Complete 5 quizzes", explorer.quizzes >= 5]
  ];

  let newBadges = [];

  achievements.forEach(([name, description, done]) => {
    if (done && !explorer.badges.includes(name)) {
      explorer.badges.push(name);
      newBadges.push(name);
    }
  });

  if (newBadges.length > 0) {
    saveData();
    confetti(45);
    newBadges.forEach(name => {
      showToast(`🏅 New badge unlocked: ${name}!`);
    });
  }

  $("achievementList").innerHTML = achievements.map(
    ([name, description, done]) => `
      <div class="achievement ${done ? "unlocked" : ""}">
        ${done ? "🏆" : "🔒"} ${name} — ${description} ${done ? "✓" : ""}
      </div>
    `
  ).join("");
}

// UPDATE DASHBOARD
function updateStats() {
  $("topXP").textContent = explorer.xp;
  $("xpCount").textContent = explorer.xp;
  $("badgeCount").textContent = explorer.badges.length;
  $("learnedCount").textContent = explorer.quizzes;
  $("gamesCount").textContent = explorer.games;

  updateAchievements();

  $("badgeCount").textContent = explorer.badges.length;
}

// ADD EXPERIENCE POINTS
function addXP(points, message) {
  explorer.xp += points;

  saveData();
  updateStats();

  showToast(`⭐ +${points} XP! ${message}`);
}

// DISPLAY SUBJECTS
function renderSubjects() {
  const search = $("subjectSearch").value.toLowerCase().trim();

  const filtered = subjects.filter(([name, category]) => {
    const matchesCategory =
      activeCategory === "All" || category === activeCategory;

    const matchesSearch =
      name.toLowerCase().includes(search) ||
      category.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  $("subjectCount").textContent =
    `Showing ${filtered.length} subjects to explore`;

  $("subjectGrid").innerHTML = filtered.length
    ? filtered.map(([name, category, emoji]) => `
        <button class="subject-card" data-subject="${name}">
          <span>${emoji}</span>
          <b>${name}</b>
          <small>${category}</small>
        </button>
      `).join("")
    : `<p>No subjects found. Try another search! 🔍</p>`;
}

// WELCOME SCREEN
function showWelcome() {
  const groups = {
    little: "our Little Explorer! 🌈",
    young: "a Young Explorer! 🌟",
    future: "a Future Builder! 🚀",
    adult: "a University & Adult Explorer! 🎓"
  };

  $("welcomeAvatar").textContent = explorer.avatar;
  $("welcomeTitle").textContent = `Welcome, ${explorer.name}!`;

  $("welcomeText").textContent =
    `You are ${groups[explorer.age]} Your learning adventure begins now!`;

  $("welcomeCard").classList.remove("hidden");
  $("profilePanel").classList.add("hidden");
  $("dashboard").classList.remove("hidden");

  updateStats();
  renderSubjects();
}

// AVATAR SELECTION
$("avatarGrid").addEventListener("click", (event) => {
  const button = event.target.closest(".avatar");
  if (!button) return;

  document.querySelectorAll(".avatar").forEach(item => {
    item.classList.remove("selected");
  });

  button.classList.add("selected");
  selectedAvatar = button.dataset.avatar;
});

// SAVE PROFILE
$("saveProfile").addEventListener("click", () => {
  const name = $("explorerName").value.trim();
  const age = $("ageGroup").value;

  if (!name) {
    showToast("✏️ Please enter your name first!");
    $("explorerName").focus();
    return;
  }

  if (!age) {
    showToast("🌟 Please choose your explorer group!");
    $("ageGroup").focus();
    return;
  }

  explorer.name = name;
  explorer.age = age;
  explorer.avatar = selectedAvatar;

  saveData();
  showWelcome();
  confetti(150);

  showToast(`🎉 Welcome to PURIDORE, ${name}!`);
});

// THEMES
$("themeSelect").addEventListener("change", (event) => {
  document.body.dataset.theme = event.target.value;

  try {
    localStorage.setItem("puridoreTheme", event.target.value);
  } catch (error) {}
});

try {
  const savedTheme = localStorage.getItem("puridoreTheme");

  if (savedTheme) {
    document.body.dataset.theme = savedTheme;
    $("themeSelect").value = savedTheme;
  }
} catch (error) {}

// SUBJECT SEARCH
$("subjectSearch").addEventListener("input", renderSubjects);

// SUBJECT CATEGORIES
$("categoryRow").addEventListener("click", (event) => {
  const button = event.target.closest(".category");
  if (!button) return;

  document.querySelectorAll(".category").forEach(item => {
    item.classList.remove("active");
  });

  button.classList.add("active");
  activeCategory = button.dataset.category;

  renderSubjects();
});

// SUBJECT SELECTION
$("subjectGrid").addEventListener("click", (event) => {
  const card = event.target.closest(".subject-card");
  if (!card) return;

  showToast(`🌟 ${card.dataset.subject} is ready to explore!`);
});

// QUIZ ZONE
function showQuestion() {
  const question = questions[currentQuestion % questions.length];

  answered = false;

  $("quizNumber").textContent =
    `QUESTION ${(currentQuestion % questions.length) + 1}`;

  $("quizScore").textContent = `${quizCorrect} correct`;
  $("quizQuestion").textContent = question.q;
  $("quizFeedback").textContent = "";
  $("nextQuestion").textContent = "Next Question ➜";

  $("quizAnswers").innerHTML = question.a.map(
    (answer, index) => `
      <button class="answer-btn" data-answer="${index}">
        ${answer}
      </button>
    `
  ).join("");
}

$("quizAnswers").addEventListener("click", (event) => {
  const button = event.target.closest(".answer-btn");

  if (!button || answered) return;

  answered = true;

  const selected = Number(button.dataset.answer);
  const question = questions[currentQuestion % questions.length];

  const buttons = [
    ...$("quizAnswers").querySelectorAll(".answer-btn")
  ];

  buttons.forEach((item, index) => {
    item.disabled = true;

    if (index === question.correct) {
      item.classList.add("correct");
    }
  });

  if (selected === question.correct) {
    quizCorrect++;
    explorer.quizzes++;

    $("quizFeedback").textContent =
      "🎉 WOW! GREAT JOB! That's correct!";

    addXP(10, "Brilliant answer!");
    confetti(35);
  } else {
    button.classList.add("wrong");

    $("quizFeedback").textContent =
      `💪 Good try! The correct answer is ${question.a[question.correct]}. Keep learning!`;
  }

  saveData();
  updateStats();

  $("quizScore").textContent = `${quizCorrect} correct`;
});

$("nextQuestion").addEventListener("click", () => {
  currentQuestion++;
  showQuestion();
});

// MINI GAMES
function startGame() {
  explorer.games++;

  saveData();
  updateStats();
}

// MATH SPRINT
$("mathGame").addEventListener("click", () => {
  const a = Math.floor(Math.random() * 12) + 1;
  const b = Math.floor(Math.random() * 12) + 1;

  mathAnswer = a + b;

  $("gameStage").innerHTML = `
    <h3>🔢 Math Sprint!</h3>
    <p>What is ${a} + ${b}?</p>
    <input id="mathInput" type="number" placeholder="Your answer">
    <button id="checkMath">Check answer</button>
    <p id="mathFeedback"></p>
  `;

  startGame();

  $("checkMath").addEventListener("click", () => {
    const answer = Number($("mathInput").value);

    if ($("mathInput").value === "") {
      $("mathFeedback").textContent = "Enter an answer first!";
      return;
    }

    if (answer === mathAnswer) {
      $("mathFeedback").textContent =
        "🎉 AMAZING! You got it!";

      addXP(10, "Math star!");
      confetti(35);
    } else {
      $("mathFeedback").textContent =
        `Good try! The answer is ${mathAnswer}.`;
    }
  });
});

// MEMORY MATCH
$("memoryGame").addEventListener("click", () => {
  const symbols = ["🌟", "🚀", "🐼", "🎨"];

  memoryCards = [...symbols, ...symbols]
    .sort(() => Math.random() - 0.5);

  flippedCards = [];
  matchedPairs = 0;

  $("gameStage").innerHTML = `
    <h3>🧩 Memory Match!</h3>
    <p>Find all four matching pairs.</p>

    <div class="memory-grid">
      ${memoryCards.map((symbol, index) => `
        <button class="memory-card" data-index="${index}">
          ❔
        </button>
      `).join("")}
    </div>

    <p id="memoryFeedback">Find the matching pictures!</p>
  `;

  if (!$("memoryGameStyle")) {
    const style = document.createElement("style");
    style.id = "memoryGameStyle";

    style.textContent = `
      .memory-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        max-width: 340px;
        margin: 15px auto;
      }

      .memory-card {
        min-height: 55px;
        font-size: 25px;
        background: var(--surface) !important;
        color: var(--ink) !important;
        border: 2px solid var(--border) !important;
      }
    `;

    document.head.appendChild(style);
  }

  startGame();
});

// One click listener is enough for every Memory Match round.
$("gameStage").addEventListener("click", memoryClick);

function memoryClick(event) {
  const button = event.target.closest(".memory-card");

  if (!button || button.disabled || flippedCards.length === 2) {
    return;
  }

  const index = Number(button.dataset.index);

  button.textContent = memoryCards[index];
  button.disabled = true;

  flippedCards.push({ index, button });

  if (flippedCards.length === 2) {
    const [first, second] = flippedCards;

    if (memoryCards[first.index] === memoryCards[second.index]) {
      matchedPairs++;
      flippedCards = [];

      $("memoryFeedback").textContent = "✨ A match!";

      if (matchedPairs === 4) {
        $("memoryFeedback").textContent =
          "🏆 YOU DID IT! All pairs matched!";

        addXP(20, "Memory champion!");
        confetti(70);
      }
    } else {
      $("memoryFeedback").textContent =
        "Not a match. Try again!";

      setTimeout(() => {
        first.button.textContent = "❔";
        second.button.textContent = "❔";

        first.button.disabled = false;
        second.button.disabled = false;

        flippedCards = [];
      }, 750);
    }
  }
}

// WORD EXPLORER
$("wordGame").addEventListener("click", () => {
  const word = words[Math.floor(Math.random() * words.length)];

  $("gameStage").innerHTML = `
    <h3>🔤 Word Explorer</h3>
    <p>Your new word is:</p>
    <h2>${word[0]}</h2>
    <p>${word[1]}</p>
    <button id="wordDone">I learned a new word!</button>
  `;

  startGame();

  $("wordDone").addEventListener("click", () => {
    addXP(5, "New word discovered!");
    confetti(25);
  });
});

// WONDER FACTS
$("factGame").addEventListener("click", () => {
  const fact = facts[Math.floor(Math.random() * facts.length)];

  $("gameStage").innerHTML = `
    <h3>🌍 Wonder Facts</h3>
    <p>${fact}</p>
    <button id="factDone">That was amazing!</button>
  `;

  startGame();

  $("factDone").addEventListener("click", () => {
    addXP(5, "Curiosity earns rewards!");
    confetti(25);
  });
});

// START THE FIRST QUIZ
showQuestion();

// RESTORE A SAVED PROFILE
if (loadData()) {
  $("explorerName").value = explorer.name;
  $("ageGroup").value = explorer.age;

  document.querySelectorAll(".avatar").forEach(button => {
    button.classList.toggle(
      "selected",
      button.dataset.avatar === explorer.avatar
    );
  });

  showWelcome();
}