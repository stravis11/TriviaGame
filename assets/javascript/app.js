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
        question: "What is Rick's last name?",
        options: ["Sanchez", "Smith", "Jones", "Williams"],
        answer: 0
    }, {
        question: "What is Beth's profession?",
        options: ["Dentist", "Horse Surgeon", "Pilot", "Accountant"],
        answer: 1
    }, {
        question: "What does Rick use to travel between universes?",
        options: ["Warp Drive", "Stargate", "Portal Gun", "TARDIS"],
        answer: 2
    }, {
        question: "What's the name of the happy-go-lucky blue colored creature that disappears after solving your problem?",
        options: ["Squanchy", "Jerry", "Mr. Meeseeks", "Bill"],
        answer: 2
    }, {
        question: "What is the name of Rick's half-avian half-human best friend?",
        options: ["Falcon Man", "Bird Person", "Hawk Guy", "Big Bird"],
        answer: 1
    }, {
        question: "This Freddy Kruger-like character shows up in Lawnmower Dog.",
        options: ["Scary Terry", "Angry Bob", "Terrifying Tom", "Spooky Sam"],
        answer: 0
    }]

    //Image arrays
    var imagesCorrect = ["question0.png", "question1.png", "question2.png", "question3.png", "question4.png", "question5.png"]
    var imagesIncorrect = ["wrong1.png","wrong2.png","wrong3.png"]

    //Start game event listener
    $("#startBtn").click(function () {
        // alert("Game started");
        $("#startBtn").hide();
        timer();
        timeID = setInterval(timer, 1000);
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
        $("#questions").empty();
        var quest = $("<h3>");
        currentObject = questionsArray[currentQuestion]
        quest.text(currentObject.question);
        var newDiv = $("<div>").attr("id", "Q");
        $("#questions").append(newDiv);
        $("#Q").append(quest);
        var newDiv2 = $("<div>").attr("id", "A");
        $("#questions").append(newDiv2);

        //Display answer choices
        for (var i = 0; i < currentObject.options.length; i++) {
            var choices = $("<p>");
            choices.text(currentObject.options[i]);
            $("#A").append(choices);
        };

        $("#A");
        
        $('#A p').on({
            //Mouse highlight for answer choices
            mouseover: function () {
                $(this).css({
                    backgroundColor: "#aaa",
                    border: "1px solid black",
                    borderRadius: "15px"                  
                })
            },
            mouseout: function () {
                $(this).css({ backgroundColor: "", fontSize: "", border: '' })
            },
            click: function () {     
                if ($(this).text() === currentObject.options[currentObject.answer]) {
                    logic = true;
                    setTimeout(nextquestion, 2000);
                } else {
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
            $("#questions").html("<h4>That's right! Wubba Lubba dub-dub! </h4>");
            //Change image for correct answer
            var randImage = imagesCorrect[correct];
            document.getElementById('questionimage').src = "assets/images/" + randImage;           
        } else {
            $("#questions").empty();
            incorrect++
            $("#questions").html("<h3>Wrong! The correct answer was: " + txt + "</h3>");
            //Change image for incorrect answer
            var randImage = imagesIncorrect[Math.floor(Math.random() * imagesIncorrect.length)];
            document.getElementById('questionimage').src = "assets/images/" + randImage;
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
        clearInterval(questionTime);
        $("#questions").append("<h3>That was a fun game!</h3>");
        document.getElementById('questionimage').src = "assets/images/gameover.png"; 
        $("#questions").append("<h3>Correct answers: " + correct + "<br></br>Wrong answers: " + incorrect + "</h3>");
        var $btn = $("<button>").attr("id", "startover").text("Start Over");
        $("#questions").prepend($btn);

        //Game over button
        $("#startover").click(function () {
            $("#startover").hide();
            restart();
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
    }
})