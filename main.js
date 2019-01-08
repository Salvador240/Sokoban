const map = [
  "  WWWWW ",
  "WWW   W ",
  "WOSB  W ",
  "WWW BOW ",
  "WOWWB W ",
  "W W O WW",
  "WB XBBOW",
  "W   O  W",
  "WWWWWWWW"
];


let rowIndex, columnIndex
let player = document.getElementById("player");
let mapDiv = document.getElementById("map")

let replayButton = document.getElementById('replayButton')
replayButton.style.display = 'none'

function createBoard() {

  for (let i = 0; i < map.length; i++) {
    let rowElement = document.createElement("div")
    rowElement.id = "row" + i
    rowElement.className = "row"

    for (let j = 0; j < map[i].length; j++) {
      let cellElement = document.createElement("div")
      cellElement.id = "cell"
      cellElement.dataset.cellIndex = j
      cellElement.dataset.rowIndex = i
      if (map[i][j] === "W") {
        cellElement.className = "wall"
      } else if (map[i][j] === " ") {
        cellElement.className = "space"
      } else if (map[i][j] === "S") {
        // player.style.top = (30 * i) + "px"
        // player.style.left = (30 * j) + "px"
        cellElement.id = "start"
        rowIndex = i
        columnIndex = j
      } else if (map[i][j] === "B") {
        cellElement.className = "box"
      } else if (map[i][j] === "O") {
        cellElement.className = "open"
      } else if (map[i][j] === "X") {
        cellElement.className = "end"
      }
      // console.log(cellElement)
      rowElement.appendChild(cellElement)
    }
    mapDiv.appendChild(rowElement)
  }
}
createBoard();


