import {Player, Computer} from "./player";
import GameBoard from "./game-board";
import Ship from "./ship";
import styles from './style.css'

const startBtn = document.querySelector('.start');
const gameBoards = document.getElementsByClassName('board');
startBtn.addEventListener('click', () => {});

const player1 = new Player;
const player2 = new Player;
let turn = player1;

player1.gameBoard.placeShip(new Ship(3), [[4,3], [4,4],[4,5]])
player1.gameBoard.placeShip(new Ship(2), [[6,1], [5,1]])
player1.gameBoard.placeShip(new Ship(4), [[4,7], [3,7], [2,7], [1,7]])
player2.gameBoard.placeShip(new Ship(2), [[0,3], [1,3]])
player2.gameBoard.placeShip(new Ship(4), [[7,3], [6,3],[5,3], [4,3]])
player2.gameBoard.placeShip(new Ship(3), [[5,5], [4,5],[3,5]])  

createBoardGrid(player1.gameBoard.grid, 0);
createBoardGrid(player2.gameBoard.grid, 1)

function createBoardGrid(grid, t) {
    for(let i = 0; i < grid.length; i++){
        for(let n in grid[i]){
            let square = document.createElement('div');
            square.className = "squares";
            //Checks for Ship
            if(grid[i][n] !== false) square.classList.add('ship');
            //Set coordinates
            square.id = `${i},${n}`
            square.addEventListener('click', (e) => {
                let board = square.parentElement.classList.contains('1')
                let x = Number(square.id.at(0));
                let y = Number(square.id.at(2));
                squareEvent(x, y, board);
                let result = styleSquare(square, turn.gameBoard.grid[x][y])
                console.log(result)
                console.log(`Square Status: ${turn.gameBoard.grid[x][y]}`)
            });
            gameBoards[t].appendChild(square);
            gameBoards[t].style.gridTemplateColumns = `repeat(64, 1fr)`;
            gameBoards[t].style.gridTemplateRows = `repeat(64, 1fr)`;
        }
    }
}

function squareEvent(x, y, board){
    if(turn === player1 && board === false) {
        turn = player2;
        return turn.gameBoard.receiveAttack(x, y);
    } else if(board === true && turn === player2){
        turn = player1
        return turn.gameBoard.receiveAttack(x, y);
    }
}

function styleSquare(square, status) {
    if(status === 'hit') {
        square.style.backgroundColor = "red"
    } else if(status === 'miss') {
        square.style.backgroundColor = "grey"
    }
}


