var startButton = document.querySelector('#start');
var timerElement = document.getElementById('timer');
var choicesElement = document.getElementById('choices');
var choicesTextElements = document.querySelectorAll('.choice-text');
var homeElement = document.getElementById('home');
var quizElement = document.getElementById('quiz');
var resultFeedback = document.getElementById('result-feedback');
var gameOverElement = document.getElementById('game-over');
var submitButton = document.querySelector('#submit');
var initialsElement = document.querySelector('#initials');
var questionElement = document.getElementById('question');
var highscoresList = document.querySelector('#highscores-list');

var questionCounter = 0; //set questionCounter = 0 so that i can keep track how many numbers of questions is been displayed
var timeLeft = 75; // set time to 75sec for begin the quiz
var questionIndex = 0; // set it= 0 to keep track which question is the user working on
var score = 0; // set socre = 0 at the begin and if user answer correct then score will add up
var currentQuestion = {}; // set empty{} for store questions
var availableQuestions = []; // empty arry[] use to sotre questions


// store the questions and right answer so that can display to user, at first sethow many points is worth and how many question i want and then write out my questions and answer 
var score_points = 20; // gave a var name score_point and set each question that = 20 points
var max_questions = 5; // the max question is 5
var questions = [ // array to store question and answer for broswer display
  {
    question: 'Commonly used data types DO NOT include:',
    choices: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts',
  },
  
  {
    question: "The condition in an if / else statement is enclosed with______.",
    choices: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
    answer: 'curly brackets',
  },

  {
    question: 'Arrays in JavaScript can be used to store________.',
    choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
    answer: 'all of the above',
  },

  {
    question: 'String values must be enclosed within_________when being assigned to variables.',
    choices: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
    answer: 'quotes',
  },

  {
    question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
    answer: 'console.log',
  }
];// array question and answer loop




// listenner method,  when click on startQuiz button the quiz begin 
startButton.addEventListener('click', () => {
  startQuiz();
});

// Start quiz function
function startQuiz() {
  // the next two line will display my next question with out it then the start quiz button will not work the first line hide the question the second line display the question after start the quiz
  homeElement.style.display = 'none'; // this is the start quiz page(home page) set it to noun to hide the questions
  quizElement.style.display = 'block'; // this is the quiz page set it to block  to make it visible


  
  questionCounter = 0; // set to 0 to keep track how many question is been asked. this code i already have at the top page of js file but i worted it again help make it easy to read and debug
  score = 0; // set to 0 at first and if answerd correct then socre go up.this code i already have at the top page of js file but i worted it again help make it easy to read and debug
  availableQuestions = [...questions]; //store my question in ...question so that my "var question" that i just worte can display on broswer.

  //timer: setinterval() method to count the time 
  timerInterval = setInterval(() => {
    timeLeft--; // time decreases
    timerElement.innerText = `Time: ${timeLeft}`; // display timeleft text to user

    if (timeLeft <= 0) { //if time hit 0 then clearInterval stop the time
      clearInterval(timerInterval);  // Stop the timer
      endQuiz();  // end the Quiz  
    }

  },1000); // 1000milliseconds = 1sec
  getNewQuestion();
}

// Get a new question function
function getNewQuestion() {
  // if the question hit 0 or answered all question set the time eaqual to 0 and end the quiz and return it 
  if (availableQuestions.length === 0 || questionCounter >= max_questions) {
    clearInterval(timerInterval);
    endQuiz();
    return;
  }

  questionCounter++;// move one the the next question
  var questionIndex = Math.floor(Math.random() * availableQuestions.length); 
  currentQuestion = availableQuestions[questionIndex];
  questionElement.innerText = currentQuestion.question;


  choicesTextElements.forEach((choice, index) => {
    choice.innerText = currentQuestion.choices[index];
    choice.parentElement.classList.remove('correct', 'incorrect');// after display the text thenremove it for the next question
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true; // set queal ture so that when i click the asnwer it will accept and take me to the next page
}



choicesElement.addEventListener('click', (e) => {
  if (acceptingAnswers === false) return;

  if (e.target.classList.contains('choice-text')) {
    acceptingAnswers = false;// set to false so it wont accept the answer muti times


    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.innerText;
    var classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect'; //set var for questions and answer to compare right or wrong then wirte a if statment to apporve answer

    if (classToApply === 'correct') {
      incrementScore(score_points); // if answer is correct increase the score by 20
      resultFeedback.style.display = 'block'; // display the result
      resultFeedback.innerText = 'Correct!'; // display correct text on the broswer
     
    } else {
      timeLeft -= 10; // -10sec if user answered  wrong
      if (timeLeft < 0) timeLeft = 0; // to aviod negative time count
      timerElement.innerText = `Time: ${timeLeft}`; //display timeleft on broswer
      resultFeedback.style.display = 'block';// display result
      resultFeedback.innerText = 'Wrong!'; // display wrong text on broswer

    }

    setTimeout(() => {
      getNewQuestion(); //after1 sec display new question
    }, 1000);
  }
});


// adding socore function
function incrementScore(num) {
  score = score + num;
}


function endQuiz() {
  quizElement.style.display = 'none';// hide the quizelement
  gameOverElement.style.display = 'block'; // display the all done page
  document.getElementById('final-score').innerText = score; // after the quiz end display the final socre points
}



submitButton.addEventListener('click', () => {
  var initials = initialsElement.value; // display user inital on the high socres page 
  var highscores = JSON.parse(localStorage.getItem('highscores')) || []; //after i submit then store my socre at the high socres page
 

  // set var new Score
  var newScore = {initials,score};// store init and score to make sure it display on high socres page
  

  highscores.push(newScore); // add newscore to highscores arry
  highscores.sort((a, b) => b.score - a.score);// scores from high to low
  localStorage.setItem('highscores', JSON.stringify(highscores));
  window.location.href = 'highscores.html';// display socare on browers
  
});
 // list high scores
function displayHighscores() {
  highscoresList.innerHTML = ''; // empty innerHTML for store new score data
  var highscores = JSON.parse(localStorage.getItem('highscores')) || []; // use localstoreage to store scores in array[]
  highscores.forEach((highscore, index) => { // foreach method 
    var li = document.createElement('li');
    li.innerText = `${index + 1}. ${highscore.initials} - ${highscore.score}`;
    highscoresList.appendChild(li);// list new socres use append way
  });
}
  



