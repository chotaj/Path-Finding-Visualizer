import React, {useState, useEffect} from 'react'
import Nodes from './Nodes';
import AStar from '../astarAlgo/astar';
import "./path-find.css";
const rows = 15; 
const cols = 35; 

const Node_Start_Row = 0; 
const Node_Start_Col = 0;
const Node_End_Row = rows - 1; 
const Node_End_Col = cols - 1;

const PathFinder = () => {
    const [Grid, setGrid] = useState([]);
    const [Path, setPath] = useState([]);
    const [VisitedNodes, setVisitedNodes] = useState([]);

    useEffect(() => {

        initializeGrid();
        
    }, [])

    const initializeGrid = () => {
        var grid = [...Array(15)].map(e =>Array(35));

        createSpot(grid);
        setGrid(grid); 
        addNeighbors(grid);
        const startNode = grid[Node_Start_Row][Node_Start_Col];
        const endNode = grid[Node_End_Row][Node_End_Col];
        let path = AStar(startNode, endNode);
        startNode.isWall = false;
        endNode.isWall = false;
        setPath(path.path);
        setVisitedNodes(path.visitedNodes);
    };

    const createSpot = (grid) => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j] = new Spot(i, j);
            }
        }
    }
    //Add neighbors 
    const addNeighbors = (grid) => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
            grid[i][j].addNeighbors(grid);
            }
        }
    }
    function Spot(i, j) {
            this.x = i;
            this.y = j;
            this.isStart = this.x === Node_Start_Row && this.y === Node_Start_Col;
            this.isEnd = this.x === Node_End_Row && this.y === Node_End_Col;
            this.g = 0;
            this.f = 0;
            this.h = 0;
            this.neighbors = [];
            this.isWall = false;
            if (Math.random(1) < 0.2) {
                this.isWall = true;
            }
            this.previous = undefined;
            this.addNeighbors = function(grid) {
                let i = this.x;
                let j = this.y; 
                if (i > 0) {
                    this.neighbors.push(grid[i - 1][j]);
                }
                if ( i < rows - 1) {
                    this.neighbors.push(grid[i + 1][j]);
                }
                if (j > 0) {
                    this.neighbors.push(grid[i][j - 1]);
                }
                if ( j < cols - 1) {
                    this.neighbors.push(grid[i][j + 1]);
                }
            }
        }

    const gridWithNode = (<div>
        {Grid.map((row, rowIndex) => {
            return (
                <div key={rowIndex} className="rowWrapper">
                    {row.map((col, colIndex) => {
                        const {isStart, isEnd, isWall} = col;
                        return(
                            <Nodes key={colIndex} isStart = {isStart} isEnd = {isEnd} row={rowIndex} col={colIndex} isWall={isWall}/>
                        )
                    })}
                </div>
            )
        })}
    </div>)
        
        const visualizeShortestPath = (nodes) => {
            for (let i = 0; i < nodes.length; i++) {
                setTimeout(() => {
                    const node = nodes[i];
                    document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path";
                }, 10 * i)
            }

        };
        const visualizeAlgorithm = () => {
            for (let i = 0; i <= VisitedNodes.length; i++) {
                
                if (i === VisitedNodes.length) {
                    setTimeout(() => {
                        visualizeShortestPath(Path);
                    }, 20 * i)
                } else {
                    setTimeout(() => {
                        const node = VisitedNodes[i];
                        document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited";
                    }, 20 * i)
                    
                }
            }
        }

        console.log(Path);
    return (
        <div className="wrapper">
            
            <button onClick={visualizeAlgorithm} className="button1"> Visualize Path with the A* Algorithm</button>
            {gridWithNode}
        </div>
      )

}

export default PathFinder;