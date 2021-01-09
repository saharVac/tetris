document.addEventListener('DOMContentLoaded', () => {
    
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const socreDisplay = document.querySelector('%score')
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

})
