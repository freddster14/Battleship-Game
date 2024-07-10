import {Player, Computer} from "./player";
import Ship from "./ship";
import { styleUI, destroyBoard, gameOverDisplay } from "./styleUI";
import { createCpuGrid, computerAttack } from "./cpu";
import styles from './style.css'
import backgroundAudio from './background-music.mp3'

const overlay = document.querySelector('.overlay');
const gameModeDisplay = document.querySelector('.game-mode');
const gameContainer = document.querySelector('.board-container')
const gameBoards = document.getElementsByClassName('board');
const backgroundMusic = new Audio(backgroundAudio);
const player1 = new Player;

let player2;
let gameMode = 'null';
let opponent;
let difficult = null;
let selectedShip = [];
let rotate = false;
let randomize = false;
let usedShips = [];
let playerPlacement = player1;
let screenWidth  = 
window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

(screenWidth < 1185) ? screenWidth = true : screenWidth = false;
//CPU button
document.querySelector('.computer').addEventListener('click', () => {
    backgroundMusic.loop = true;
    backgroundMusic.load()
    backgroundMusic.play()
    player2 = new Computer;
    gameMode = 'computer';
    opponent = player2
    //Difficulty buttons
    document.querySelectorAll('.difficult > button').forEach((button) => {
        document.querySelector('.mode-container').style.display = 'none'
        document.querySelector('.difficult').style.display = 'block'
        button.addEventListener('click', (e) => {
            document.querySelector('.board-placement').style.display = 'flex';
            overlay.style.display = 'none';
            gameModeDisplay.style.display = 'none';
            difficult = e.target.className
            createPlacementGrid(player1);
        })
    })
});
//VS Button
document.querySelector('.vs').addEventListener('click', () => {
    backgroundMusic.loop = true;
    backgroundMusic.load()
    backgroundMusic.play()
    player2 = new Player
    overlay.style.display = 'none';
    gameModeDisplay.style.display = 'none';
    document.querySelector('.board-placement').style.display = 'flex';
    gameMode = 'vs';
    opponent = player2
    createPlacementGrid(player1)
});




//Ship buttons for placement
document.querySelectorAll('.ships > button').forEach((button) => {
    button.addEventListener('click', (e) => {
        selectedShip = returnShipLength(e.target.classList.value)
    })
});
//Rotate Button
document.querySelector('.rotate').addEventListener('click', () => {
    (rotate === false) ? rotate = true : rotate = false
});

document.querySelector('.randomize').addEventListener('click', () => {
    randomize = true
    for(let i = 0; i < 4; i++) {
        let random = Math.round(Math.random() * 63);
        let rotate = Math.round(Math.random())
        //Selects ship
        let ship = document.querySelector('.ships').children[i];
        ship.click()
        if(rotate === 1) document.querySelector('.rotate').click()
        //Attempt to place ship
        gameBoards[0].children[random].click();
        //If ship did not place re run loop
        if(!gameBoards[0].children[random].classList.contains(ship.className)){
            i--;
        }
    }
    randomize = false
})


document.querySelector('.confirm').addEventListener('click', () => {
    let storage = {
        battleship: [],
        destroyer: [],
        submarine: [],
        'patrol-boat': []
    }
    //Adds index of ships to storage
    for(let i = 0; i< 64; i++) {
        let div = gameBoards[0].children[i]
        if(div.classList.contains('battleship')) {
            storage.battleship.push([div.id[0], div.id[2]])
        } else if(div.classList.contains('destroyer')) {
            storage.destroyer.push([div.id[0], div.id[2]])
        } else if(div.classList.contains('submarine')) {
            storage.submarine.push([div.id[0], div.id[2]])
        } else if(div.classList.contains('patrol-boat')) {
            storage['patrol-boat'].push([div.id[0], div.id[2]])
        }
    }
    //Breaks if missing a ship
    for(let n in storage){
        if(storage[n].length === 0) return;
    }
    //Insert ship place to object's grid
    for(let n in storage){
        playerPlacement.gameBoard.placeShip(new Ship(n, returnShipLength(n)[1]), storage[n])
    }
    if(gameMode === 'computer') {
        createGameGrid(player1.gameBoard.grid, 1)
        createCpuGrid(player2);
        document.querySelector('.board-placement').style.display = 'none'
    } else if (gameMode === 'vs') {
        if(playerPlacement === player1) {
            createPlacementGrid(player2)
        } else{
            createGameGrid(player1.gameBoard.grid, 1);
            createGameGrid(player2.gameBoard.grid, 2);
            document.querySelector('.board-placement').style.display = 'none'
        }
    }
});

gameBoards[0].addEventListener('click', (e) => {placeShip(e)});

