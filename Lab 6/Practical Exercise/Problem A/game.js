// Global state variables to track game progress and scores
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let results = []; 
let roundNumber = 0;

// Initializes the game, validates name, and displays start time
function startGame() {
    const nameInput = document.getElementById("playerName").value;
    
    if (nameInput.trim() === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;
    
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `Welcome, <b>${nameInput}</b>!`;
    resultElement.style.color = "#333";
    
    document.getElementById("startTime").innerText = "Game started at: " + new Date();
}

// Returns a random choice ("rock", "paper", or "scissors") for the computer
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Core game logic: compares choices, updates scores, images, and history table
function playRound(playerChoice) {
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    const computerChoice = getComputerChoice();
    
    // Update the images dynamically based on choices
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    let resultText = "";
    let resultColor = "";
    let resultLog = "";

    // Determine win/loss/draw conditions
    if (playerChoice === computerChoice) {
        resultText = "It's a Draw!";
        resultColor = "grey";
        resultLog = "Draw";
        draws++;
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        resultText = "You Win!";
        resultColor = "green";
        resultLog = "Win";
        wins++;
    } else {
        resultText = "You Lose!";
        resultColor = "red";
        resultLog = "Lose";
        losses++;
    }

    // Update UI with result and new scores
    const resultElement = document.getElementById("result");
    resultElement.innerText = resultText;
    resultElement.style.color = resultColor;

    document.getElementById("wins").innerText = wins;
    document.getElementById("losses").innerText = losses;
    document.getElementById("draws").innerText = draws;

    results.push(resultLog);
    roundNumber++;

    // Append new data to the history table using insertRow
    const historyBody = document.querySelector("#history tbody");
    const newRow = historyBody.insertRow();
    
    newRow.innerHTML = `
        <td>${roundNumber}</td>
        <td style="text-transform: capitalize;">${playerChoice}</td>
        <td style="text-transform: capitalize;">${computerChoice}</td>
        <td style="color: ${resultColor}; font-weight: bold;">${resultLog}</td>
    `;
}

// Loops through results array to calculate win percentage
function showSummary() {
    if (results.length === 0) {
        alert("No rounds played yet.");
        return;
    }

    let totalWins = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            totalWins++;
        }
    }

    const totalRounds = results.length;
    const winPercentage = Math.round((totalWins / totalRounds) * 100);

    alert(`You played ${totalRounds} rounds and won ${winPercentage}%`);
}

// Clears all arrays, scores, and UI elements back to default state
function resetGame() {
    gameStarted = false;
    wins = 0;
    losses = 0;
    draws = 0;
    results = [];
    roundNumber = 0;

    document.getElementById("wins").innerText = "0";
    document.getElementById("losses").innerText = "0";
    document.getElementById("draws").innerText = "0";
    
    const resultElement = document.getElementById("result");
    resultElement.innerText = "";
    
    // Clears all dynamic rows from the table body
    const historyBody = document.querySelector("#history tbody");
    historyBody.innerHTML = "";

    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";

    document.getElementById("playerName").value = "";
    document.getElementById("startTime").innerText = "";
}