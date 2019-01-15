'use strict';

// "Questions Array" (data). Stores questions, possible answers, and the index value of correct answer:

let STORE = [
    {question : "Who was the founder of Nintendo?", firstA: "Mariya Takeuchi", secondA: "Bruce Lee", thirdA: "Fusajiro Yamauchi", fourthA: "Akira Kurosawa", correct: 3},

    {question: "What was the original business of the company?", firstA: "Running 'love hotels'", secondA: "A takoyaki chain store", thirdA: "Making parts for Game & Watch devices", fourthA: "Producing 'hanafuda' playing cards", correct: 4},

    {question: "When did Mario first appear in a video game?", firstA: "In 1981, as Jumpman", secondA: "In 1987, as Marco", thirdA: "In 1983, as Master Plumber", fourthA: "In 1990, as Mario", correct: 1},

    {question: "What was the name of the company's famous 16-bit processor console?", firstA: "Saturn", secondA: "Omega Drive", thirdA:"Mega Drive", fourthA:"Super Famicom/SNES", correct: 4},
    
    {question: "Who is Zelda?", firstA:"A rebel goomba in the Mushroom Kingdom", secondA:"A blonde young warrior usually wearing green clothes", thirdA:"The chief of Kakariko Village", fourthA:"A gifted member of Hyrule's royal family", correct: 4},

    {question: "Which of the following were games produced with direct involvement of Shigeru Miyamoto?", firstA:"Hotel Mario, Super Smash Brothers and Super Metroid", secondA:"Pilotwings, Super Mario RPG and Donkey Kong Country", thirdA:"Kirby’s Dream Land, Castlevania and Wave Race 64", fourthA:"Starcraft, Twinsen’s Odyssey LBA2 and Bloodborne", correct: 2},

    {question:"Which of the following is typically mentioned as one of the best video games ever made?", firstA:"The Legend of Zelda: Ocarina of Time", secondA:"Star Fox Zero", thirdA:"Super Mario Bros 2", fourthA: "Donkey Kong Country", correct: 1},

    {question:"Which of the following world-famous franchises was born from a Nintendo game?", firstA:"Dragon Ball", secondA:"Pokèmon", thirdA:"Metal Gear", fourthA: "One Piece", correct: 2},

    {question:"Who is the funniest iconic Nintendo character and why is it Wario?", firstA:"I don't know", secondA:"Wario, because of his weird face, poor manners and obsession with money", thirdA:"Toad, because of his expressive face and deep personality", fourthA:"Lakitu, the camera man", correct: 2},

    {question:"Which of the following is among the usual complaints against the company nowadays?", firstA:"Games too easy to beat, aesthetics excessively ‘kiddy’", secondA:"Too much 'money grabbing' through DLC’s and pay-to-win schemes", thirdA:"Themes and characters too politically charged", fourthA:"The first-party catalog has become almost non-existent", correct: 1}

];

// Stores counters for question number and score:

let counters = {
    qCount: 0,
    pCount: 0
};

//Defines HTML format for questions and possible answers:

function questionFormat (item){
    console.log("questionFormat ran");
    
    return `
    
        <section class="welcome questions feedback renadj-one">
            <h1 class="question-text">${item.question}</h1>
        </section>
        <section class="questions-sect">
            <div class="form-cont-div" role="container">
                <form id="form" class="form">
                    <div class="option-cont">
                        <input type="radio" name="answer" id="first" class="radio" role="radio" required>
                        <label for="first">${item.firstA}</label>
                    </div>
                    <div class="option-cont">
                        <input type="radio" name="answer" id="second" class="radio" role="radio" required>
                        <label for="second">${item.secondA}</label>
                    </div>
                    <div class="option-cont">
                        <input type="radio" name="answer" id="third" class="radio" role="radio" required>
                        <label for="third">${item.thirdA}</label>
                    </div>
                    <div class="option-cont">
                        <input type="radio" name="answer" id="fourth" class="radio" role="radio" required>
                        <label for="fourth">${item.fourthA}</label>
                    </div>
                    
                    <div class="start-next">
                        <input type="submit" class="submit-input" id="submit" role="button">
                    </div>
                </form>
            </div>
        </section>
            `
}

