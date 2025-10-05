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
let currentWord;

const wordBox = document.getElementById("word-box");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const nextButton = document.getElementById("next");

function pickWord() {
    /*const randomIndex = Math.floor(Math.random() * words.length);*/
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * words.length);
    } while(words[randomIndex] === currentWord);

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