document.addEventListener('DOMContentLoaded', () => {
    
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const socreDisplay = document.querySelector('#score')
    const width = 10

    // Shapes
    const lTetrimino = [
        [1, width+1, (width*2)+1, 2],
        [width, width+1, width+2, (width*2)+2],
        [1, width+1, (width*2)+1, width*2],
        [width, width*2, (width*2)+1, (width*2)+2]
    ]

    const ZTetrimino = [
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

    const theTetriminoes = [lTetrimino, ZTetrimino, tTetrimino, oTetrimino, iTetrimino]

    let currentPosition = 4
    let currentRotation = 0

    // randomly select tetrimino
    let random = Math.floor(Math.random() * theTetriminoes.length)
    let current = theTetriminoes[random][currentRotation]

    function draw() {
        // draw current tetrimino
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetrimino')
        })
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetrimino')
        })
    }

    timerId = setInterval(moveDown, 1000)

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
            random = Math.floor(Math.random() * theTetriminoes.length)
            current = theTetriminoes[random][currentRotation]
            currentPosition = 4
            draw()
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
})