function createPlacementGrid(player) {
    playerPlacement = player;
    const playerName = document.querySelector('.player-name');
    (player === player1) ? playerName.textContent = "Player 1" : playerName.textContent = "Player 2";
    for(let i = 0; i < player.gameBoard.grid.length; i++){
        for(let n in player.gameBoard.grid[i]){
            const square = document.createElement('div');
            //Remove player 1 board
            if(player === player2) gameBoards[0].children[0].remove();
            gameBoards[0].appendChild(square);
            gameBoards[0].style.gridTemplateColumns = `repeat(64, 1fr)`;
            gameBoards[0].style.gridTemplateRows = `repeat(64, 1fr)`;
            square.className = "squares";
            square.id = `${i},${n}`;
        }
    }
} 

function placeShip(e) {
    if(selectedShip === null) return;
    let current = e.target;
    //Removes same ship to re insert
    if(usedShips.includes(selectedShip[0])) {
        usedShips = usedShips.filter((ship) => ship !== selectedShip[0]);
        removeShipPlacement(selectedShip[0])
    }
    if(rotate & !((+current.id[0] + selectedShip[1]) > 8)) {
        //Goes through board's div vertically
        for(let i = 0; i < selectedShip[1]; i++){
            //Remove ship due to a ship already there
            if(current.classList.length > 1) return removeShipPlacement(selectedShip[0])
            //Display ship to grid
            current.classList.add(selectedShip[0]);
            if(i === selectedShip[1] - 1) break;
            //Goes trough columns
            for(let n = 0; n <= 7; n++){
                current = current.nextElementSibling;
            }
        }
        usedShips.push(selectedShip[0])
     } else if(!rotate & !((+current.id[2] + selectedShip[1]) > 8)){
        for(let i = 0; i < selectedShip[1]; i++){
            //Remove ship due to a ship already there
            if(current.classList.length > 1) return removeShipPlacement(selectedShip[0])
            //Display ship to grid
            current.classList.add(selectedShip[0]);
            if(i === selectedShip[1] - 1) break;
            current = current.nextElementSibling;
        }
        usedShips.push(selectedShip[0])
     }
     //Shakes board if invalid placement
     if(!usedShips.includes(selectedShip[0]) && randomize === false) {
        gameBoards[0].classList.toggle('shake')
        setTimeout(() => {gameBoards[0].classList.toggle('shake')}, 250)
     }
}

function removeShipPlacement(ship) {
    if(ship === undefined) return
    for(let n in gameBoards[0].children){
        if(gameBoards[0].children[+n].classList.contains(ship)){
            gameBoards[0].children[+n].classList.remove(ship)
        };
        if(+n === 63) return;
    }
}

function returnShipLength(shipName) {
    let length = 0;
    if(shipName === 'battleship') {
        length = 4
    } else if(shipName === 'patrol-boat') {
        length = 2
    } else {
        length = 3
    }
    return [shipName, length]
}


function createGameGrid(grid, t) {
    gameContainer.style.display = 'flex';
    for(let i = 0; i < grid.length; i++){
        for(let n in grid[i]){
            const square = document.createElement('div');
            gameBoards[t].appendChild(square);
            gameBoards[t].style.gridTemplateColumns = `repeat(64, 1fr)`;
            gameBoards[t].style.gridTemplateRows = `repeat(64, 1fr)`;
            const boardBoolean = square.parentElement.classList.contains('1');
            square.className = "squares";
            square.id = `${i},${n}`
            square.addEventListener('click', (e) => {
                if(!checkTurn(boardBoolean)) return
                let x = Number(square.id.at(0));
                let y = Number(square.id.at(2));
                let result = attackSquare(x, y, boardBoolean);
                styleUI(square, result);
                changeTurn(result);
                computerAttack(difficult);
            });
            //Checks for Ship, to show or hide
            if(grid[i][n] !== false) {
                square.classList.add(`${grid[i][n].name}`)
                if((gameMode === 'computer' && boardBoolean === false) || gameMode === 'vs')
                 square.classList.add('hidden');
            };
        }
    }
    //Only displays opponent board
    if(screenWidth) document.querySelector('.player2').classList.toggle('toggle');
    screenWidth = false
}

function attackSquare(x, y, board){
    if(opponent === player1 && board === true) {
        return opponent.gameBoard.receiveAttack(x, y);
    } else if(board === false && opponent === player2){
        return opponent.gameBoard.receiveAttack(x, y);
    }
}


function checkTurn(board) {
    if((opponent === player1 && board === true) || (board === false && opponent === player2)) {
        return true
    }
    return false
}

function changeTurn(result) {
    if(result === 'same spot') return
    if(result === 'hit') {
        return gameStatus()
    } else if(result === 'miss') {
        (opponent === player1) ? opponent = player2 : opponent = player1;
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
        backgroundMusic.pause()
        destroyBoard(gameBoards[2])
        gameOverDisplay(player1)
    } else if(opponent === player1 && over) {
        backgroundMusic.pause()
        destroyBoard(gameBoards[1])
        gameOverDisplay(player2)
    }
}

export {createGameGrid, player1, player2, opponent}