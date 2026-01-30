const clog = console.log
clog("Knights Travails")

function knightMoves(curr = [0, 0], target = [0, 0]) {
    clog(curr)
    let x = curr[0]
    let y = curr[1]
    function goLeftDwn(){
        clog("Going left(2x) & Down(1x)")
        return curr = [x-1, y-2]
    }
    goLeftDwn()
    return curr
}


/* clog(
    knightMoves([3, 3], [4, 1] )
) */

function createGraph (x = 8) {
    x = x-1
    y = x-1
    let cellRows = []
    let cells = []
    for (let i = 0; i <= x; i++) {
        cellRows[i] = []
        function buildRows(num) {
            for (id = 0; id <= num; id++) {
               cellRows[i].push([i, id])
            }
        }
        buildRows(x)

        function buildCells(num) {
            for (id = 0; id <= num; id++) {
               cells.push( [i, id] ) 
            }
        }
        buildCells(x)
        
    }
    return cells
}

const board = createGraph(8)

function validEdgeMove(start = [0, 1]) {
    let limit = Math.sqrt(board.length)
    clog(`Limit: ${limit}`)
    
    let x = start[0]
    let y = start[1]
    const top = x+2 > limit ? false : x+2
    const down = x-2 < 0 ? false : x-2
    const left = y-1 < 0 ? false : y-1
    const right = y+1 > limit ? false : y+1
    const topShort = x+1 > limit ? false : x+1
    const downShort = x-1 < 0 ? false : x-1
    const leftLong = y-2 < 0 ? false : y-2
    const rightLong = y+2 > limit ? false : y+2
    clog(top)
}
clog(board)
clog( validEdgeMove() )