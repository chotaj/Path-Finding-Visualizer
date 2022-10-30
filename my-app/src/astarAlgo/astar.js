function AStar(startNode, endNode) {
    let openSet = [];
    let closedSet = [];
    let path = [];
    let visitedNodes = [];

    
    openSet.push(startNode);
    while (openSet.length > 0) {
        let leastIndex = 0;
        for ( let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[leastIndex].f) {
                leastIndex = i;
            }
        }
        let current = openSet[leastIndex];
        visitedNodes.push(current);
        if (current === endNode) {
            let temp = current; 
            path.push(temp);
            while (temp.previous) {
                path.push(temp.previous);
                temp = temp.previous;
            }
            console.log(path);
            return {path, visitedNodes};
            
        }

        openSet = openSet.filter(element => element !== current);

        closedSet.push(current);

        let neighbors = current.neighbors;

        for(let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            if (!closedSet.includes(neighbor) && !neighbor.isWall){
                let temporaryG = current.g + 1; 
                let newPath = false; 
                if (openSet.includes(neighbor)) {
                    if (temporaryG < neighbor.g) {
                        neighbor.g = temporaryG;
                        newPath = true;
                    } 
                } else {
                    neighbor.g = temporaryG;
                    newPath = true;
                    openSet.push(neighbor);
                }
                if (newPath) {
                    neighbor.h = heuristic(neighbor, endNode);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }
        }
    }

    return {path, visitedNodes, error: "No Path Found"};
}

//Will use manhattan distance to execute
function heuristic(a, b) {
    let d  = Math.abs(a.x - a.y) + Math.abs(b.x - b.y);
    return d; 
}

export default AStar; 