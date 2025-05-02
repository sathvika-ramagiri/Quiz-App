const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Machine Language"],
        correctAnswer: 0
    },
    {
        question: "Which programming language is known as the backbone of web development?",
        options: ["Python", "JavaScript", "C++", "Ruby"],
        correctAnswer: 1
    },
    {
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
        correctAnswer: 1
    },
    {
        question: "Which data structure uses the LIFO principle?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correctAnswer: 1
    },
    {
        question: "What does 'CSS' stand for?",
        options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        correctAnswer: 0
    }
];

const welcomeScreen = document.getElementById('welcome-screen');
const quizSection = document.getElementById('quiz-section');
const resultsSection = document.getElementById('results-section');
const startBtn = document.getElementById('start-btn');
const questionNumber = document.getElementById('question-number');
const progressBar = document.getElementById('progress');
const scoreDisplay = document.getElementById('score');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const optionElements = document.querySelectorAll('.option');
const nextBtn = document.getElementById('next-btn');
const percentageDisplay = document.getElementById('percentage');
const finalScoreDisplay = document.getElementById('final-score');
const feedbackDisplay = document.getElementById('feedback');
const retryBtn = document.getElementById('retry-btn');

let currentQuestionIndex = 0;
let score = 0;
let selectedOptionIndex = null;
let quizCompleted = false;


function initializeQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizCompleted = false;
    
    welcomeScreen.classList.add('hidden');
    resultsSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    
    displayQuestion();
    updateScore();
}


function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
   
    selectedOptionIndex = null;
    nextBtn.disabled = true;

    optionElements.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
   
    questionNumber.textContent = `Question ${currentQuestionIndex + 1}/${quizQuestions.length}`;
    const progressPercentage = ((currentQuestionIndex) / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    

    questionText.textContent = currentQuestion.question;
    

    optionElements.forEach((option, index) => {
        option.textContent = currentQuestion.options[index];
        option.addEventListener('click', () => selectOption(index));
    });
}


function selectOption(index) {
    // Prevent selection after answer is revealed
    if (optionElements[0].classList.contains('correct') || 
        optionElements[0].classList.contains('incorrect')) {
        return;
    }
    
   
    optionElements.forEach(option => option.classList.remove('selected'));
    
   
    optionElements[index].classList.add('selected');
    selectedOptionIndex = index;
    

    nextBtn.disabled = false;
    
    const currentQuestion = quizQuestions[currentQuestionIndex];
 
    optionElements.forEach((option, idx) => {
        if (idx === currentQuestion.correctAnswer) {
            option.classList.add('correct');
        } else if (idx === selectedOptionIndex) {
            option.classList.add('incorrect');
        }
    });
    
    
    if (selectedOptionIndex === currentQuestion.correctAnswer) {
        score++;
        updateScore();
    }
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}


function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}


function endQuiz() {
    quizSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    quizCompleted = true;
    
    const percentage = Math.round((score / quizQuestions.length) * 100);
    percentageDisplay.textContent = `${percentage}%`;
    finalScoreDisplay.textContent = `You scored ${score} out of ${quizQuestions.length}`;
    
    
    if (percentage >= 80) {
        feedbackDisplay.textContent = "Excellent! You're a quiz master!";
    } else if (percentage >= 60) {
        feedbackDisplay.textContent = "Good job! You know your stuff!";
    } else if (percentage >= 40) {
        feedbackDisplay.textContent = "Not bad! A little more practice and you'll be an expert!";
    } else {
        feedbackDisplay.textContent = "Keep learning! You'll do better next time!";
    }
}


function restartQuiz() {
    welcomeScreen.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    quizSection.classList.add('hidden');
}


startBtn.addEventListener('click', initializeQuiz);
nextBtn.addEventListener('click', nextQuestion);
retryBtn.addEventListener('click', restartQuiz);