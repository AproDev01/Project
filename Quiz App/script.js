const questions = [
  {
    question: "Quel est le plus grand animal du monde ?",
    answers: [
      { text: "Requin", correct: false },
      { text: "Baleine bleue", correct: true },
      { text: "Éléphant", correct: false },
      { text: "Girafe", correct: false },
    ],
  },
  {
    question: "Quel est le plus petit pays du monde ?",
    answers: [
      { text: "Bhoutan", correct: false },
      { text: "Népal", correct: false },
      { text: "Vatican", correct: true },
      { text: "Sri Lanka", correct: false },
    ],
  },
  {
    question: "Quel est le plus grand désert du monde ?",
    answers: [
      { text: "Sahara", correct: false },
      { text: "Antarctique", correct: true },
      { text: "Gobi", correct: false },
      { text: "Kalahari", correct: false },
    ],
  },
  {
    question: "Quel est le plus petit continent ?",
    answers: [
      { text: "Afrique", correct: false },
      { text: "Asie", correct: false },
      { text: "Australie", correct: true },
      { text: "Arctique", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer_btn");
const nextButton = document.getElementById("next_btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Suivant";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  selectedBtn.classList.add(isCorrect ? "correct" : "incorrect");
  if (isCorrect) score++;
  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct === "true") button.classList.add("correct");
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `
    🎉 Bravo ! Vous avez obtenu <strong>${score}</strong> / ${questions.length}.
  `;
  nextButton.innerHTML = "Rejouer";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
