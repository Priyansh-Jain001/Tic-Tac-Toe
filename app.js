let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Player O starts
let count = 0;

// 2D Array for winning patterns
const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Reset the game
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Box click event listener
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#FFD700";
        } else {
            box.innerText = "X";
            box.style.color = "#800000";
        }
        box.disabled = true;
        turnO = !turnO;
        count++;

        if (checkWinner()) return;

        if (count === 9) {
            gameDraw();
        }
    });
});

// Handle game draw
const gameDraw = () => {
    msg.innerText = "Game was a Draw.";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Disable all boxes
const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

// Enable all boxes and reset their content
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Display the winner
const showWinner = (player) => {
    msg.innerText = `Congratulations, Winner is ${player}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Check for a winner
const checkWinner = () => {
    for (let pattern of winPattern) {
        const [a, b, c] = pattern;
        let pos1Val = boxes[a].innerText;
        let pos2Val = boxes[b].innerText;
        let pos3Val = boxes[c].innerText;

        if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return true; // Winner found
        }
    }
    return false; // No winner
};

// Attach event listeners to buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
