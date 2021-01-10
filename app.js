document.addEventListener('DOMContentLoaded', () => {
    
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const socreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const width = 10
    let nextRandom = 0
    let timerId
    let score = 0
    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue'
    ]

    // Shapes
    const lTetrimino = [
        [1, width+1, (width*2)+1, 2],
        [width, width+1, width+2, (width*2)+2],
        [1, width+1, (width*2)+1, width*2],
        [width, width*2, (width*2)+1, (width*2)+2]
    ]

    const zTetrimino = [
        [0, width, width+1, (width*2)+1],
        [width + 1, width+2, width*2, (width*2)+1],
        [0, width, width+1, (width*2)+1],
        [width + 1, width+2, width*2, (width*2)+1]
    ]
    
    const tTetrimino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, (width*2)+1],
        [width, width+1, width+2, (width*2)+1],
        [1, width, width+1, (width*2)+1]
    ]
    
    const oTetrimino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]
    
    const iTetrimino = [
        [1, width+1, (width*2)+1, (width*3)+1],
        [width, width+1, width+2, width+3],
        [1, width+1, (width*2)+1, (width*3)+1],
        [width, width+1, width+2, width+3]
    ]

    const theTetriminoes = [lTetrimino, zTetrimino, tTetrimino, oTetrimino, iTetrimino]

    let currentPosition = 4
    let currentRotation = 0

    // randomly select tetrimino
    let random = Math.floor(Math.random() * theTetriminoes.length)
    let current = theTetriminoes[random][currentRotation]

    function draw() {
        // draw current tetrimino
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetrimino')
            squares[currentPosition + index].style.backgroundColor = colors[random]
        })
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetrimino')
            squares[currentPosition + index].style.backgroundColor = ''
        })
    }

    timerId = setInterval(moveDown, 1000)

    // keycodes
    function control(e) {
        if (e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }
    document.addEventListener('keyup', control)

    function moveDown() {
        undraw()
        currentPosition += width
        console.log("position", currentPosition)
        draw()
        // check if cant move
        freeze()
    }   

    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            // start new tetrimino
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetriminoes.length)
            current = theTetriminoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }

    // move Left tetrimino unless next to left wall
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if (!isAtLeftEdge) currentPosition -= 1

        // if any tile is at a taken spot
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            // move back
            currentPosition += 1
        }

        draw()
    }

    // move right unless any tile next to right wall
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        if (!isAtRightEdge) currentPosition += 1

        // if any tile at a taken spot
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1
        }

        draw()
    }

    // rotation
    function rotate() {
        undraw()
        currentRotation = (currentRotation + 1) % 4
        current = theTetriminoes[random][currentRotation]

        // TODO: add logic to check if went through wall

        draw()
    }

    // show next tetrimino
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    const displayIndex = 0

    // tetriminoes at their first rotation
    const upNextTetriminoes = [
        [1, displayWidth+1, (displayWidth*2)+1, 2],
        [0, displayWidth, displayWidth+1, (displayWidth*2)+1],
        [1, displayWidth, displayWidth+1, displayWidth+2],
        [0, 1, displayWidth, displayWidth+1],
        [1, displayWidth+1, (displayWidth*2)+1, (displayWidth*3)+1],
    ]
    
    // display shape in mini grid
    function displayShape() {
        // remove any tetrimino square
        displaySquares.forEach(square => {
            square.classList.remove('tetrimino')
            square.style.backgroundColor = ''
        })
        upNextTetriminoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetrimino')
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
        })
    }


    // start/pause functionality
    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random() * theTetriminoes.length)
            displayShape()
        }
    })

    function addScore() {
        for (let i = 0; i < 199; i+= width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if (row.every(index => squares[index].classList.contains('taken'))) {
                score += 10
                socreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetrimino')
                    squares[index].style.backgroundColor = ''
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    function gameOver() {
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            socreDisplay.innerHTML = 'END'
            clearInterval(timerId)
        }
    }

})
