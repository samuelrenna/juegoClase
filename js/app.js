const questions = [
    {
        question: "¿ Que es la informacion ?",
        options: [
            "A) Son los datos procesados",
            "B) Son los datos de las redes",
            "C) Son los datos",
            "D) Visualización y presentación de datos"
        ],
        correct: 0
    },
    {
        question: "¿ Cuales son herramientas y aplicaciones de analisis de datos ?",
        options: [
            "A) Power BI y Tableau",
            "B) Spotify",
            "C) Visual Studio",
            "D) Chrome"
        ],
        correct: 0
    },
    {
        question: "¿ Cuales son las 5 v del big data ?",
        options: [
            "A) Bueno, Bonito, Barato",
            "B) Volumen, Velocidad, Veracidad, Variedad, Valor",
            "C) Valencia, Valladolid, Vélez, Vigo, Vitoria",
            "D) Volumen, Veloz, Verdad, Variedad, Valorar"
        ],
        correct: 1
    },
    {
        question: "¿ Que es el Machine Learning ?",
        options: [
            "A) Un avion de combate",
            "B) Es el proceso de enseñar a las máquinas a aprender de la experiencia",
            "C) Un tanque",
            "D) Es el proceso de APRENDER de las máquinas en un universo paralelo."
        ],
        correct: 1
    },
    {
        question: "¿ En que se inspira el deep learning ?",
        options: [
            "A) En los muertos vivientes",
            "B) En el Cerebro humano",
            "C) En el covid",
            "D) En la inteligencia artificial"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let gameStarted = false;

document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
    gameStarted = true;
    currentQuestion = 0;
    score = 0;
    document.getElementById('score').textContent = score;
    showQuestion();
    updateProgress();
}

function updateProgress() {

    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

function showQuestion() {
    const gameArea = document.getElementById('gameArea');
    const question = questions[currentQuestion];

    let html = `
        <div class="question">${question.question}</div>
        <div class="options">
            ${question.options.map((option, index) => `
                <button onclick="checkAnswer(${index})">${option}</button>
            `).join('')}
        </div>
    `;

    gameArea.innerHTML = html;
    updateProgress(); 
}

function checkAnswer(selectedIndex) {
    const question = questions[currentQuestion];
    const buttons = document.querySelectorAll('.options button');

    buttons.forEach(button => button.disabled = true);

    if (selectedIndex === question.correct) {
        buttons[selectedIndex].classList.add('correct');
        score += 1;
        document.getElementById('score').textContent = score;
    } else {
        buttons[selectedIndex].classList.add('incorrect');
        buttons[question.correct].classList.add('correct');
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            updateProgress();
            endGame();
        }
    }, 500);
}

function endGame() {
    const gameArea = document.getElementById('gameArea');
    const maxScore = questions.length * 1;
    let message;
    
    if (score >= maxScore * 0.8) {
        message = "¡Impresionante! Eres todo un experto en ciencia de datos 🏆";
    } else if (score >= maxScore * 0.6) {
        message = "¡Buen trabajo! Tienes un sólido conocimiento 📚";
    } else if (score >= maxScore * 0.4) {
        message = "No está mal, pero hay espacio para mejorar 💪";
    } else {
        message = "Sigue estudiando, ¡la práctica hace al maestro! 📖";
    }

    gameArea.innerHTML = `
        <div class="result">
            <h2>${message}</h2>
            <p>Tu puntuación final: ${score} de ${maxScore} puntos</p>
            <button id="startButton" onclick="startGame()">Intentar de nuevo</button>
        </div>
    `;
}