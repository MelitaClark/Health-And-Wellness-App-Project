let questionNumber = 0;
let score = 0; 
//html for generating the questions...

function generateQuestion (){
  if (questionNumber < STORE.length) {
    let htmlString= `<div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form class="js-form">
    <fieldset>`;
    for (let i=0; i<4;i++ ){
      htmlString+=
      `<label class="answerOption">
      <input class="answerInput" type="radio" value="${STORE[questionNumber].answers[i]}" 
      name="answer" required>
      <span>${STORE[questionNumber].answers[i]}</span>
      </label>`;
    }
      htmlString+=`<button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;


    return htmlString;
  } else {
    renderResults();
    restartQuiz();
    $('.question-number').text(10);
  }
}

// to increment question number...
function incrementNumber() {
  if (questionNumber < STORE.length){
  questionNumber++;
  }
  $('.question-number').text(questionNumber+1);
}

function incrementScore(){
  score ++;
}

//start quiz button...
function startQuiz () {
  $('.start-button').on('click', '.letsStart',  function (event) {
    $('.start-page').remove();
    $('.question-answer-quiz').css('display', 'block');
    
    $('.question-number').text(questionNumber+1);
  });
}
//render question in DOM
function renderQuestion() {
  $('.question-answer-quiz').html(generateQuestion());
  $('.js-form').submit(event=>{
    event.preventDefault();
    userSelectAnswer();
  });
}
//when user selects answer...
function userSelectAnswer () {
  /*console.log('userSelectAnswer');*/
  //$('form').on('submit', function (event) { 
    /*console.log('selectAnswer2');*/
    //event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;

    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } 
    /*else if (answer ===undifined){
      $(".makeSelectionText")/*.html("Please make a selection")
    }*/else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  //});
}
function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();

}
function ifAnswerIsWrong(){
  userAnswerFeedbackWrong();
}
//for a correct answer...
function userAnswerFeedbackCorrect () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.question-answer-quiz').html(`<div class="correctFeedback"><div class="icon"><img class="answer-image" src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>You got it right!</b></p><button type=button class="nextButton" onclick="renderNextQuestion()">Next</button></div>`);
  
}

//for wrong answer...
function userAnswerFeedbackWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;

  let iconImage = `${STORE[questionNumber].icon}`;
  $('.question-answer-quiz').html(`<div class="correctFeedback"><div class="icon"><img class="answer-image" src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>You got it <span class=wrong>wrong</span></b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton" onclick="renderNextQuestion()">Next</button></div>`);
}

//update score...
function updateScore () {
  incrementScore();
  $('.score').text(score);
}

//when clicking next...
function renderNextQuestion () {
  //$('main').on('click', '.nextButton', function (event) {
    incrementNumber();
    renderQuestion();
    //userSelectAnswer();
  //});
}

  //page displayed at end of quiz...
function renderResults(){
  if(score >=8){
    $('.question-answer-quiz').html(`<div class="results correctFeedback"><h3>You're A Health Nut!</h3><p class=imageIcon><img class="answer-image" src="${FinalResultImages.ICONTROPHY}" alt="a picture of a gold trophy"/></p><p class= "score-display">You got ${score} / 10</p><p>Keep Up The Great Work!</p><button class="restartButton">Restart Quiz</button></div>`);
  }else if (score < 8 && score >= 5) {
    $('.question-answer-quiz').html(`<div class="results correctFeedback"><h3>So Close But No Nut!</h3><p class=imageIcon><img class="answer-image" src="${FinalResultImages.ICONDOBETTER}" alt="disappointed face"/></p><p class= "score-display">You got ${score} / 10</p><p>You Can Do Better Than That - Try IT Again!</p><button class="restartButton">Restart Quiz</button></div>`);
}else {
    $('.question-answer-quiz').html(`<div class="results correctFeedback"><h3>You might want to shape up and try again!</h3><p class=imageIcon>
    <img class="answer-image" src="${FinalResultImages.ICONTRYAGAIN}" alt="the words, try again"/></p><p class= "score-display">You got ${score} / 10</p><p>Drink some water, go for a walk and work your way up to health nut status!</p><button class="restartButton">Restart Quiz</button></div>`);
  }
}
//restart function...
function restartQuiz () {
  $('.question-answer-quiz').on('click', '.restartButton', function (event) {
    location.reload();
    
  });
}
//run functions...
function createQuiz () {
  startQuiz();
  renderQuestion();
  //userSelectAnswer();
  //renderNextQuestion();
}

$(createQuiz());