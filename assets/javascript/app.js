$(document).ready(function() {

    //Global variables
    var questions = [{
        question: "What color is the sky?",
        choices: ["Red","Blue","Green","Yellow"],
        answer: 1
    }, {
        question: "Why did the chicken cross the road?",
        choices: ["She was bored","She was hungry","To get to the other side","Curiosity"],
        answer: 2
    }, {
        question: "How much could a woodchuck chuck if a woodchuck could chuck wood?",
        choices: ["A lot","Not too much","None","I have no idea"],
        correct: 3
    }]



    //Start game event listener
    $("#startBtn").click(function() {
        alert("Game started");
    });



});