function moveUp() {
  // checkWin();
  let rowUp = rowIndex - 1
  let rowUp2 = rowIndex - 2
  let cellUp = document.querySelector("[data-cell-index='" + columnIndex + "'][data-row-index='" + rowUp + "']")
  let cellUp2 = document.querySelector("[data-cell-index='" + columnIndex + "'][data-row-index='" + rowUp2 + "']")
  // console.log(cellUp)
  if (cellUp.className == "open" || cellUp.className == "space") {
    cellUp.appendChild(player);
    rowIndex = rowIndex - 1
  } else if (cellUp.className == "box") {
    if (cellUp2.className == "open") {
      cellUp.appendChild(player);
      cellUp.className = "space"
      cellUp2.className = "end"
      rowIndex = rowIndex - 1
    } else if (cellUp2.className == "space") {
      cellUp.appendChild(player);
      cellUp.className = "space"
      cellUp2.className = "box"
      rowIndex = rowIndex - 1
    }
  } else if (cellUp.className == "end") {
    if(cellUp2.className == "open"){
      cellUp.appendChild(player);
      cellUp.className = "open"
      cellUp2.className = "box"
      rowIndex = rowIndex - 1
    } else if (cellUp2.className == "space") {
      cellUp.appendChild(player);
      cellUp.className = "open"
      cellUp2.className = "box"
      rowIndex = rowIndex - 1
    }
  }
}
function moveDown() {
  let rowDown = rowIndex + 1
  let rowDown2 = rowIndex + 2
  let cellDown = document.querySelector("[data-cell-index='" + columnIndex + "'][data-row-index='" + rowDown + "']")
  let cellDown2 = document.querySelector("[data-cell-index='" + columnIndex + "'][data-row-index='" + rowDown2 + "']")
  // console.log(cellDown)
  if (cellDown.className == "open" || cellDown.className == "space") {
    cellDown.appendChild(player);
    rowIndex = rowIndex + 1
  } else if (cellDown.className == "box") {
    if (cellDown2.className == "open") {
      cellDown.appendChild(player);
      cellDown.className = "space"
      cellDown2.className = "end"
      rowIndex = rowIndex + 1
    } else if (cellDown2.className == "space") {
      cellDown.appendChild(player);
      cellDown.className = "space"
      cellDown2.className = "box"
      rowIndex = rowIndex + 1
    }
  } else if (cellDown.className == "end") {
    if(cellDown2.className == "open"){
      cellDown.appendChild(player);
      cellDown.className = "open"
      cellDown2.className = "box"
      rowIndex = rowIndex + 1
    } else if (cellDown2.className == "space") {
      cellDown.appendChild(player);
      cellDown.className = "open"
      cellDown2.className = "box"
      rowIndex = rowIndex + 1
    }
  }
}
function moveLeft() {
  let columnLeft = columnIndex - 1
  let columnLeft2 = columnIndex - 2
  let cellLeft = document.querySelector("[data-cell-index='" + columnLeft + "'][data-row-index='" + rowIndex + "']")
  let cellLeft2 = document.querySelector("[data-cell-index='" + columnLeft2 + "'][data-row-index='" + rowIndex + "']")
  if (cellLeft.className == "open" || cellLeft.className == "space" || cellLeft.id == "start") {
    cellLeft.appendChild(player);
    columnIndex = columnIndex - 1
  } else if (cellLeft.className == "box") {
    if (cellLeft2.className == "open") {
      cellLeft.appendChild(player);
      cellLeft.className = "space"
      cellLeft2.className = "end"
      columnIndex = columnIndex - 1
    } else if (cellLeft2.className == "space") {
      cellLeft.appendChild(player);
      cellLeft.className = "space"
      cellLeft2.className = "box"
      columnIndex = columnIndex - 1
    } else if (cellLeft2.id == "start"){
      cellLeft.appendChild(player);
      cellLeft.className = "space"
      cellLeft2.className = "box"
      cellLeft2.id = ''
      columnIndex = columnIndex - 1
    }
  } else if (cellLeft.className == "end") {
    if (cellLeft2.className == "open") {
      cellLeft.appendChild(player);
      cellLeft.className = "open"
      cellLeft2.className = "box"
      columnIndex = columnIndex - 1
    } else if (cellLeft2.className == "space") {
      cellLeft.appendChild(player);
      cellLeft.className = "open"
      cellLeft2.className = "box"
      columnIndex = columnIndex - 1
    }
  }
}
function moveRight() {
  // console.log(columnIndex + 1, rowIndex, map[rowIndex][columnIndex + 1])
  // checkWin(rowIndex, columnIndex + 1)
  // let cellRightMap = map[rowIndex][columnIndex + 1]
  // let cellRight2Map = map[rowIndex][columnIndex + 2]
  // console.log(cellRight2Map)
  let columnRight = columnIndex + 1
  let columnRight2 = columnIndex + 2
  let cellRight = document.querySelector("[data-cell-index='" + columnRight + "'][data-row-index='" + rowIndex + "']")
  let cellRight2 = document.querySelector("[data-cell-index='" + columnRight2 + "'][data-row-index='" + rowIndex + "']")
  if (cellRight.className == "open" || cellRight.className == "space" || cellRight.id == "start") {
    cellRight.appendChild(player);
    columnIndex = columnIndex + 1
  } else if (cellRight.className == "box") {
    if (cellRight2.className == "open") {
      cellRight.appendChild(player);
      cellRight.className = "space"
      cellRight2.className = "end"
      columnIndex = columnIndex + 1
    } else if (cellRight2.className == "space") {
      cellRight.appendChild(player);
      cellRight.className = "space"
      cellRight2.className = "box"
      columnIndex = columnIndex + 1
    }
  } else if (cellRight.className == "end") {
    if (cellRight2.className == "open") {
      cellRight.appendChild(player);
      cellRight.className = "open"
      cellRight2.className = "box"
      columnIndex = columnIndex + 1
    } else if (cellRight2.className == "space") {
      cellRight.appendChild(player);
      cellRight.className = "open"
      cellRight2.className = "box"
      columnIndex = columnIndex + 1
    }
  }
}

document.addEventListener('keydown', keyHandler)

function keyHandler() {
  const keyName = event.key;
  // console.log('keydown event\n\n' + 'key: ' + keyName);
  if (keyName === "ArrowUp") {
    moveUp()
  } else if (keyName === "ArrowDown") {
    moveDown()
  } else if (keyName === "ArrowLeft") {
    moveLeft()
  } else if (keyName === "ArrowRight") {
    moveRight()
  }
  checkWin();
}


document.getElementById("start").appendChild(player)

function checkWin(row, col) {

  if (document.querySelector(".box") == null) {
    //let cellUp = document.querySelector("[data-row-index='" + row + "'][data-cell-index='" + col + "']")
    // cellUp.appendChild(player);
    // alert("You won!!!")
    //window.location.reload(true)
    let winMsg = document.createElement("div")
    let winText = document.createTextNode("YOU WIN")
    winMsg.appendChild(winText)
    document.body.appendChild(winMsg)
    replayButton.style.display = 'block'
    document.removeEventListener('keydown', keyHandler)
  }
}

document.getElementById("replayButton").onclick = function () {
  window.location.reload(true)
}