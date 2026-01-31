const clog = console.log
clog("Knights Travails")

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

function validEdgeList(start = [1, 2]) {
    let allKnightsMoves = []
    let limit = Math.sqrt(board.length)
    // clog(`Limit: ${limit}`)
    
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
    
    allKnightsMoves = [
        [top, left], [top, right], 
        [down, left], [down, right],
        [topShort, leftLong], [topShort, rightLong], 
        [downShort, leftLong], [downShort, rightLong]
    ]
    // clog(allKnightsMoves)
    const validMoves = allKnightsMoves.filter(i => !i.includes(false) )
    // clog(`List of edges from ${start}: ${validMoves.length}`)
    // clog(validMoves)
    return validMoves
}

class VertexNode {
    constructor (start = []) {
        this.start = start
        this.edges = validEdgeList(start)
        this.previous = null
    }
}

function knightMoves(startArr = [], endArr = []) {
    let curr = new VertexNode(startArr)
    let Q = []
    Q.push(curr)
    let visited = []
    let previous
    let count = 0
    const isVisited = visited.some(i => {
        if ( i && i.start.length === curr.start.length 
            && i.start[0] === curr.start[0] 
            && i.start[1] === curr.start[1] 
        ) {return i}
    })

    while (Q.length > 0 && !isVisited) {
        const matchFound = curr.start
        .filter(i => endArr.includes(i))
        .length === curr.start.length

        if(matchFound) { return clog("Found! Details below"), clog(`Count: ${count}`), clog(curr) } 
        else {clog("Not yet")}

        curr.edges.forEach(i => {
            Q.push( new VertexNode(i) )
        })
        visited.push(curr)
        Q.shift()
        curr = Q[0]
        previous = curr
        curr.previous = previous
        // clog(previous)
        count++
    }
    
    
     
}


// Logs
// clog(board)
clog( knightMoves([3, 3], [5, 4]) )

let end = [0, 1, 3]
let curr = [0, 1, 3]
clog(
    // check.filter(i => test.includes(i) ).length === test.length
   // curr.filter(i => end.includes(i)).length === curr.length
)