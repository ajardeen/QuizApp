// Define the quiz data in an array of objects
var data = [
  {
    question: "What is the short form of Hypertext Markup Language?",
    options: ["HTML", "CSS", "JS", "PHP"],
    answer: "HTML",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "What does JS stand for?",
    options: ["JSON Schema", "JavaScript", "JavasScript", "JavaStyle"],
    answer: "JavaScript",
  },
  {
    question: "What does PHP stand for?",
    options: [
      "Personal Home Page",
      "Hypertext Preprocessor",
      "Programming Hypertext Processor",
      "Private Home Page",
    ],
    answer: "Hypertext Preprocessor",
  },
];

let currentQuestionIndex = 0; // question starts with 0 index
const totalQuestions = data.length; // finding total questions in the data array

var countDownElement = document.getElementById("count-down");
// time limit to answer the each question
var timeLeft = 60;
function startCountDown(message) {
  function timer() {
    var timer = setInterval(function () {
      if (timeLeft < 0) {
        clearInterval(timer);
        countDownElement.textContent = "Time is up";
      } else {
        countDownElement.textContent = "TimeLeft :" + timeLeft + " seconds";
        timeLeft--;
      }
    }, 1000);
  }

  if (message === "clickedNext") {
    timeLeft = 60;
    // timer = null;
    clearInterval(timer);
  } else if (message === "pageLoaded") {
    timer();
  }
}
startCountDown("pageLoaded");
const question = document.getElementById("question");
const optionbtns = document.querySelectorAll(".option-btns,.btn");
const choice0 = document.getElementById("choice0");
const choice1 = document.getElementById("choice1");
const choice2 = document.getElementById("choice2");
const choice3 = document.getElementById("choice3");

// this function is used to remove the previous selected answer effects
function removedSelectedAnswerEffects() {
  optionbtns.forEach((element, index) => {
    element.style.backgroundColor = "#fff";
  });
}
let answerChosen = "";
let result = [];
const Next = document.getElementById("next");

// this function is used to insert the question and answer options in the html page
function insertQuestion() {
  let index = currentQuestionIndex;
  question.textContent = data[index].question; //inserting question
  choice0.textContent = data[index].options[0]; //inserting first option
  choice1.textContent = data[index].options[1]; //inserting second option
  choice2.textContent = data[index].options[2]; //inserting third option
  choice3.textContent = data[index].options[3]; //inserting fourth option

  // this function is used to check the answer is correct or not
  optionbtns.forEach((element, index) => {
    element.addEventListener("click", function () {
      let selectedAnswer = element.children[0].textContent;
      Next.disabled = false;
      Next.style.backgroundColor = "var(--next-btn-color)";
      removedSelectedAnswerEffects();
      element.style.backgroundColor = "#64f9ae";
      answerChosen = selectedAnswer;
    });
  });
}

insertQuestion();
disableNextButton();
function disableNextButton() {
  Next.disabled = true;
  Next.style.backgroundColor = "transparent";
}

Next.addEventListener("click", function () {
  if (totalQuestions > currentQuestionIndex) {
   if (Next.textContent == "Next"){
      timeLeft = 60;
      startCountDown("clickedNext");
      disableNextButton();
      removedSelectedAnswerEffects();
      result.push(answerChosen);
      currentQuestionIndex++;
      insertQuestion();
      if (currentQuestionIndex + 1 == totalQuestions) {
        Next.textContent = "Submit";
      }
    } else if (Next.textContent == "Submit") {
        console.log(result);
        
       resultPage();
     } 
  }
});


const quiz = document.getElementById("quiz");
const quizbox = document.querySelector(".quiz-box");
function resultPage() {
    let totalMarks = result.reduce((acc, element,index) => {
        console.log(data[index].answer,element);
        if( data[index].answer === element) {
            return acc + 2;
        }
    }, 0);
    console.log(totalMarks);
    
  quiz.style.display = "none";
  let div = document.createElement("div");
  div.setAttribute("id", "result");
  quizbox.appendChild(div);
  div.innerHTML = `
         <span>
          <h1>RESULTS</h1>
          <hr/>
          <h3>Total Questions : ${totalQuestions}</h3>
          <h3>Total Marks : ${totalMarks}/${totalQuestions*2}</h3>
        </span>
    `;
}

// not completed answer validation