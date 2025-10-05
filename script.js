const words = [
    { text: "Taco", category: "Spanish" },
    { text: "Library", category: "English" },
    { text: "Pozole", category: "Spanish" },
    { text: "Hotel", category: "Both" },
    {text: "Chocolate", category: "Both"},
];

let score = 0;
let currentWord;

const wordBox = document.getElementById("word-box");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const nextButton = document.getElementById("next");

function pickWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];
    wordBox.textContent = currentWord.text;
    feedback.textContent = " ";

    wordBox.classList.remove("bounce");
    void wordBox.offsetWidth;
    wordBox.classList.add("bounce");
}

function checkAnswer(category) {
    if(!currentWord) return;
    if (category === currentWord.category) {
        feedback.textContent = "Correct!";
        score++;
    } else {
        feedback.textContent = `Nope! It's ${currentWord.category}.`;
    }
    scoreDisplay.textContent = `Score: ${score}`;
}

document.getElementById("spanish").addEventListener("click", () => checkAnswer("Spanish"));
document.getElementById("english").addEventListener("click", () => checkAnswer("English"));
document.getElementById("both").addEventListener("click", () => checkAnswer("Both"));
nextButton.addEventListener("click", pickWord);

pickWord();