// When called, applies HTML format to "Questions Array (data)"

function formattingQuestionData (dataArr, format){
    console.log("formattingQuestionData ran");
    let formattedQ_arr = dataArr.map((item) => format(item));
    return formattedQ_arr;
    
}

//Defines HTML format for positive Feedback

function positiveFeedback(correctAnswer){

    return `
        <section class="welcome questions feedback renadj-two">
            <h1 class="question-text">Correct!</h1>
        </section>
        <section class="start next">
            <div class="start-next-cont" role="container">
                <button type="button" class="nextQ-input js-nextQ-input" id="next-question" role="button">
            </div>
        </section>

    `
}

//Defines HTML format for negative Feedback

function negativeFeedback(correctAnswer){
    return `
        <section class="welcome questions feedback renadj-two">
            <h1 class="question-text">Wrong!, the correct answer was </h1> <h2>"${correctAnswer}"</h2>
        </section>
        <section class="start next">
            <div class="start-next-cont" role="container">
                <button type="button" class="nextQ-input js-nextQ-input" id="next-question" role="button">
            </div>
        </section>
    `
}

// Defines HTML format for Final Results

function results(pointsEarned){
    return `
        <section class="welcome questions feedback renadj-three">
            <h1 class="question-text">Finished!</h1>
            <h2>Your total score is ${pointsEarned}/10.</h2>
        </section>
        <section class="reload-sec">
            <div class="reload-div">
                <label for="reload-input">Click your 1up to try again:</label>
                <input type="submit" class="reload-input js-reload-input" id="reload-input">
            </div>
        </section>
    `
}

// When called, triggers the formatting of Questions Array (data) and renders one question in HTML

function renderQuestion (){
    console.log("renderQuestion ran");
    let post = formattingQuestionData(STORE, questionFormat);
    $("main").empty();
    $("main").html(post[counters.qCount]);
    }

// When called, updates the "Info in <header>" about question number and score

function renderInfo(){
    console.log("renderInfo ran");
    $(".js-question-number-td, .js-score-td").empty();
    $(".js-question-number-td").html(`${counters.qCount+1} / 10`);
    $(".js-score-td").html(`${counters.pCount} / 10`);
    
}

// Defines whether to render positive or negative feedback

function renderFeedback (){
    console.log("renderFeedback ran");
    let radios  = document.getElementsByName("answer");
        if (counters.qCount < STORE.length && radios[STORE[counters.qCount]["correct"]-1].checked){ 
            
            $("main").empty();
            $("main").html(positiveFeedback());
            counters.pCount++;
            
            console.log("points:"+counters.pCount+"/10");
        } else if (counters.qCount < STORE.length){
            $("main").empty();
            
            let rightAnswer = Object.values(STORE[counters.qCount])[STORE[counters.qCount].correct];
            console.log(rightAnswer);
            $("main").html(negativeFeedback(rightAnswer));
            
        } 
}

// When called, renders final results of the quiz

function renderResults (){
    console.log("renderResults ran");
    
    $("main").empty();
    $("main").html(results(counters.pCount));
           
}

// The following functions handle: 1. rendering of next question/final results; 2. rendering of feedback; 3. restarting the quiz. 

function begin(){
    console.log("begin ran");

    $("main").on("click", ".js-start-input, .js-nextQ-input", function(event){ 
        if (counters.qCount < STORE.length){
            event.preventDefault();
            renderQuestion();
            renderInfo();
            } else {renderResults();}
        })
}

function handleSubmit(){
    $("main").on("submit", "form", function(event){ 
        event.preventDefault();
        renderFeedback();
        renderInfo();
        counters.qCount++;
    })
}

function restart(){
    $("main").on("click", ".js-reload-input", function(event){
        location.reload();
    })
}

function handleQuiz(){
    begin();
    handleSubmit();
    restart();
}


$(handleQuiz);

