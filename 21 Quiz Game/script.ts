interface IQuizData {
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  correct: string;
}

const quizData: IQuizData[] = [
  {
    question: "What is the most used programming language in 2019?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "Who is the President of US?",
    a: "Florin Pop",
    b: "Donald Trump",
    c: "Ivan Saldano",
    d: "Mihai Andrei",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Cascading Style Sheet",
    c: "Jason Object Notation",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
];

let currentQuestion: number = 0;

const quiz: HTMLElement = document.getElementById("quiz");
const answerEls: NodeList = document.querySelectorAll(".answer");
const questionEl: HTMLElement = document.getElementById("question");

const a_text: HTMLElement = document.getElementById("a_text");
const b_text: HTMLElement = document.getElementById("b_text");
const c_text: HTMLElement = document.getElementById("c_text");
const d_text: HTMLElement = document.getElementById("d_text");

const btnSubmit: HTMLElement = document.getElementById("submit");

function loadQuiz() {
  const currentQuizData = quizData[currentQuestion];
  questionEl.innerHTML = currentQuizData.question;

  a_text.innerHTML = currentQuizData.a;
  b_text.innerHTML = currentQuizData.b;
  c_text.innerHTML = currentQuizData.c;
  d_text.innerHTML = currentQuizData.d;
}

loadQuiz();

btnSubmit.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuiz();
  } else {
    // show result
  }
});

// answerEls.forEach((ele) => {
//   ele.addEventListener("checkCheckbox", () => {
//     console.log(" => ", ele);
//   });
// });
