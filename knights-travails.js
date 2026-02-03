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
    clog("♻ Base")
    clog(base)
    base.edges.forEach(i => {
        let temp = new VertexNode(i)
        temp.previous = base
            trackingQ.push( temp )
        })
    
    let foundPaths = []
    let shortestPath2
    let visitedEdges = []
    // let count = 0
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
            clog("🔔 Shortest path found!")
            let temp = new VertexNode(endArr)
            temp.previous = prev
            foundPaths.push(temp)
            shortestPath2 = temp
            clog(temp)
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
                clog("Skipping already visited item")
                Q.forEach(i => {
                    if( i && i.start.toString() 
                        === prev.start.toString()
                    ) { delete(Q[i]) }
                })
                Q.shift() 
                while ( Q[0] === undefined ) { Q.shift() }
            }
            else {
                clog(`Adding to visited ${prev.start}`)
                visitedEdges.push(prev)
            }
        
            const matchFound = endArr.some(i => {
                if ( i && endArr.toString() 
                    === prev.start.toString()
                ) {return i}
            })

            if (matchFound) {
                clog("🔔 Found!")
                foundPaths.push(prev)
                clog(prev)
                Q = []
                Q.push( trackingQ.shift() )
                continue
            }
            else if (!matchFound) {
                clog("📢 Not yet!")
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
    // return foundPaths
    function shortestPath() {
        let shortestPath = -1
        for(let path in foundPaths) {
            clog(foundPaths[path])
            let curr = foundPaths[path]
            let counter = 0
            
            // using recursive function to construct path data
            function printPath(curr, res = "", base = [], path = []) {
                if (!curr.previous) {
                    base.push(`${curr.start.toString()}`)
                    return curr
                }
                path.unshift(` => ${curr.start.toString()}`)
                printPath(curr.previous, res, base, path, counter++)
                return `${base}${path} in ${counter} moves`
            }
            clog( printPath(curr) )

        curr.pathLength = counter
        shortestPath = shortestPath < 0 ? 
        curr : shortestPath
        shortestPath.pathLength < curr.pathLength ? 
        shortestPath : curr
        }
        return shortestPath
    }
    return shortestPath2 // shortestPath()
} 


// Logs
clog( knightMoves([3, 3], [0, 0]) ) 
