const Questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Transfer Markup Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Tech Markup Language", correct: false },
      { text: "Hyperlink and Text Markup Language", correct: false },
    ],
  },
  {
    question: "Which of the following is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "JavaScript", correct: false },
      { text: "XML", correct: false },
    ],
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    answers: [
      { text: "let", correct: true },
      { text: "variable", correct: false },
      { text: "int", correct: false },
      { text: "declare", correct: false },
    ],
  },
  {
    question:
      "In CSS, what property is used to change the text color of an element?",
    answers: [
      { text: "text-color", correct: false },
      { text: "font-color", correct: false },
      { text: "color", correct: true },
      { text: "textColor", correct: false },
    ],
  },
  {
    question:
      "Which of the following is a programming language commonly used for web development?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Ruby", correct: false },
      { text: "JavaScript", correct: true },
    ],
  },
  {
    question: "What does the acronym CSS stand for?",
    answers: [
      { text: "Computer Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Creative Style Sheets", correct: false },
      { text: "Colorful Style Sheets", correct: false },
    ],
  },
  {
    question: "What is the purpose of the src attribute in the HTML <img> tag?",
    answers: [
      { text: "Source", correct: true },
      { text: "Style", correct: false },
      { text: "Script", correct: false },
      { text: "Synchronize", correct: false },
    ],
  },
  {
    question:
      "What is the purpose of media queries in the context of responsive web design?",
    answers: [
      { text: "To link external media files", correct: false },
      { text: "To query a database for media content", correct: false },
      {
        text: "To apply different styles based on device characteristics",
        correct: true,
      },
      { text: "To optimize media playback on web pages", correct: false },
    ],
  },
  {
    question: "What is the primary role of JavaScript in web development?",
    answers: [
      { text: "Styling", correct: false },
      { text: "Server-side processing", correct: false },
      { text: "Client-side scripting", correct: true },
      { text: "Database management", correct: false },
    ],
  },
  {
    question: "What does the term responsive web design refer to?",
    answers: [
      { text: "A website that responds to user input", correct: false },
      {
        text: "A website that adapts to different screen sizes and devices",
        correct: true,
      },
      { text: "A website with fast response times", correct: false },
      { text: "A website designed for quick loading", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerButtons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.style.display = "none";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = Questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${Questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < Questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < Questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
