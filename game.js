const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let triggered = 0;

const playSound = (audioName) => {
  const audio = new Audio("sounds/" + audioName + ".mp3");
  audio.play();
  audio.volume = 0.2;
}

const nextSequence = () => {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomColor = buttonColors[randomNumber];
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


const animatePress = (currentColor) => {
  $("#" + currentColor).addClass("pressed");

  setTimeout( () => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keydown( () => {
  if (triggered < 1) {
    nextSequence();
  }
  triggered++
  console.log("triggered");
});

const checkAnswer = (currentLevel) => {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("succes");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout( () => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');

    $("body").addClass("game-over");
    setTimeout( () => {
      $("body").removeClass("game-over");
    }, 180);

    $("h1").text("Game Over, Press Any Key to Restart.");

    startOver();
  }
  console.log(userClickedPattern);
  console.log(gamePattern);
}

const startOver = () => {
  level = 0;
  gamePattern = [];
  triggered = 0;
}