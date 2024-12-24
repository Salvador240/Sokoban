// Define the new maze map with only four boxes and four targets
const map = [
  "  WWWWWWWWW  ",
  "WWW       WW ",
  "WWSB      OW ",
  "WWW BOWW  WW ",
  "WOWW  W   WW ",
  "W W   WW W WW",
  "WB  BOWW  WW ",
  "W   W   W  W ",
  "WWWWWWWWWWWW "
];


let rowIndex, columnIndex; // Player's current position
let player = document.getElementById("player"); // Player element
let mapDiv = document.getElementById("map"); // Game board element

let replayButton = document.getElementById('replayButton'); // Reset button element
replayButton.style.display = 'none'; // Hide reset button initially

// Function to create the game board
function createBoard() {
  mapDiv.innerHTML = ''; // Clear the board before creating it
  for (let i = 0; i < map.length; i++) {
    let rowElement = document.createElement("div");
    rowElement.id = "row" + i;
    rowElement.className = "row";

    for (let j = 0; j < map[i].length; j++) {
      let cellElement = document.createElement("div");
      cellElement.dataset.cellIndex = j;
      cellElement.dataset.rowIndex = i;
      if (map[i][j] === "W") {
        cellElement.className = "wall";
      } else if (map[i][j] === " ") {
        cellElement.className = "space";
      } else if (map[i][j] === "S") {
        cellElement.id = "start";
        rowIndex = i;
        columnIndex = j;
      } else if (map[i][j] === "B") {
        cellElement.className = "box";
      } else if (map[i][j] === "O") {
        cellElement.className = "open";
      } else if (map[i][j] === "X") {
        cellElement.className = "end";
      }
      rowElement.appendChild(cellElement);
    }
    mapDiv.appendChild(rowElement);
  }
  document.getElementById("start").appendChild(player); // Place the player at the start position
}
createBoard(); // Initialize the game board

// Function to move the player to a new position
function movePlayer(newRowIndex, newColumnIndex) {
  let newCell = document.querySelector(`[data-row-index='${newRowIndex}'][data-cell-index='${newColumnIndex}']`);
  let beyondCell = document.querySelector(`[data-row-index='${newRowIndex + (newRowIndex - rowIndex)}'][data-cell-index='${newColumnIndex + (newColumnIndex - columnIndex)}']`);

  if (newCell.className === "open" || newCell.className === "space") {
    newCell.appendChild(player);
    rowIndex = newRowIndex;
    columnIndex = newColumnIndex;
  } else if (newCell.className === "box" && (beyondCell.className === "open" || beyondCell.className === "space")) {
    newCell.appendChild(player);
    newCell.className = "space";
    beyondCell.className = "box";
    rowIndex = newRowIndex;
    columnIndex = newColumnIndex;
  } else if (newCell.className === "end" && (beyondCell.className === "open" || beyondCell.className === "space")) {
    newCell.appendChild(player);
    newCell.className = "open";
    beyondCell.className = "box";
    rowIndex = newRowIndex;
    columnIndex = newColumnIndex;
  }
  checkWin();
}

// Functions to move the player in different directions
function moveUp() {
  movePlayer(rowIndex - 1, columnIndex);
}

function moveDown() {
  movePlayer(rowIndex + 1, columnIndex);
}

function moveLeft() {
  movePlayer(rowIndex, columnIndex - 1);
}

function moveRight() {
  movePlayer(rowIndex, columnIndex + 1);
}

// Event listener for keyboard input
document.addEventListener('keydown', keyHandler);

function keyHandler(event) {
  const keyName = event.key;
  if (keyName === "ArrowUp") {
    moveUp();
  } else if (keyName === "ArrowDown") {
    moveDown();
  } else if (keyName === "ArrowLeft") {
    moveLeft();
  } else if (keyName === "ArrowRight") {
    moveRight();
  }
}

// Function to check if the player has won
function checkWin() {
  const boxes = document.querySelectorAll(".box");
  const targets = document.querySelectorAll(".open");
  let win = true;

  targets.forEach(target => {
    const targetPosition = target.dataset.rowIndex + "-" + target.dataset.cellIndex;
    let boxOnTarget = false;
    boxes.forEach(box => {
      const boxPosition = box.dataset.rowIndex + "-" + box.dataset.cellIndex;
      if (boxPosition === targetPosition) {
        boxOnTarget = true;
      }
    });
    if (!boxOnTarget) {
      win = false;
    }
  });

  if (win) {
    let winMsg = document.getElementById("winMessage");
    winMsg.style.display = "flex";
    replayButton.style.display = 'block';
    document.removeEventListener('keydown', keyHandler);
  }
}

// Event listener for the reset button
document.getElementById("replayButton").onclick = function() {
  window.location.reload(true);
}