var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var triggered = 0;

function playSound(audioName) {
  var audio = new Audio("sounds/" + audioName + ".mp3");
  audio.play();
  audio.volume = 0.2;
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeOut(100).fadeIn(100);

  playSound(randomColor);
  // gives a sound to the random color if it fades in and out.

  $("#level-title").text("Level " + level);
  level++;

  userClickedPattern = [];
}

$(".btn").click(function () {
  var userChosenColor = this.id; // see the id of the color by click.
  userClickedPattern.push(userChosenColor); //adds the id's to the userClickedPattern array everytime you click a color.
  //called back for clicking to use playSound on the color clicked.
  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keydown(function () {
  if (triggered < 1) {
    nextSequence();
  }
  triggered++
  console.log("triggered");
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("succes");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 180);

    $("h1").text("Game Over, Press Any Key to Restart.");

    startOver();
  }
  console.log(userClickedPattern);
  console.log(gamePattern);
}

function startOver() {
  level = 0;
  gamePattern = [];
  triggered = 0;
}