const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')
const startStopButton = document.getElementById('startStopButton')
const randomButton = document.getElementById('randomButton')
const nameButton = document.getElementById('nameButton')

const rows = 30
const cols = 30
const cellSize = canvas.width / cols

let grid = createGrid(rows, cols)
let running = false
let interval

function createGrid(rows, cols) {
  const grid = []
  for (let i = 0; i < rows; i++) {
    const row = []
    for (let j = 0; j < cols; j++) {
      row.push(0)
    }
    grid.push(row)
  }
  return grid
}

function drawGrid(grid) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      ctx.fillStyle = grid[i][j] ? 'black' : 'white'
      ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize)
      ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize)
    }
  }
}

function getNextState(grid) {
  const nextGrid = createGrid(rows, cols)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const livingNeighbours = countLivingNeighbours(grid, i, j)
      if (grid[i][j] === 1) {
        if (livingNeighbours === 2 || livingNeighbours === 3) {
          nextGrid[i][j] = 1
        }
      } else {
        if (livingNeighbours === 3) {
          nextGrid[i][j] = 1
        }
      }
    }
  }
  return nextGrid
}

function countLivingNeighbours(grid, x, y) {
  let count = 0
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue
      const ni = x + i
      const nj = y + j
      if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
        count += grid[ni][nj]
      }
    }
  }
  return count
}

function update() {
  grid = getNextState(grid)
  drawGrid(grid)
}

function startGame() {
  if (!running) {
    running = true
    startStopButton.textContent = 'Stop'
    interval = setInterval(update, 100)
  } else {
    running = false
    startStopButton.textContent = 'Start'
    clearInterval(interval)
  }
}

function randomizeGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = Math.random() < 0.5 ? 0 : 1
    }
  }
  drawGrid(grid)
}

startStopButton.addEventListener('click', startGame)
randomButton.addEventListener('click', randomizeGrid)

// Initial draw
drawGrid(grid)
