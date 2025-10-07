const words = [
    // spanish
    { text: "ventana", category: "Spanish" },
    { text: "puerta", category: "Spanish" },
    { text: "mesa", category: "Spanish" },
    { text: "silla", category: "Spanish" },
    { text: "reloj", category: "Spanish" },
    { text: "cuchara", category: "Spanish" },
    { text: "tenedor", category: "Spanish" },
    { text: "plato", category: "Spanish" },
    { text: "vaso", category: "Spanish" },
    { text: "camisa", category: "Spanish" },
    { text: "manzana", category: "Spanish" },
    { text: "pan", category: "Spanish" },
    { text: "queso", category: "Spanish" },
    { text: "pollo", category: "Spanish" },
    { text: "pescado", category: "Spanish" },
    { text: "arroz", category: "Spanish" },
    { text: "frijoles", category: "Spanish" },
    { text: "leche", category: "Spanish" },
    { text: "maiz", category: "Spanish" },
    { text: "naranja", category: "Spanish" },
    { text: "Taco", category: "Spanish" },


    // english
    { text: "library", category: "English" },
    { text: "school", category: "English" },
    { text: "beach", category: "English" },
    { text: "park", category: "English" },
    { text: "restaurant", category: "English" },
    { text: "city", category: "English" },
    { text: "mountain", category: "English" },
    { text: "river", category: "English" },
    { text: "store", category: "English" },
    { text: "street", category: "English" },
    { text: "love", category: "English" },
    { text: "freedom", category: "English" },
    { text: "dream", category: "English" },
    { text: "hope", category: "English" },
    { text: "peace", category: "English" },
    { text: "friendship", category: "English" },
    { text: "truth", category: "English" },
    { text: "fear", category: "English" },
    { text: "strength", category: "English" },
    { text: "success", category: "English" },

    // both
    { text: "hotel", category: "Both" },
    { text: "chocolate", category: "Both"},
    { text: "animal", category: "Both" },
    { text: "color", category: "Both" },
    { text: "radio", category: "Both" },
    { text: "doctor", category: "Both" },
    { text: "banana", category: "Both" },
    { text: "actor", category: "Both" },
    { text: "hospital", category: "Both" },
    { text: "pizza", category: "Both" },
    { text: "idea", category: "Both" },
    { text: "photo", category: "Both" },
    { text: "video", category: "Both" },
    { text: "total", category: "Both" },
    { text: "material", category: "Both" },
    { text: "final", category: "Both" },
    { text: "normal", category: "Both" },
    { text: "original", category: "Both" },
    { text: "personal", category: "Both" },
    { text: "manual", category: "Both" },
];

let score = 0;
let wordsAnswered = 0;
let currentWord;
let streak = 0;
const categoryStats = {
    Spanish: { correct: 0, total: 0 },
    English: { correct: 0, total: 0 },
    Both: { correct: 0, total: 0 }
};

const wordBox = document.getElementById("word-box");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const nextButton = document.getElementById("next");
const streakDisplay = document.createElement("div");
streakDisplay.id = "streak";
streakDisplay.style.fontSize = "1.5rem";
streakDisplay.style.margin = "10px 0";
streakDisplay.style.minHeight = "1.5rem"; 
streakDisplay.textContent=" ";
document.querySelector(".game").appendChild(streakDisplay)
let timer;
const timerDisplay = document.createElement("div");
timerDisplay.id = "timer";
timerDisplay.style.fontSize = "1.5rem";
timerDisplay.style.margin = "10px 0";
timerDisplay.style.minHeight = "1.5rem";
timerDisplay.textContent = " ";
document.querySelector(".game").appendChild(timerDisplay);
let highScore = localStorage.getItem("highscore") || 0;
const highScoreDisplay = document.getElementById("highScore");
highScoreDisplay.textContent = `High Score ${highScore}`;

const timePerWord = 10;

