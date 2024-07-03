import {Player, Computer} from "./player";
import Ship from "./ship";
import styles from './style.css'

const cpuBtn = document.querySelector('.computer');
const vsBtn = document.querySelector('.vs');
const overlay = document.querySelector('.overlay');
const gameModeDisplay = document.querySelector('.game-mode');
const gameContainer = document.querySelector('.board-container')
const gameBoards = document.getElementsByClassName('board');
const turnDisplay = document.querySelector('.player-turn');
const infoStatus = document.querySelector('.info');

const player1 = new Player;
const player2 = new Computer;

let gameMode = 'null';
let opponent = player2;

player1.gameBoard.placeShip(new Ship('destroyer',3), [[4,3], [4,4],[4,5]])
player1.gameBoard.placeShip(new Ship('patrol-boat',2), [[6,1], [5,1]])
player1.gameBoard.placeShip(new Ship('battleship',4), [[4,7], [3,7], [2,7], [1,7]])
// player2.gameBoard.placeShip(new Ship(2), [[0,3], [1,3]])
// player2.gameBoard.placeShip(new Ship(4), [[7,3], [6,3],[5,3], [4,3]])
// player2.gameBoard.placeShip(new Ship(3), [[5,5], [4,5],[3,5]])  



cpuBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    gameModeDisplay.style.display = 'none';
    gameMode = 'computer'
    startGame()
});

vsBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    gameModeDisplay.style.display = 'none';
    gameMode = 'vs'
    startGame()
});

function startGame() {
    createBoardGrid(player1.gameBoard.grid, 0);
    if(gameMode === 'computer') {
        player2.gameBoard.placeShip(new Ship('battleship', 4), randomPlacement(4));
        player2.gameBoard.placeShip(new Ship('destroyer',3), randomPlacement(3));
        player2.gameBoard.placeShip(new Ship('submarine',3), randomPlacement(3));
        player2.gameBoard.placeShip(new Ship('patrol-boat',2), randomPlacement(2));
        createBoardGrid(player2.gameBoard.grid, 1)
    }else if (gameMode === 'vs'){    
        createBoardGrid(player2.gameBoard.grid, 1);
    }
}






function createBoardGrid(grid, t) {
    for(let i = 0; i < grid.length; i++){
        for(let n in grid[i]){
            let square = document.createElement('div');
            gameBoards[t].appendChild(square);
            gameBoards[t].style.gridTemplateColumns = `repeat(64, 1fr)`;
            gameBoards[t].style.gridTemplateRows = `repeat(64, 1fr)`;
            let boardBoolean = square.parentElement.classList.contains('1');
            square.className = "squares";
            //Checks for Ship
            if(grid[i][n] !== false) {
                square.classList.add(`${grid[i][n].name}`)
                if(gameMode === 'computer' && boardBoolean === false) square.classList.add('hidden');
            };
            square.id = `${i},${n}`
            square.addEventListener('click', (e) => {
                let x = Number(square.id.at(0));
                let y = Number(square.id.at(2));
                let result = squareEvent(x, y, boardBoolean);
                styleUI(square, result);
                changeTurn(result);
                computerAttack();
            });
            
        }
    }
}

function squareEvent(x, y, board){
    if(opponent === player1 && board === true) {
        return opponent.gameBoard.receiveAttack(x, y);
    } else if(board === false && opponent === player2){
        return opponent.gameBoard.receiveAttack(x, y);
    }
}

function changeTurn(result) {
    if(result === 'same spot') return
    if(result === 'hit') {
        return gameStatus()
    } else if(result === 'miss') {
        (opponent === player1) ? opponent = player2 : opponent = player1;
    }
}

function randomPlacement(shipLength) {
    let coordinates = randomCoordinates()
    let x = coordinates[0][0];
    let y = coordinates[0][1];
    let vertical = Math.round(Math.random() * 1);
    for(let i = 0; i < shipLength - 1; i++){
        if(vertical){
            coordinates.push([x += 1, y])
        } else {
            coordinates.push([x, y += 1])
        }
        if(x === 8 || y === 8 || player2.gameBoard.grid[x][y] !== false){
            i = -1;
            coordinates = randomCoordinates();
            x = coordinates[0][0];
            y = coordinates[0][1];
            continue;
        }
    }
    return coordinates 
}

function randomCoordinates() {
    let x = Math.floor(Math.random() * 8);
    let y = Math.floor(Math.random() * 8);
    while(player2.gameBoard.grid[x][y] !== false) {
        x = Math.floor(Math.random() * 8);
        y = Math.floor(Math.random() * 8);
    }
    return [[x,y]]
}

function computerAttack(){
    if(opponent === player1 && player2.constructor.name === "Computer"){
        setTimeout(() => {
            let randomIndex = Math.floor(Math.random() * 64);
            let square = document.getElementsByClassName('board')[0].children[randomIndex];
            while(square.classList.contains("hit") || square.classList.contains("miss")) {
                randomIndex = Math.floor(Math.random() * 64);
                square = document.getElementsByClassName('board')[0].children[randomIndex];
            }
            square.click()
        }, 1750)
    }
}

function styleUI(square, status) {
    if(status === 'same spot') return
    if(status === 'hit') {
        square.classList.add('hit');
        square.classList.remove('hidden')
        infoStatus.textContent = "You hit a ship! Attack again!"
    } else if(status === 'miss') {
        square.classList.add('miss')
        infoStatus.textContent = "Oh no, a miss!"
        setTimeout(() => {
            (opponent === player1)
            ? turnDisplay.textContent = "Player 2:"
            : turnDisplay.textContent = "Player 1:";
            infoStatus.textContent = "Attack!"
        }, 1000)
    }
}
function gameStatus(){
    let over = null;
    //Checks for game over
    if(opponent === player2){
        over = player2.gameBoard.isAllSunk()
    } else {
        over = player1.gameBoard.isAllSunk()
    }
    //Style board and updates game display
    if(over && opponent === player2) {
        destroyBoard(gameBoards[1])
        gameOverDisplay(player1)
    } else if(opponent === player1 && over) {
        destroyBoard(gameBoards[0])
        gameOverDisplay(player2)
    }
}

function destroyBoard(board){
    let i = 0;
    let xLeft = 0;
    let xRight = 7;
    let interval = setInterval(() => {
        board.children[i].classList.remove('hit');
        board.children[i].classList.remove('miss');
        if(i === xLeft){
            xLeft += 9;
            return board.children[i].style.backgroundColor = 'red'
        } else if(i === xRight) {
            xRight += 7;
            return board.children[i].style.backgroundColor = 'red'
        }
        board.children[i].id = 'game-over';
        i++;
        if(i === 64) clearInterval(interval)
    }, 20);
}

function gameOverDisplay(winner) {
    if(winner.constructor.name === 'Computer'){
        turnDisplay.textContent = "Computer:"
        infoStatus.textContent = "Defeated all Player 1 ships!"
    } else if(opponent === player2) {
        turnDisplay.textContent = "Player 1:"
        infoStatus.textContent = "Defeated all Player 2 ships!"
    } else {
        turnDisplay.textContent = "Player 2:"
        infoStatus.textContent = "Defeated all Player 1 ships!"
    }
}
