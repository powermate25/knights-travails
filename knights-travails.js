const clog = console.log
clog("Knights Travails")

// Create and initialize squared grid (base on input parameter)
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

// Defining Valid Knights moves
function validEdgeList(start = [0, 0]) {
    if ( !Array.isArray(start)  ) {throw new Error("Only array are allowed.")}
    let allKnightsMoves = []
    const limit = Math.sqrt(board.length) - 1
    
    const x = start[0]
    const y = start[1]
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


function knightMoves(startArr = [], endArr = []) {
    const base = new VertexNode(startArr)
    const trackingQ = []
    trackingQ.push(base)
    base.edges.forEach(i => {
        let temp = new VertexNode(i)
        temp.previous = base
            trackingQ.push( temp )
        })
    
    let foundPaths = []
    let shortestPath
    let visitedEdges = []
    let Q = []
    Q.push(base)

    while (trackingQ[0] !== undefined) {
        const prev = Q[0]
        const instantMatch = prev.edges.some(i => {
            if ( i && i.toString() === endArr.toString() ) {
                return i
                }
        })

        if (instantMatch) {
            let temp = new VertexNode(endArr)
            temp.previous = prev
            foundPaths.push(temp)
            shortestPath = temp
            Q = []
            Q.push( trackingQ.shift() )
            break
        }

        if (!instantMatch) {
            const isVisited = visitedEdges.some(i => {
                if ( i && i.start.toString() 
                    === prev.start.toString() 
                ) {return i}
            })

            if (isVisited) {
                Q.forEach(i => {
                    if( i && i.start.toString() 
                        === prev.start.toString()
                    ) { delete(Q[i]) }
                })
                Q.shift() 
                while ( Q[0] === undefined ) { Q.shift() }
            }
            else {
                visitedEdges.push(prev)
            }

            const matchFound = endArr.some(i => {
                if ( i && endArr.toString() 
                    === prev.start.toString()
                ) {return i}
            })

            if (matchFound) {
                foundPaths.push(prev)
                Q = []
                Q.push( trackingQ.shift() )
                continue
            }
            else if (!matchFound) {
                prev.edges.forEach(i => {
                    // Avoid creating duplicates in Queue earlier
                    const duplicates = Q.some(x => {
                        if ( x && x.start.toString() === i.toString() ) 
                            {return i}
                    })
                    if (!duplicates) {
                        const temp = new VertexNode(i)
                        temp.previous = prev
                        Q.push(temp)
                    }
                })
                Q.shift()
            }
        }
    }

    function returnPathLog(shortestPath) {
        if (startArr.toString() === endArr.toString()) {
            clog(`=> You're already there! Here's your path anyway:`)
            clog(startArr)
            return
        }
        const reversedPath = []
        let curr = shortestPath
        while(curr) {
            reversedPath.unshift(curr.start)
            curr = curr.previous
        }
        clog(`=> You made it in ${reversedPath.length-1} moves! Here's your path:`)
        for (let step in reversedPath) {
            clog(reversedPath[step])
        }
    }

    // Final return
    return returnPathLog(shortestPath)
} 


// Logs
clog( knightMoves([3, 3], [0, 0]) ) 
