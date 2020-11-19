var quizData = [
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
var quiz = document.getElementById("quiz");
var answerEls = document.querySelectorAll(".answer");
var questionEl = document.getElementById("question");
var a_text = document.getElementById("a_text");
var b_text = document.getElementById("b_text");
var c_text = document.getElementById("c_text");
var d_text = document.getElementById("d_text");
var btnSubmit = document.getElementById("submit");
var currentQuestion = 0;
var score = 0;
function loadQuiz() {
    deselectAnswers();
    var currentQuizData = quizData[currentQuestion];
    questionEl.innerHTML = currentQuizData.question;
    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;
}
loadQuiz();
btnSubmit.addEventListener("click", function () {
    // check to see the answer
    var answer = getSelectedAnswer();
    if (answer) {
        if (answer === quizData[currentQuestion].correct) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuiz();
        }
        else {
            quiz.innerHTML = "\n        <h2 class='final'>You answered correctly at " + score + "/" + quizData.length + " questions.</h2>\n        <button onclick=\"location.reload()\">Reload</button>\n        ";
        }
    }
});
// get answer
function getSelectedAnswer() {
    var answer = "";
    answerEls.forEach(function (answerEl) {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}
//
function deselectAnswers() {
    answerEls.forEach(function (answerEl) {
        answerEl.checked = false;
    });
}
