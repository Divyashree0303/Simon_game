var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

$(document).one("keypress", nextSequence);

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
  animatePress(randomChosenColor);
  level++;
  $("h1").text("Level " + level);

}

$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);


  checkAnswer(userClickedPattern.length - 1);

});



function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

function checkAnswer(numberOfClicks) {

  if (gamePattern[numberOfClicks] == userClickedPattern[numberOfClicks]) {

    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }

  } else {
    gameOver("wrong");
  }

}

function gameOver(status) {

  $("h1").text("Gameover,press any key to restart");
  $("h1").addClass("game-over");
  playSound(status);

  $(document).keypress(function() {
    $("h1").removeClass("game-over")
    gamePattern = [];
    level = 0;
    userClickedPattern = [];
    nextSequence();
  });

}
