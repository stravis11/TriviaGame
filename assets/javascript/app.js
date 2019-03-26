$(document).ready(function() {

    //Global variables
    var correct = 0;
    var incorrect = 0;
    var questionTime = 30;
    var timeID;
    var currentQuestion = 0;
    var currentObject = [];


    //Question and answer array
    var questionswArray = [{
        question: "What color is the sky?",
        options: ["Red","Blue","Green","Yellow"],
        answer: 1
    }, {
        question: "Why did the chicken cross the road?",
        options: ["She was bored","She was hungry","To get to the other side","Curiosity"],
        answer: 2
    }, {
        question: "How much could a woodchuck chuck if a woodchuck could chuck wood?",
        options: ["A lot","Not too much","None","I have no idea"],
        correct: 3
    }]



    //Start game event listener
    $("#startBtn").click(function() {
        // alert("Game started");
        $("startBtn").hide();
        timer();
        timeID = setInterval(timer,1000);
        console.log(timeID);
        startquiz();

    });


    //Timer function
    function timer() {
        if (questionTime !== 0) {
            questionTime--
            var $time = $("<h2>Time Remaining 00:" +questionTime+ " </h2>");
            $("#time").html($time);
        } else if (currentQuestion <= questionswArray.length) {
            $time = $("<h2>Times up! 00:00 </h2> ");
            $("#time").html($time);
            endgame();
        } else{
            $time = $("<h2>Game Over! ");
            $("#time").append($time);
            endgame();
        }

        
    }

    //Starting the trivia questions
        function startquiz () {
            //   $("#questions").html("Game started!"); 
            var quest = $("<h3>");
            currentObject = questionswArray[currentQuestion]
            quest.text(currentObject.question);
            var newDiv = $("<div>").attr("id", "Q");
            $("#questions").append(newDiv);
            $("#Q").append(quest);
            var newDiv2 = $("<div>").attr("id", "A");
            $("#question").append(newDiv2);

            for (var i = 0; i < currentObject.options.length; i++) {
                 var choices = $("<p>");
                choices.text(currentObject.options[i])
                $("#A").append(choices);
            };



        }

    //Game over function
    function endgame () {
        $("#questions").html("Game over!");  
      }

});