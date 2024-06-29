let board;
let rows = 4;
let columns = 4;
const btnUp = document.querySelector('.button-up');
const btnDown = document.querySelector('.button-down');
const btnLeft = document.querySelector('.button-left')
const btnRight = document.querySelector('.button-right')
const audio = new Audio('./plop.mp3')
let score = 0
let scoreDom = document.createElement('div')
document.querySelector('.main').appendChild(scoreDom)
scoreDom.id = 'score'
let overlay = document.createElement('div')
const loseText = document.createElement('div')
let main = document.querySelector('.main')

function createTile() {

  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement('div');
      let num = board[r][c];
      tile.classList.add('tile');
      tile.id = r.toString() + '-' + c.toString();
      tile.textContent = num;
      updateTile(tile, num);
      document.querySelector('.board').appendChild(tile);
    }
  }
  addTwo()
  addTwo()
}

window.addEventListener('load', createTile);

function checkIfFilled() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] === 0) {
        return true
      }
    }
  }
  return false
}

function addTwo() {
  if (!checkIfFilled) {
    return
  }
  let filledTile = false
  while (!filledTile) {
    let column = Math.floor(Math.random() * columns)
    let row = Math.floor(Math.random() * rows)
    if (board[row][column] === 0) {
      board[row][column] = 2
      let tile = document.getElementById(`${row}-${column}`)
      tile.textContent = 2
      tile.classList.add('t2')
      filledTile = true
    }
  }
}

function updateScore() {
  let scoreJs = document.getElementById('score')
  scoreJs.textContent = `Score : ${score}`
  document.querySelector('.main').appendChild(scoreJs)
}


function updateTile(tile, num) {
  tile.className = '';
  tile.classList.add('tile');

  if (num > 0) {
    tile.textContent = num;
    if (num <= 2048) {
      tile.classList.add('t' + num.toString());
    }
  }
}

function setGameSound() {
  addTwo()
  audio.play()
  updateScore()
}
document.addEventListener('keyup', function (e) {
  if (e.key === 'ArrowLeft') {
    updateLeft();
    setGameSound()
  }
  if (e.key === 'ArrowRight') {
    updateRight();
    setGameSound()
  }
  if (e.key === 'ArrowUp') {
    updateUp()
    setGameSound()
  }
  if (e.key === 'ArrowDown') {
    updateDown()
    setGameSound()
  }

});

btnUp.addEventListener('click', () => {
  updateUp()
  setGameSound()
}
);
btnDown.addEventListener('click', () => {
  updateDown()
  setGameSound()
})

btnLeft.addEventListener('click', () => {
  updateLeft()
  setGameSound()
})

btnRight.addEventListener('click', () => {
  updateRight()
  setGameSound()
})


function filterZero(row) {
  return row.filter((item) => item != 0);
}

function scrollTile(row) {
  row = filterZero(row);
  for (let i = 0; i < row.length; i++) {
    if (row[i] === row[i + 1]) {
      row[i] = row[i] * 2;
      row[i + 1] = 0;
      row = filterZero(row);
      score += row[i]
    }
  }
  while (row.length < 4) {
    row.push(0);
  }
  return row;
}

function updateLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = scrollTile(row);
    board[r] = row;
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      let num = board[r][c];
      tile.textContent = num;
      updateTile(tile, num);
      console.log(board[c][r]);
      console.log(board[c][r + 1]);
    }
  }
}

// ========================================= правыв\й скрол

function updateRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = scrollTile(row);
    row.reverse();
    board[r] = row;
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      let num = board[r][c];
      tile.textContent = num;
      updateTile(tile, num);
    }
  }
}

function updateUp() {
  for (let c = 0; c < columns; c++) {
    let column = [board[0][c], board[1][c], board[2][c], board[3][c]];
    column = scrollTile(column);
    for (let r = 0; r < rows; r++) {
      board[r][c] = column[r];
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      let num = board[r][c];
      tile.textContent = num;
      updateTile(tile, num);
    }
  }
}

function updateDown() {
  for (let c = 0; c < columns; c++) {
    let column = [board[0][c], board[1][c], board[2][c], board[3][c]]
    column.reverse()
    column = scrollTile(column)
    column.reverse()
    for (let r = 0; r < rows; r++) {
      board[r][c] = column[r]
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`)
      let num = board[r][c]
      tile.textContent = num
      updateTile(tile, num)
    }

  }
}

function checkLoseRows() {
  for (let r = 0; r < board.length; ++r) {
    for (let c = 0; c < board.length; ++c) {
      if (board[r][c < board.length - 1 ? c + 1 : 0]) {
        return true
      }
    }
  }


}

function checkLoseColumns() {
  if (checkLoseRows) {

    for (let c = 0; c < board.length; ++c) {
      for (let r = 0; r < board.length; ++r) {
        if (board[r < board.length - 1 ? r + 1 : 0][c]) {
          console.log('checked!');
          showOverlayLose()
        }

      }
    }
  }
}

function removeOverlay() {
  overlay.classList.remove('overlay')
  loseText.classList.remove('losetext')
}

function showOverlayLose() {
  document.body.appendChild(overlay)
  loseText.classList.add('losetext')
  loseText.textContent = 'You lose!'
  main.appendChild(loseText)
  overlay.classList.add('overlay')
  setTimeout(removeOverlay, 3000)
}

function setScoreToLocal() {
  for (let i = 0; i < 10; i++) {
    localStorage.setItem(i, score)
  }
}


