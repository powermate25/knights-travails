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
    let limit = Math.sqrt(board.length) - 1
    
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


function knightMoves(startArr = [], endArr = []) {
    let base = new VertexNode(startArr)
    let trackingQ = []
    trackingQ.push(base)
    clog("♻ Base")
    clog(base)
    base.edges.forEach(i => {
        let temp = new VertexNode(i)
        temp.previous = base
            trackingQ.push( temp )
        })
    
    let foundPaths = []
    let visitedEdges = []
    let count = 0
    let Q = []
    Q.push(base)

    while (trackingQ.length > 0) {
        const prev = Q[0]
        clog("Current Vertex")
        clog(prev)
        const isVisited = visitedEdges.some(i => {
            if ( i && i.start[0] === prev.start[0] 
                && i.start[1] === prev.start[1] 
                && i.start.length === prev.start.length
            ) {return i}
        })

        if (isVisited) {
            clog("Skipping already visited item")
            const visited = Q.shift()
            clog( visited.start )
            clog(Q)
            // continue
        }
        else {
            clog(`Adding to visited ${prev.start}`)
            visitedEdges.push(prev)
        }
        
        const matchFound = endArr.some(i => {
            if ( i && endArr[0] === prev.start[0] 
                && endArr[1] === prev.start[1] 
                && endArr.length === prev.start.length
            ) {return i}
        })
        
        if (matchFound) {
            clog("🔔 Found!")
            foundPaths.push(prev)
            clog(prev)
            // clog(count)
            Q = []
            Q.push( trackingQ.shift() )
            clog("🚨")
            clog(Q[0])
        }
        else if (!matchFound) {
            clog("📢 Not yet!")
            clog(Q)
            // if end target not found check for and remove duplicates 
            // in Queue before continuing to prevent infinite loop event
            for (let index = 0; index < Q.length; index ++) {
                let back = Q.length
                while (Q[back] && index !== back) {
                    if ( Q[index].start.toString()
                        === Q[back].start.toString()
                    ) {
                        clog("♻ Deleting")
                        delete Q[back]
                    }
                    back -= 1
                }
            }
            
            prev.edges.forEach(i => {
                // Avoid creating duplicates in Queue earlier
                // by sacrificing little time complexing on each 
                // iteration to gain more in the worse case scenario
                const duplicates = Q.some(x => {
                    if ( x && x.start[0] === i[0] 
                        && x.start[1] === i[1] 
                        && x.start.length === i.length
                    ) {return i}
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
    return shortestPath()
} 


// Logs
clog( knightMoves([0, 0], [3, 3]) ) 

/*
let test = knightMoves( [0, 0], [7, 7] )

function shortestPath () {
    let shortestPath = -1
    for(let i in test) {
        clog(test[i])
        let curr = test[i]
        let counter = 0
        
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
    shortestPath = shortestPath < curr.pathLength ? curr : shortestPath
    }
    return shortestPath
}

clog(shortestPath())
*/