function startTimer() {
    clearInterval(timer);
    let timeLeft = timePerWord;
    timerDisplay.textContent = `Time: ${timeLeft}`;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            feedback.textContent = `Time's up! Its ${currentWord.category}.`;
            wordBox.style.color = "#9c4f4f";
            streak= 0;
            streakDisplay.textContent = `Streak: ${streak}`;
            nextButton.disabled = false;
            answered = true;
        }

    }, 1000);
}


let answered = false;
const totalWords = 20; 
function pickWord() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * words.length);
    } while(words[randomIndex] === currentWord);

    currentWord = words[randomIndex];
    wordBox.textContent = currentWord.text;
    feedback.textContent = " ";

    answered = false;
    nextButton.disabled = true;

    wordBox.classList.remove("bounce");
    void wordBox.offsetWidth;
    wordBox.classList.add("bounce");

    startTimer();
}

function checkAnswer(category) {
    if(!currentWord || answered) return;

    clearInterval(timer)
    answered = true;
    nextButton.disabled = false;
    wordsAnswered++;
    categoryStats[currentWord.category].total++;


    if (category === currentWord.category) {
        streak++;
        score++;
        feedback.textContent = "Correct!";
        categoryStats[currentWord.category].correct++;
        wordBox.style.color = "#5a8c60";

        if(streak % 3 === 0) {
            score += 2;
            feedback.textContent += ` Combo, +2 points!`;
        }
    } else {
        streak = 0;
        feedback.textContent = `Nope! It's ${currentWord.category}.`;
        wordBox.style.color= "#9c4f4f";
    }

    let percentCorrect = ((score / wordsAnswered) * 100).toFixed(1);
    scoreDisplay.textContent = `Score: ${score}`;
    streakDisplay.textContent = `Streak: ${streak}`;

    setTimeout(() => {
        wordBox.style.color = "#000000";
    }, 500);

    updateProgress();
}

const progressBar = document.getElementById("progress-bar");

function updateProgress() {
    let progress = (wordsAnswered / totalWords) * 100;
    progressBar.style.width = progress + "%";

    if(wordsAnswered >= totalWords) {
        /*feedback.textContent = `Finished! You got ${score} out of ${totalWords} words correct (${((score/totalWords)*100).toFixed(1)}%)`;*/
        nextButton.disabled = true;
        let percentOverall = ((score / totalWords) * 100).toFixed(1);
        let spanishStats = `${categoryStats.Spanish.correct}/${categoryStats.Spanish.total} Spanish`;
        let englishStats = `${categoryStats.English.correct}/${categoryStats.English.total} English`;
        let bothStats = `${categoryStats.Both.correct}/${categoryStats.Both.total} Both`;
        
        feedback.innerHTML = `
            <strong>Finished</strong><br>
            You got ${score} out of ${totalWords} words correct (${percentOverall}%)<br><br>
            <u>Category Stats:</u><br>
            ${spanishStats}<br>
            ${englishStats}<br>
            ${bothStats}
            `;

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            feedback.innerHTML = `<div class="new-highscore">New High Score!</div><br>` + feedback.innerHTML;
        }
    }
}

document.getElementById("spanish").addEventListener("click", () => checkAnswer("Spanish"));
document.getElementById("english").addEventListener("click", () => checkAnswer("English"));
document.getElementById("both").addEventListener("click", () => checkAnswer("Both"));
nextButton.addEventListener("click", () => {
    if (!answered) {
        feedback.textContent = "Answer first!";
        return;
    }
    pickWord();
});

const restartButton = document.getElementById("restart");

function restartGame() {
    score = 0;
    wordsAnswered = 0;
    answered = false;

    categoryStats.Spanish.correct = 0;
    categoryStats.Spanish.total = 0;
    categoryStats.English.correct = 0;
    categoryStats.English.total = 0;
    categoryStats.Both.correct = 0;
    categoryStats.Both.total = 0;


    scoreDisplay.textContent = `Score: 0`;
    streakDisplay.textContent = `Streak: 0`;
    feedback.textContent = "";
    progressBar.style.width = "0%";
    nextButton.disabled = true;
    timerDisplay.textContent = " ";
    clearInterval(timer);

    pickWord();
}
restartButton.addEventListener("click", restartGame);

pickWord();