// 1. Questions Array
const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: ["font-color", "text-color", "color", "background-color"],
        answer: "color"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<js>", "<script>", "<javascript>", "<scripting>"],
        answer: "<script>"
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        options: ["msg('Hello World');", "alertBox('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
        answer: "alert('Hello World');"
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        options: ["*", "-", "=", "x"],
        answer: "="
    }
];

// State variables
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;
let answerSelected = false;

// DOM Elements
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

// 2. Shuffle Questions Function
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

// 3. Start Timer Function
function startTimer() {
    clearInterval(timer); // Clear any existing timer
    timeLeft = 15;
    timerElement.textContent = `Time: ${timeLeft}s`;
    
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!answerSelected) {
                // Time's up! Reveal answer and move to feedback state
                revealAnswer(null);
            }
        }
    }, 1000);
}

// 4. Display Question Function
function displayQuestion() {
    answerSelected = false;
    feedbackElement.classList.add("hidden");
    feedbackElement.className = "feedback hidden";
    nextBtn.classList.add("hidden");
    
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    
    optionsContainer.innerHTML = "";
    
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option-btn";
        button.onclick = () => checkAnswer(button, option);
        optionsContainer.appendChild(button);
    });

    startTimer();
}

// 5. Check Answer Function
function checkAnswer(selectedBtn, selectedOption) {
    if (answerSelected) return; // Prevent multiple clicks
    answerSelected = true;
    clearInterval(timer); // Stop timer when answered

    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;
    const allButtons = document.querySelectorAll(".option-btn");

    if (selectedOption === correctAnswer) {
        selectedBtn.classList.add("correct");
        score++;
        scoreElement.textContent = score;
        feedbackElement.textContent = "Correct!";
        feedbackElement.classList.add("correct-text");
    } else {
        selectedBtn.classList.add("wrong");
        feedbackElement.textContent = `Incorrect. The correct answer was: ${correctAnswer}`;
        feedbackElement.classList.add("wrong-text");
        
        // Highlight the correct answer
        allButtons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add("correct");
            }
        });
    }

    // Disable all buttons
    allButtons.forEach(btn => btn.disabled = true);

    feedbackElement.classList.remove("hidden");
    
    // Show next button or finish
    nextBtn.classList.remove("hidden");
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = "Finish Quiz";
    } else {
        nextBtn.textContent = "Next Question";
    }
}

// Function to handle timeout scenario
function revealAnswer(selectedOption) {
    answerSelected = true;
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;
    const allButtons = document.querySelectorAll(".option-btn");

    feedbackElement.textContent = `Time's up! The correct answer was: ${correctAnswer}`;
    feedbackElement.classList.add("wrong-text");

    allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correctAnswer) {
            btn.classList.add("correct");
        }
    });

    feedbackElement.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = "Finish Quiz";
    }
}

// 6. Next Question Function
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        // Quiz Finished
        clearInterval(timer);
        questionText.textContent = "Quiz Completed!";
        optionsContainer.innerHTML = "";
        feedbackElement.classList.add("hidden");
        nextBtn.classList.add("hidden");
        timerElement.textContent = "Done";
        
        // Update footer message
        const footer = document.querySelector("footer p");
        footer.innerHTML = `Final Score: <strong>${score} / ${questions.length}</strong>`;
        footer.style.color = "#4CAF50";
        footer.style.fontSize = "1.2rem";
    }
}

// 7. Start Quiz Function
function startQuiz() {
    shuffleQuestions();
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = score;
    displayQuestion();
}

// Initialize the quiz when the page loads
window.onload = startQuiz;