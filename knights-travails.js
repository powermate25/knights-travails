const clog = console.log
clog("Knights Travails")

function createGraphBfs (x = 8) {
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

const board = createGraphBfs(8)

function validEdgeList(start = [0, 0]) {
    if ( !Array.isArray(start)  ) {throw new Error("Only array are allowed.")}
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
    //clog(`List of edges from ${start}: ${validMoves.length}`)
    //clog(validMoves)
    return validMoves
}

class VertexNode {
    constructor (start = []) {
        this.start = start
        this.edges = validEdgeList(start)
        this.previous = null
    }
}

/*
function oldKnightMoves(startArr = [], endArr = []) {
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

        if(matchFound) {
            clog("Found! Details below")
            clog(curr)
            clog(`Count: ${count}`)
            return curr
        } 
        else {clog("Not yet")}

        curr.edges.forEach(i => {
            Q.push( new VertexNode(i) )
        })
        visited.push(curr)
        previous = curr
        Q.shift()
        curr = Q[0]
        curr.previous = previous
        count++
    }
}
*/

/*
function knightMoves2(startArr = [], endArr = []) {
    let count = 0
    let tempQ = []
    let visitedEdges = []
    let allPaths = []
    let curr = new VertexNode(startArr)
    tempQ.push(curr)
    
    const isVisited = visitedEdges.some(i => {
        if ( i && i.start.length === curr.start.length 
            && i.start[0] === curr.start[0] 
            && i.start[1] === curr.start[1] 
        ) {return i}
    })
    // clog(isVisited)
    
    while (curr) {
        const matchFound = curr.start
        .filter(i => endArr.includes(i))
        .length === curr.start.length

        if (matchFound) {
            clog("Found! Details below")
            clog(curr)
            clog(`Count: ${count}`)
            allPaths.push(curr)
            break
        } 
        if (!matchFound) {
            clog("Not yet, still exploring!")
        }
        if (isVisited) {
            clog("Already visited")
            tempQ.shift()
            curr = tempQ[0]
            continue
        }
        
        visitedEdges.push(curr)
        curr.edges.forEach(i => {
            tempQ.push(new VertexNode(i))
        })
        const previous = curr
        tempQ.shift()
        curr = tempQ[0]
        curr ? curr.previous = previous : curr
        count ++
    }
    clog(allPaths)
}
*/

function knightMoves(startArr = [], endArr = []) {
    let base = new VertexNode(startArr)
    let trackingQ = []
    trackingQ.push(base)

    base.edges.forEach(i => {
            trackingQ.push( new VertexNode(i) )
        })
    
    let foundPaths = []
    let visitedEdges = []
    let count = 0
    let Q = []
    Q.push(base)

    while (trackingQ.length > 0) {
        //clog(Q[0].start)
        const pointer = trackingQ[0]

        const prev = Q[0]
        const isVisited = visitedEdges.some(i => {
            if ( i && i.start[0] === prev.start[0] 
                && i.start[1] === prev.start[1] 
                && i.start.length === prev.start.length
            ) {return i}
        })

        if (isVisited) {
            clog("Skipping already visited item")
            clog( Q.shift().start )
            // continue
        }
        else {
            clog(`Adding to visited ${prev.start}`)
            visitedEdges.push(prev)
        }
        
        const matchFound = prev.start
        .filter(i => endArr.includes(i))
        .length === prev.start.length
        
        if (matchFound) {
            clog("🔔 Found!")
            foundPaths.push(prev)
            clog(prev)
            // clog(count)
            Q = []
            Q.push( trackingQ.shift() )
        }
        else {
            clog("📢 Not yet!")
            prev.edges.forEach(i => {
                Q.push( new VertexNode(i) )
            })
            Q.shift()
            Q[0].previous = prev
            count ++
        }
    }
    return foundPaths
} 
// Logs
// clog(board)
clog( knightMoves([0, 0], [1, 2]) ) 
let end = [0, 1, 3]
let curr = [0, 1, 3]
clog(
    // check.filter(i => test.includes(i) ).length === test.length
   // curr.filter(i => end.includes(i)).length === curr.length
)