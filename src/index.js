import {Player, Computer} from "./player";
import GameBoard from "./game-board";
import Ship from "./ship";
import styles from './style.css'

const startBtn = document.querySelector('.start');
const gameBoards = document.getElementsByClassName('board');
startBtn.addEventListener('click', startGame())


function startGame() {
    const player1 = new Player;
    const player2 = new Player;
    createBoardGrid(64);
}

function createBoardGrid(gridSize) {
    let n = 0;
    for(let i = 0; i < gridSize; i++){
        let div = document.createElement('div');
        div.className = "squares";
        if(i === 32) n += 1;
        gameBoards[n].appendChild(div);
        gameBoards[n].style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        gameBoards[n].style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    }
}

export {startGame}