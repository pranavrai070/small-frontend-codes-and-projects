var buttonColours=["red", "blue", "green", "yellow"];

var userClickedPattern=[];

var gamePattern=[];

var started=false;

var level=0;

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.round(Math.random()*3);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);    
    playSound(randomChosenColour);
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
$("#"+currentColour).addClass("pressed");

setTimeout(function(){
$("#"+currentColour).removeClass("pressed")
},100);
}

$(document).keypress(function(){
    if(!started){                          //the logic of started is not clear.
       $("#level-title").text("Level " + level);     
       nextSequence();
       started=true;
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
               nextSequence();
            },1000);
        }
    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
          $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
