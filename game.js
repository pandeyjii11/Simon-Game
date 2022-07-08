
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {
    if(started === false) {
        $("#level-title").text("level "+level);
        nextSequence();
        started = true;
    }
});

$('.btn').click(function() {
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        // console.log("Success");
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function() {
                nextSequence()
            }, 1000);
        }
    }
    else {
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        startOver();
        // console.log("Wrong");
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).delay(100).fadeOut().fadeIn('slow');
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/"+ name +".mp3"); 
    audio.play();
}

function animatePress(currentColor) {

    // console.log("entering the funstion");

    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}


