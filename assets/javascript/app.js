$(document).ready(function () {

    //Global variables
    var correct = 0;
    var incorrect = 0;
    var questionTime = 30;
    var timeID;
    var currentQuestion = 0;
    var currentObject = [];
    var logic = false;
    var txt;


    //Question and answer array
    var questionsArray = [{
        question: "What color is the sky?",
        options: ["Red", "Blue", "Green", "Yellow"],
        answer: 1
    }, {
        question: "Why did the chicken cross the road?",
        options: ["She was bored", "She was hungry", "To get to the other side", "Curiosity"],
        answer: 2
    }, {
        question: "How much could a woodchuck chuck if a woodchuck could chuck wood?",
        options: ["A lot", "Not too much", "None", "I have no idea"],
        answer: 3
    }, {
        question: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, provident?",
        options: ["amet", "consectetur", "dolor", "adipisicing"],
        answer: 3
    }, {
        question: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, dignissimos?",
        options: ["amet", "consectetur", "dolor", "adipisicing"],
        answer: 2
    }, {
        question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, iure!",
        options: ["amet", "consectetur", "dolor", "adipisicing"],
        answer: 1
    }]



    //Start game event listener
    $("#startBtn").click(function () {
        // alert("Game started");
        $("#startBtn").hide();
        timer();
        timeID = setInterval(timer, 1000);
        console.log(timeID);
        startquiz();

    })


    //Timer function
    function timer() {
        if (questionTime !== 0) {
            questionTime--
            var $time = $("<h2>Time Remaining 00:" + questionTime + " </h2>");
            $("#time").html($time);
        } else {
            if (currentQuestion <= 5) {
                $time = $("<h2>Times up! 00:00 </h2> ");
                $("#time").html($time);
                endgame();
            } else {
                $time = $("<h2>Game Over! </h2>");
                $("#time").append($time);
                endgame();
            }
        }

    };

    //Starting the trivia questions
    function startquiz() {
        //   $("#questions").html("Game started!");
        $("#questions").empty();
        var quest = $("<h3>");
        currentObject = questionsArray[currentQuestion]
        quest.text(currentObject.question);
        var newDiv = $("<div>").attr("id", "Q");
        $("#questions").append(newDiv);
        $("#Q").append(quest);
        var newDiv2 = $("<div>").attr("id", "A");
        $("#questions").append(newDiv2);

        for (var i = 0; i < currentObject.options.length; i++) {
            var choices = $("<p>");
            choices.text(currentObject.options[i]);
            $("#A").append(choices);
        };

        $("#A").css({ 'padding': '15px', 'width': '30%', 'margin': '0 auto' });


        $('#A p').on({

            mouseover: function () {
                $(this).css({
                    backgroundColor: "lightblue", fontSize: "20px",
                    border: '1px solid black'
                })
            },
            mouseout: function () {
                $(this).css({ backgroundColor: "", fontSize: "", border: '' })
            },
            click: function () {


                if ($(this).text() === currentObject.options[currentObject.answer]) {

                    console.log('Correct!');
                    $(this).css({ color: "green" });
                    logic = true;
                    setTimeout(nextquestion, 2000);

                } else {
                    $(this).css({ color: "red" });
                    txt = currentObject.options[currentObject.answer];
                    logic = false;
                    setTimeout(nextquestion, 2000);
                }
            }
        });
    }

    //Next question function

    function nextquestion() {
        if (logic) {
            $("#questions").empty();
            correct++
            $("#questions").html("<h4>Keep it up!</h4>");

        } else {
            $("#questions").empty();
            incorrect++
            $("#questions").html("<h3>Sorry, that's wrong. The correct answer was: " + txt + ". Try again.</h3>");
            
        }
        if (currentQuestion <= 4) {
            currentQuestion++
            setTimeout(startquiz, 4000);
            questionTime = 34;
        } else {
            endgame();
        }
    }


    //Game over function
    function endgame() {
        $("#questions").empty();
        clearInterval(timeID);
        $("#questions").append("<h4>That was a fun game!</h4>");
        $("#questions").append("<h3>Correct answers: " + correct + "<br></br>Wrong answers: " + incorrect + "</h3>");
        var $btn = $("<button>").attr("id", "startover").text("Start Over");
        $("#time").prepend($btn);
        console.log("endgame");


        //Game over button
        $("#startover").click(function () {
            $("#startover").hide();
            restart();
            console.log("startover");
        })
    }


    //Restart function
    function restart() {
        correct = 0;
        incorrect = 0;
        questionTime = 30;
        currentQuestion = 0;
        timer();
        timeID = setInterval(timer, 1000);
        startquiz();
        console.log("restart");
    }
})