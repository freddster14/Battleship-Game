/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/computer.js":
/*!*************************!*\
  !*** ./src/computer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Computer: () => (/* binding */ Computer)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.js");
/* harmony import */ var _game_board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-board */ "./src/game-board.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship */ "./src/ship.js");





let attackAgain = false;

class Computer {
    constructor(){
        this.gameBoard = new _game_board__WEBPACK_IMPORTED_MODULE_1__["default"];
    }
    createCpuGrid(cpu) {
        cpu.gameBoard.placeShip(new _ship__WEBPACK_IMPORTED_MODULE_2__["default"]('destroyer', 3), randomCpuPlacement(3, 2))
        cpu.gameBoard.placeShip(new _ship__WEBPACK_IMPORTED_MODULE_2__["default"]('battleship', 4), randomCpuPlacement(4, 2))
        cpu.gameBoard.placeShip(new _ship__WEBPACK_IMPORTED_MODULE_2__["default"]('submarine', 3), randomCpuPlacement(3, 2))
        cpu.gameBoard.placeShip(new _ship__WEBPACK_IMPORTED_MODULE_2__["default"]('patrol-boat', 2), randomCpuPlacement(2, 2));
        cpu.gameBoard.createGameGrid(cpu.gameBoard.grid, 2)
    }
    computerAttack(difficult){
        if(_game_board__WEBPACK_IMPORTED_MODULE_1__.opponent === _index__WEBPACK_IMPORTED_MODULE_0__.player1){
           if(difficult === 'easy'){
            easyAttack()
           } else if(difficult === 'medium' && !attackAgain) {
            mediumAttack()
           } else if(difficult === 'hard' && !attackAgain) {
            hardAttack()
           }
        }
    }
}

function easyAttack() {
    //Random attack
    let randomIndex = Math.floor(Math.random() * 64);
    let square = document.getElementsByClassName('board')[1].children[randomIndex];
    while(square.classList.contains("hit") || square.classList.contains("miss")) {
        randomIndex = Math.floor(Math.random() * 64);
        square = document.getElementsByClassName('board')[1].children[randomIndex];
    }
    setTimeout(() => {
        square.click()
    }, 2000)
    
   return square
}

function mediumAttack() {
    let square;
    let index;
    //Attack random until hit
    if(!attackAgain) square = easyAttack();

    let x = +square.id[0];
    let y = +square.id[2];
    //Ship === 'hit'
    let object = _index__WEBPACK_IMPORTED_MODULE_0__.player1.gameBoard.grid[x][y];
    if(object !== false) {
        attackAgain = true
        index = findAdjacentShip(x, y, square)[0]
        if(index === undefined) return;
        //4s because the first attack also has Timeout
        setTimeout(() => {
            index.click()
            attackAgain = false;
            _index__WEBPACK_IMPORTED_MODULE_0__.player2.computerAttack('medium')
        }, 4000); 
    }
}


function hardAttack() {
    let square;
    let index;
    //Attack random until hit
    if(!attackAgain) square = easyAttack();
    
    let x = +square.id[0];
    let y = +square.id[2];
    //Ship === 'hit'
    let object = _index__WEBPACK_IMPORTED_MODULE_0__.player1.gameBoard.grid[x][y];
    if(object !== false) {
        let storage = [];
        attackAgain = true;
        index = findAdjacentShip(x, y, square);
        if(index === undefined) return;
        for(let n in index) {storage.push(index[n])}
        let i = 0;
        while(storage.length !== object.length - 1) {
                index = findAdjacentShip(storage[i].id[0], storage[i].id[2], storage[i]);
                for(let n in index) {
                    //Push new ship placement
                    if(!storage.includes(index[n]) && square.id !== index[n].id) {
                        storage.push(index[n]);
                    }
                }
            i++;
        }
        setTimeout(() => {
            for(let n in storage){
                let i = 1;
                i += +n;
                i *= 1800;
                setTimeout(() => {
                    storage[n].click();
                    if(object.isSunk()) {
                        attackAgain = false;
                        _index__WEBPACK_IMPORTED_MODULE_0__.player2.computerAttack('hard')
                    }
                }, i)
            }  
        }, 2000)   
    }
}

function findAdjacentShip(x, y, square) {
    let z;
    let w; 
    let index;
    let storage = []
    for(let i = 0; i < 4; i++) {
        z = +x;
        w = +y;
        //Check adjacent square to find ship
        if(i === 0){
            index = square.nextSibling;
        } else if(i === 1) {
            index = square.previousSibling;
        } else if(i === 2) {
            index = square.parentElement.children[((z -= 1) * 8) + w]
        } else {
            index = square.parentElement.children[((z += 1) * 8) + w]
        }
        //No valid square to attack again
        if(index === null || index === undefined) continue;
        if(index.classList.contains(square.classList[1]) && !index.classList.contains('hit')){
            storage.push(index)
        }
    }
    if(storage === []) return undefined
    return storage;
}


function randomCpuPlacement(shipLength) {
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
        if(x === 8 || y === 8 || _index__WEBPACK_IMPORTED_MODULE_0__.player2.gameBoard.grid[x][y] !== false){
            //Restart, invalid position
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
    while(_index__WEBPACK_IMPORTED_MODULE_0__.player2.gameBoard.grid[x][y] !== false) {
        x = Math.floor(Math.random() * 8);
        y = Math.floor(Math.random() * 8);
    }
    return [[x,y]]
}



/***/ }),

/***/ "./src/game-board.js":
/*!***************************!*\
  !*** ./src/game-board.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameBoard),
/* harmony export */   opponent: () => (/* binding */ opponent)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.js");
/* harmony import */ var _styleUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styleUI */ "./src/styleUI.js");



const gameBoards = document.getElementsByClassName('board');
let opponent;
let screenWidth  = window.innerWidth || document.documentElement.clientWidth 
                   || document.body.clientWidth;
(screenWidth < 1185) ? screenWidth = true : screenWidth = false;
        

class GameBoard {
    constructor(opponent){
        this.grid = new Array(8).fill(null).map(() => new Array(8).fill(false));
        this.opponent = opponent
    }
    placeShip(ship, area){
        for(let n = 0; n < ship.length; n++){
            if(this.grid[area[n][0]][area[n][1]] !== false) return 'invalid placement';
            this.grid[area[n][0]][area[n][1]] = ship
        }
        return area
    }
    receiveAttack(x, y, board){
        if(opponent === _index__WEBPACK_IMPORTED_MODULE_0__.player1 && board === true || board === false && opponent === _index__WEBPACK_IMPORTED_MODULE_0__.player2) {
            const ship = this.grid[x][y];
            const hitOrMiss = this.attackLogic(ship);
            return this.grid[x][y] = hitOrMiss;
        }
        
    }
    attackLogic(index){
        if(index === 'hit' || index === 'miss' || index === 'same spot') return 'same spot'
        if(index === false) {
            return index = 'miss';
        } else if(index !== false) {
            index.hit();
            index.sunk = index.isSunk();
            //Remove ship from grid
            return index = 'hit'
        }
    }
    changeTurn(result) {
        if(result === 'same spot') return opponent
        if(result === 'hit') {
            this.gameStatus()
            return opponent
        } else if(result === 'miss') {
            return (opponent === _index__WEBPACK_IMPORTED_MODULE_0__.player1) ? opponent = _index__WEBPACK_IMPORTED_MODULE_0__.player2 :  opponent = _index__WEBPACK_IMPORTED_MODULE_0__.player1;
        }
    }
    checkTurn(boardBoolean) {
        if((opponent === _index__WEBPACK_IMPORTED_MODULE_0__.player1 && boardBoolean === true) || (boardBoolean === false && opponent === _index__WEBPACK_IMPORTED_MODULE_0__.player2)) {
            return true
        }
        return false
    }
    isAllSunk(){
        for(let i = 0; i < this.grid.length; i++){
            for(let n in this.grid[i]){
                if(this.grid[i][n].constructor.name === 'Ship') {
                    return false
                }
            }
        }
        return true
    }
    gameStatus(){
        let over = null;
        //Checks for game over
        if(opponent === _index__WEBPACK_IMPORTED_MODULE_0__.player2){
            over = _index__WEBPACK_IMPORTED_MODULE_0__.player2.gameBoard.isAllSunk()
        } else {
            over = _index__WEBPACK_IMPORTED_MODULE_0__.player1.gameBoard.isAllSunk()
        }
        //Style board and updates game display
        if(over && opponent === _index__WEBPACK_IMPORTED_MODULE_0__.player2) {
            (0,_styleUI__WEBPACK_IMPORTED_MODULE_1__.destroyBoard)(gameBoards[2])
            ;(0,_styleUI__WEBPACK_IMPORTED_MODULE_1__.gameOverDisplay)(_index__WEBPACK_IMPORTED_MODULE_0__.player1)
        } else if(opponent === _index__WEBPACK_IMPORTED_MODULE_0__.player1 && over) {
            (0,_styleUI__WEBPACK_IMPORTED_MODULE_1__.destroyBoard)(gameBoards[1])
            ;(0,_styleUI__WEBPACK_IMPORTED_MODULE_1__.gameOverDisplay)(_index__WEBPACK_IMPORTED_MODULE_0__.player2)
        }
    }
    createGameGrid(grid, t) {
        const gameContainer = document.querySelector('.board-container');
        opponent = _index__WEBPACK_IMPORTED_MODULE_0__.player2;
        gameContainer.style.display = 'flex';
        for(let i = 0; i < grid.length; i++){
            for(let n in grid[i]){
                const square = document.createElement('div');
                gameBoards[t].appendChild(square);
                gameBoards[t].style.gridTemplateColumns = `repeat(64, 1fr)`;
                gameBoards[t].style.gridTemplateRows = `repeat(64, 1fr)`;
                square.className = "squares";
                square.id = `${i},${n}`;
                let boardBoolean = square.parentElement.classList.contains('1');
                square.addEventListener('click', (e) => {
                    //Board 1 is player 1
                    if(!opponent.gameBoard.checkTurn(boardBoolean)) return;
                    let x = Number(square.id.at(0));
                    let y = Number(square.id.at(2));
                    let result = opponent.gameBoard.receiveAttack(x, y, boardBoolean);
                    (0,_styleUI__WEBPACK_IMPORTED_MODULE_1__.styleUI)(square, result);
                    opponent.gameBoard.changeTurn(result);
                    if(_index__WEBPACK_IMPORTED_MODULE_0__.player2.constructor.name === 'Computer') _index__WEBPACK_IMPORTED_MODULE_0__.player2.computerAttack(_index__WEBPACK_IMPORTED_MODULE_0__.difficult);
                });
                //Checks for Ship, to show or hide
                if(grid[i][n] !== false) {
                    square.classList.add(`${grid[i][n].name}`)
                    if((_index__WEBPACK_IMPORTED_MODULE_0__.player2.constructor.name === 'Computer' && boardBoolean === false) || _index__WEBPACK_IMPORTED_MODULE_0__.player2.constructor.name === 'Player')
                     square.classList.add('hidden');
                };
            }
        }
        //Only displays opponent board;
        if(screenWidth) document.querySelector('.player2').classList.toggle('toggle');
        screenWidth = false
    }
}





/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   difficult: () => (/* binding */ difficult),
/* harmony export */   player1: () => (/* binding */ player1),
/* harmony export */   player2: () => (/* binding */ player2)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _computer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computer */ "./src/computer.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _background_music_mp3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./background-music.mp3 */ "./src/background-music.mp3");






const overlay = document.querySelector('.overlay');
const gameModeDisplay = document.querySelector('.game-mode');
const gameBoards = document.getElementsByClassName('board');
const backgroundMusic = new Audio(_background_music_mp3__WEBPACK_IMPORTED_MODULE_4__);
const player1 = new _player__WEBPACK_IMPORTED_MODULE_0__.Player;

let player2;
let difficult = null;
let selectedShip = [];
let rotate = false;
let randomize = false;
let usedShips = [];
let playerPlacement = player1;

//CPU button
document.querySelector('.computer').addEventListener('click', () => {
    backgroundMusic.loop = true;
    backgroundMusic.load()
    backgroundMusic.play()
    player2 = new _computer__WEBPACK_IMPORTED_MODULE_2__.Computer;
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
    player2 = new _player__WEBPACK_IMPORTED_MODULE_0__.Player
    overlay.style.display = 'none';
    gameModeDisplay.style.display = 'none';
    document.querySelector('.board-placement').style.display = 'flex';
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
        playerPlacement.gameBoard.placeShip(new _ship__WEBPACK_IMPORTED_MODULE_1__["default"](n, returnShipLength(n)[1]), storage[n])
    }
    if(player2.constructor.name === 'Computer') {
        player1.gameBoard.createGameGrid(player1.gameBoard.grid, 1)
        player2.createCpuGrid(player2);
        document.querySelector('.board-placement').style.display = 'none'
    } else if (player2.constructor.name === 'Player') {
        if(playerPlacement === player1) {
            createPlacementGrid(player2)
        } else{
            player1.gameBoard.createGameGrid(player1.gameBoard.grid, 1);
            player2.gameBoard.createGameGrid(player2.gameBoard.grid, 2);
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






/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _game_board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-board */ "./src/game-board.js");


class Player {
    constructor() {
        this.gameBoard = new _game_board__WEBPACK_IMPORTED_MODULE_0__["default"];
    }
    
}




/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
class Ship{
    constructor(name, length, timesHit = 0, sunk = false){
        this.name = name
        this.length = length;
        this.timesHit = timesHit;
        this.sunk = sunk
    }
    hit(){
        return this.timesHit += 1
    }
    isSunk(){
        if(this.length === this.timesHit) this.sunk = true;
        return this.sunk;
    }
}

/***/ }),

/***/ "./src/styleUI.js":
/*!************************!*\
  !*** ./src/styleUI.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   destroyBoard: () => (/* binding */ destroyBoard),
/* harmony export */   gameOverDisplay: () => (/* binding */ gameOverDisplay),
/* harmony export */   styleUI: () => (/* binding */ styleUI)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.js");
/* harmony import */ var _game_board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-board */ "./src/game-board.js");
/* harmony import */ var _hit_audio_wav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hit-audio.wav */ "./src/hit-audio.wav");
/* harmony import */ var _miss_audio_mp3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./miss-audio.mp3 */ "./src/miss-audio.mp3");





const turnDisplay = document.querySelector('.player-turn');
const infoStatus = document.querySelector('.info');
const hitAudio = new Audio(_hit_audio_wav__WEBPACK_IMPORTED_MODULE_2__);
const missAudio = new Audio(_miss_audio_mp3__WEBPACK_IMPORTED_MODULE_3__);

let previousDiv = null;

missAudio.preload = 'auto';
hitAudio.preload = 'auto';

function styleUI(square, status) {
    if(status === 'same spot') return
    if(status === 'hit') {
        hitAudio.currentTime = 0;
        hitAudio.play()
        //Compensates for audio delay
        setTimeout(() => {
            square.classList.add('hit');
            square.classList.remove('hidden');
            infoStatus.textContent = "Attack again!";
            square.parentElement.classList.toggle('shake');
        },250)
        //Remove shake
        setTimeout(() => {square.parentElement.classList.toggle('shake')}, 500)
    } else if(status === 'miss') {
        missAudio.currentTime = 0;
        missAudio.play()
        setTimeout(() => {
            square.classList.add('miss')
            infoStatus.textContent = "Oh no, a miss!";
            if(previousDiv !== null) {
                previousDiv.classList.toggle('prev-miss')
            }
            previousDiv = square;
        }, 250)
        setTimeout(() => {
            (_game_board__WEBPACK_IMPORTED_MODULE_1__.opponent === _index__WEBPACK_IMPORTED_MODULE_0__.player1)
            ? turnDisplay.textContent = "Player 2:"
            : turnDisplay.textContent = "Player 1:";
            infoStatus.textContent = "Attack!";
            document.querySelector('.player1').classList.toggle('toggle');
            document.querySelector('.player2').classList.toggle('toggle')
        }, 1050)
    }
}
function destroyBoard(board){
    let i = 0;
    let xLeft = 0;
    let xRight = 7;
    setTimeout(() => {
        let interval = setInterval(() => {
            board.children[i].classList.remove('hit');
            board.children[i].classList.remove('miss');
            board.children[i].classList.remove('prev-miss')
            hitAudio.currentTime = 1;
            hitAudio.play();
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
    }, 250);
   
}

function gameOverDisplay(winner) {
    setTimeout(() => {
        if(winner.constructor.name === 'Computer'){
            turnDisplay.textContent = "Computer:"
            infoStatus.textContent = "Defeated all Player 1 ships!"
        } else if(_game_board__WEBPACK_IMPORTED_MODULE_1__.opponent === _index__WEBPACK_IMPORTED_MODULE_0__.player2) {
            turnDisplay.textContent = "Player 1:"
            infoStatus.textContent = "Defeated all Player 2 ships!"
        } else {
            turnDisplay.textContent = "Player 2:"
            infoStatus.textContent = "Defeated all Player 1 ships!"
        }
    },500) 
}



/***/ }),

/***/ "./src/background-music.mp3":
/*!**********************************!*\
  !*** ./src/background-music.mp3 ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "4f5d435eec0d50f89beb.mp3";

/***/ }),

/***/ "./src/hit-audio.wav":
/*!***************************!*\
  !*** ./src/hit-audio.wav ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "84caba8eb3442457431e.wav";

/***/ }),

/***/ "./src/miss-audio.mp3":
/*!****************************!*\
  !*** ./src/miss-audio.mp3 ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2a1d8e60fcc01501596f.mp3";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7VUVsQkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS8uL3NyYy9jb21wdXRlci5qcyIsIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvLi9zcmMvZ2FtZS1ib2FyZC5qcyIsIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvLi9zcmMvc3R5bGVVSS5qcyIsIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IHBsYXllcjEsIHBsYXllcjJ9IGZyb20gJy4vaW5kZXgnO1xuaW1wb3J0IEdhbWVCb2FyZCBmcm9tICcuL2dhbWUtYm9hcmQnO1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7b3Bwb25lbnR9IGZyb20gJy4vZ2FtZS1ib2FyZCdcblxubGV0IGF0dGFja0FnYWluID0gZmFsc2U7XG5cbmNsYXNzIENvbXB1dGVyIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmdhbWVCb2FyZCA9IG5ldyBHYW1lQm9hcmQ7XG4gICAgfVxuICAgIGNyZWF0ZUNwdUdyaWQoY3B1KSB7XG4gICAgICAgIGNwdS5nYW1lQm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKCdkZXN0cm95ZXInLCAzKSwgcmFuZG9tQ3B1UGxhY2VtZW50KDMsIDIpKVxuICAgICAgICBjcHUuZ2FtZUJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgnYmF0dGxlc2hpcCcsIDQpLCByYW5kb21DcHVQbGFjZW1lbnQoNCwgMikpXG4gICAgICAgIGNwdS5nYW1lQm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKCdzdWJtYXJpbmUnLCAzKSwgcmFuZG9tQ3B1UGxhY2VtZW50KDMsIDIpKVxuICAgICAgICBjcHUuZ2FtZUJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgncGF0cm9sLWJvYXQnLCAyKSwgcmFuZG9tQ3B1UGxhY2VtZW50KDIsIDIpKTtcbiAgICAgICAgY3B1LmdhbWVCb2FyZC5jcmVhdGVHYW1lR3JpZChjcHUuZ2FtZUJvYXJkLmdyaWQsIDIpXG4gICAgfVxuICAgIGNvbXB1dGVyQXR0YWNrKGRpZmZpY3VsdCl7XG4gICAgICAgIGlmKG9wcG9uZW50ID09PSBwbGF5ZXIxKXtcbiAgICAgICAgICAgaWYoZGlmZmljdWx0ID09PSAnZWFzeScpe1xuICAgICAgICAgICAgZWFzeUF0dGFjaygpXG4gICAgICAgICAgIH0gZWxzZSBpZihkaWZmaWN1bHQgPT09ICdtZWRpdW0nICYmICFhdHRhY2tBZ2Fpbikge1xuICAgICAgICAgICAgbWVkaXVtQXR0YWNrKClcbiAgICAgICAgICAgfSBlbHNlIGlmKGRpZmZpY3VsdCA9PT0gJ2hhcmQnICYmICFhdHRhY2tBZ2Fpbikge1xuICAgICAgICAgICAgaGFyZEF0dGFjaygpXG4gICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZWFzeUF0dGFjaygpIHtcbiAgICAvL1JhbmRvbSBhdHRhY2tcbiAgICBsZXQgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2NCk7XG4gICAgbGV0IHNxdWFyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvYXJkJylbMV0uY2hpbGRyZW5bcmFuZG9tSW5kZXhdO1xuICAgIHdoaWxlKHNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaXRcIikgfHwgc3F1YXJlLmNsYXNzTGlzdC5jb250YWlucyhcIm1pc3NcIikpIHtcbiAgICAgICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2NCk7XG4gICAgICAgIHNxdWFyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvYXJkJylbMV0uY2hpbGRyZW5bcmFuZG9tSW5kZXhdO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc3F1YXJlLmNsaWNrKClcbiAgICB9LCAyMDAwKVxuICAgIFxuICAgcmV0dXJuIHNxdWFyZVxufVxuXG5mdW5jdGlvbiBtZWRpdW1BdHRhY2soKSB7XG4gICAgbGV0IHNxdWFyZTtcbiAgICBsZXQgaW5kZXg7XG4gICAgLy9BdHRhY2sgcmFuZG9tIHVudGlsIGhpdFxuICAgIGlmKCFhdHRhY2tBZ2Fpbikgc3F1YXJlID0gZWFzeUF0dGFjaygpO1xuXG4gICAgbGV0IHggPSArc3F1YXJlLmlkWzBdO1xuICAgIGxldCB5ID0gK3NxdWFyZS5pZFsyXTtcbiAgICAvL1NoaXAgPT09ICdoaXQnXG4gICAgbGV0IG9iamVjdCA9IHBsYXllcjEuZ2FtZUJvYXJkLmdyaWRbeF1beV07XG4gICAgaWYob2JqZWN0ICE9PSBmYWxzZSkge1xuICAgICAgICBhdHRhY2tBZ2FpbiA9IHRydWVcbiAgICAgICAgaW5kZXggPSBmaW5kQWRqYWNlbnRTaGlwKHgsIHksIHNxdWFyZSlbMF1cbiAgICAgICAgaWYoaW5kZXggPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgICAvLzRzIGJlY2F1c2UgdGhlIGZpcnN0IGF0dGFjayBhbHNvIGhhcyBUaW1lb3V0XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaW5kZXguY2xpY2soKVxuICAgICAgICAgICAgYXR0YWNrQWdhaW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHBsYXllcjIuY29tcHV0ZXJBdHRhY2soJ21lZGl1bScpXG4gICAgICAgIH0sIDQwMDApOyBcbiAgICB9XG59XG5cblxuZnVuY3Rpb24gaGFyZEF0dGFjaygpIHtcbiAgICBsZXQgc3F1YXJlO1xuICAgIGxldCBpbmRleDtcbiAgICAvL0F0dGFjayByYW5kb20gdW50aWwgaGl0XG4gICAgaWYoIWF0dGFja0FnYWluKSBzcXVhcmUgPSBlYXN5QXR0YWNrKCk7XG4gICAgXG4gICAgbGV0IHggPSArc3F1YXJlLmlkWzBdO1xuICAgIGxldCB5ID0gK3NxdWFyZS5pZFsyXTtcbiAgICAvL1NoaXAgPT09ICdoaXQnXG4gICAgbGV0IG9iamVjdCA9IHBsYXllcjEuZ2FtZUJvYXJkLmdyaWRbeF1beV07XG4gICAgaWYob2JqZWN0ICE9PSBmYWxzZSkge1xuICAgICAgICBsZXQgc3RvcmFnZSA9IFtdO1xuICAgICAgICBhdHRhY2tBZ2FpbiA9IHRydWU7XG4gICAgICAgIGluZGV4ID0gZmluZEFkamFjZW50U2hpcCh4LCB5LCBzcXVhcmUpO1xuICAgICAgICBpZihpbmRleCA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgICAgIGZvcihsZXQgbiBpbiBpbmRleCkge3N0b3JhZ2UucHVzaChpbmRleFtuXSl9XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgd2hpbGUoc3RvcmFnZS5sZW5ndGggIT09IG9iamVjdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBmaW5kQWRqYWNlbnRTaGlwKHN0b3JhZ2VbaV0uaWRbMF0sIHN0b3JhZ2VbaV0uaWRbMl0sIHN0b3JhZ2VbaV0pO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgbiBpbiBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAvL1B1c2ggbmV3IHNoaXAgcGxhY2VtZW50XG4gICAgICAgICAgICAgICAgICAgIGlmKCFzdG9yYWdlLmluY2x1ZGVzKGluZGV4W25dKSAmJiBzcXVhcmUuaWQgIT09IGluZGV4W25dLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yYWdlLnB1c2goaW5kZXhbbl0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZm9yKGxldCBuIGluIHN0b3JhZ2Upe1xuICAgICAgICAgICAgICAgIGxldCBpID0gMTtcbiAgICAgICAgICAgICAgICBpICs9ICtuO1xuICAgICAgICAgICAgICAgIGkgKj0gMTgwMDtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3RvcmFnZVtuXS5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICBpZihvYmplY3QuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFja0FnYWluID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIyLmNvbXB1dGVyQXR0YWNrKCdoYXJkJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGkpXG4gICAgICAgICAgICB9ICBcbiAgICAgICAgfSwgMjAwMCkgICBcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZpbmRBZGphY2VudFNoaXAoeCwgeSwgc3F1YXJlKSB7XG4gICAgbGV0IHo7XG4gICAgbGV0IHc7IFxuICAgIGxldCBpbmRleDtcbiAgICBsZXQgc3RvcmFnZSA9IFtdXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICB6ID0gK3g7XG4gICAgICAgIHcgPSAreTtcbiAgICAgICAgLy9DaGVjayBhZGphY2VudCBzcXVhcmUgdG8gZmluZCBzaGlwXG4gICAgICAgIGlmKGkgPT09IDApe1xuICAgICAgICAgICAgaW5kZXggPSBzcXVhcmUubmV4dFNpYmxpbmc7XG4gICAgICAgIH0gZWxzZSBpZihpID09PSAxKSB7XG4gICAgICAgICAgICBpbmRleCA9IHNxdWFyZS5wcmV2aW91c1NpYmxpbmc7XG4gICAgICAgIH0gZWxzZSBpZihpID09PSAyKSB7XG4gICAgICAgICAgICBpbmRleCA9IHNxdWFyZS5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWygoeiAtPSAxKSAqIDgpICsgd11cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluZGV4ID0gc3F1YXJlLnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bKCh6ICs9IDEpICogOCkgKyB3XVxuICAgICAgICB9XG4gICAgICAgIC8vTm8gdmFsaWQgc3F1YXJlIHRvIGF0dGFjayBhZ2FpblxuICAgICAgICBpZihpbmRleCA9PT0gbnVsbCB8fCBpbmRleCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgICAgaWYoaW5kZXguY2xhc3NMaXN0LmNvbnRhaW5zKHNxdWFyZS5jbGFzc0xpc3RbMV0pICYmICFpbmRleC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpKXtcbiAgICAgICAgICAgIHN0b3JhZ2UucHVzaChpbmRleClcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZihzdG9yYWdlID09PSBbXSkgcmV0dXJuIHVuZGVmaW5lZFxuICAgIHJldHVybiBzdG9yYWdlO1xufVxuXG5cbmZ1bmN0aW9uIHJhbmRvbUNwdVBsYWNlbWVudChzaGlwTGVuZ3RoKSB7XG4gICAgbGV0IGNvb3JkaW5hdGVzID0gcmFuZG9tQ29vcmRpbmF0ZXMoKVxuICAgIGxldCB4ID0gY29vcmRpbmF0ZXNbMF1bMF07XG4gICAgbGV0IHkgPSBjb29yZGluYXRlc1swXVsxXTtcbiAgICBsZXQgdmVydGljYWwgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aCAtIDE7IGkrKyl7XG4gICAgICAgIGlmKHZlcnRpY2FsKXtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goW3ggKz0gMSwgeV0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKFt4LCB5ICs9IDFdKVxuICAgICAgICB9XG4gICAgICAgIGlmKHggPT09IDggfHwgeSA9PT0gOCB8fCBwbGF5ZXIyLmdhbWVCb2FyZC5ncmlkW3hdW3ldICE9PSBmYWxzZSl7XG4gICAgICAgICAgICAvL1Jlc3RhcnQsIGludmFsaWQgcG9zaXRpb25cbiAgICAgICAgICAgIGkgPSAtMTtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzID0gcmFuZG9tQ29vcmRpbmF0ZXMoKTtcbiAgICAgICAgICAgIHggPSBjb29yZGluYXRlc1swXVswXTtcbiAgICAgICAgICAgIHkgPSBjb29yZGluYXRlc1swXVsxXTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb29yZGluYXRlcyBcbn1cblxuZnVuY3Rpb24gcmFuZG9tQ29vcmRpbmF0ZXMoKSB7XG4gICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgIHdoaWxlKHBsYXllcjIuZ2FtZUJvYXJkLmdyaWRbeF1beV0gIT09IGZhbHNlKSB7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgIH1cbiAgICByZXR1cm4gW1t4LHldXVxufVxuXG5leHBvcnQge0NvbXB1dGVyfSIsImltcG9ydCB7IHBsYXllcjEsIHBsYXllcjIsIGRpZmZpY3VsdCB9IGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQgeyBkZXN0cm95Qm9hcmQsIGdhbWVPdmVyRGlzcGxheSwgc3R5bGVVSSB9IGZyb20gXCIuL3N0eWxlVUlcIjtcblxuY29uc3QgZ2FtZUJvYXJkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvYXJkJyk7XG5sZXQgb3Bwb25lbnQ7XG5sZXQgc2NyZWVuV2lkdGggID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIFxuICAgICAgICAgICAgICAgICAgIHx8IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XG4oc2NyZWVuV2lkdGggPCAxMTg1KSA/IHNjcmVlbldpZHRoID0gdHJ1ZSA6IHNjcmVlbldpZHRoID0gZmFsc2U7XG4gICAgICAgIFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKG9wcG9uZW50KXtcbiAgICAgICAgdGhpcy5ncmlkID0gbmV3IEFycmF5KDgpLmZpbGwobnVsbCkubWFwKCgpID0+IG5ldyBBcnJheSg4KS5maWxsKGZhbHNlKSk7XG4gICAgICAgIHRoaXMub3Bwb25lbnQgPSBvcHBvbmVudFxuICAgIH1cbiAgICBwbGFjZVNoaXAoc2hpcCwgYXJlYSl7XG4gICAgICAgIGZvcihsZXQgbiA9IDA7IG4gPCBzaGlwLmxlbmd0aDsgbisrKXtcbiAgICAgICAgICAgIGlmKHRoaXMuZ3JpZFthcmVhW25dWzBdXVthcmVhW25dWzFdXSAhPT0gZmFsc2UpIHJldHVybiAnaW52YWxpZCBwbGFjZW1lbnQnO1xuICAgICAgICAgICAgdGhpcy5ncmlkW2FyZWFbbl1bMF1dW2FyZWFbbl1bMV1dID0gc2hpcFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcmVhXG4gICAgfVxuICAgIHJlY2VpdmVBdHRhY2soeCwgeSwgYm9hcmQpe1xuICAgICAgICBpZihvcHBvbmVudCA9PT0gcGxheWVyMSAmJiBib2FyZCA9PT0gdHJ1ZSB8fCBib2FyZCA9PT0gZmFsc2UgJiYgb3Bwb25lbnQgPT09IHBsYXllcjIpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLmdyaWRbeF1beV07XG4gICAgICAgICAgICBjb25zdCBoaXRPck1pc3MgPSB0aGlzLmF0dGFja0xvZ2ljKHNoaXApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ3JpZFt4XVt5XSA9IGhpdE9yTWlzcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgYXR0YWNrTG9naWMoaW5kZXgpe1xuICAgICAgICBpZihpbmRleCA9PT0gJ2hpdCcgfHwgaW5kZXggPT09ICdtaXNzJyB8fCBpbmRleCA9PT0gJ3NhbWUgc3BvdCcpIHJldHVybiAnc2FtZSBzcG90J1xuICAgICAgICBpZihpbmRleCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRleCA9ICdtaXNzJztcbiAgICAgICAgfSBlbHNlIGlmKGluZGV4ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgaW5kZXguaGl0KCk7XG4gICAgICAgICAgICBpbmRleC5zdW5rID0gaW5kZXguaXNTdW5rKCk7XG4gICAgICAgICAgICAvL1JlbW92ZSBzaGlwIGZyb20gZ3JpZFxuICAgICAgICAgICAgcmV0dXJuIGluZGV4ID0gJ2hpdCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGFuZ2VUdXJuKHJlc3VsdCkge1xuICAgICAgICBpZihyZXN1bHQgPT09ICdzYW1lIHNwb3QnKSByZXR1cm4gb3Bwb25lbnRcbiAgICAgICAgaWYocmVzdWx0ID09PSAnaGl0Jykge1xuICAgICAgICAgICAgdGhpcy5nYW1lU3RhdHVzKClcbiAgICAgICAgICAgIHJldHVybiBvcHBvbmVudFxuICAgICAgICB9IGVsc2UgaWYocmVzdWx0ID09PSAnbWlzcycpIHtcbiAgICAgICAgICAgIHJldHVybiAob3Bwb25lbnQgPT09IHBsYXllcjEpID8gb3Bwb25lbnQgPSBwbGF5ZXIyIDogIG9wcG9uZW50ID0gcGxheWVyMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja1R1cm4oYm9hcmRCb29sZWFuKSB7XG4gICAgICAgIGlmKChvcHBvbmVudCA9PT0gcGxheWVyMSAmJiBib2FyZEJvb2xlYW4gPT09IHRydWUpIHx8IChib2FyZEJvb2xlYW4gPT09IGZhbHNlICYmIG9wcG9uZW50ID09PSBwbGF5ZXIyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaXNBbGxTdW5rKCl7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdyaWQubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgZm9yKGxldCBuIGluIHRoaXMuZ3JpZFtpXSl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5ncmlkW2ldW25dLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdTaGlwJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgZ2FtZVN0YXR1cygpe1xuICAgICAgICBsZXQgb3ZlciA9IG51bGw7XG4gICAgICAgIC8vQ2hlY2tzIGZvciBnYW1lIG92ZXJcbiAgICAgICAgaWYob3Bwb25lbnQgPT09IHBsYXllcjIpe1xuICAgICAgICAgICAgb3ZlciA9IHBsYXllcjIuZ2FtZUJvYXJkLmlzQWxsU3VuaygpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdmVyID0gcGxheWVyMS5nYW1lQm9hcmQuaXNBbGxTdW5rKClcbiAgICAgICAgfVxuICAgICAgICAvL1N0eWxlIGJvYXJkIGFuZCB1cGRhdGVzIGdhbWUgZGlzcGxheVxuICAgICAgICBpZihvdmVyICYmIG9wcG9uZW50ID09PSBwbGF5ZXIyKSB7XG4gICAgICAgICAgICBkZXN0cm95Qm9hcmQoZ2FtZUJvYXJkc1syXSlcbiAgICAgICAgICAgIGdhbWVPdmVyRGlzcGxheShwbGF5ZXIxKVxuICAgICAgICB9IGVsc2UgaWYob3Bwb25lbnQgPT09IHBsYXllcjEgJiYgb3Zlcikge1xuICAgICAgICAgICAgZGVzdHJveUJvYXJkKGdhbWVCb2FyZHNbMV0pXG4gICAgICAgICAgICBnYW1lT3ZlckRpc3BsYXkocGxheWVyMilcbiAgICAgICAgfVxuICAgIH1cbiAgICBjcmVhdGVHYW1lR3JpZChncmlkLCB0KSB7XG4gICAgICAgIGNvbnN0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQtY29udGFpbmVyJyk7XG4gICAgICAgIG9wcG9uZW50ID0gcGxheWVyMjtcbiAgICAgICAgZ2FtZUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZ3JpZC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBmb3IobGV0IG4gaW4gZ3JpZFtpXSl7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgZ2FtZUJvYXJkc1t0XS5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgICAgICAgICAgICAgIGdhbWVCb2FyZHNbdF0uc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoNjQsIDFmcilgO1xuICAgICAgICAgICAgICAgIGdhbWVCb2FyZHNbdF0uc3R5bGUuZ3JpZFRlbXBsYXRlUm93cyA9IGByZXBlYXQoNjQsIDFmcilgO1xuICAgICAgICAgICAgICAgIHNxdWFyZS5jbGFzc05hbWUgPSBcInNxdWFyZXNcIjtcbiAgICAgICAgICAgICAgICBzcXVhcmUuaWQgPSBgJHtpfSwke259YDtcbiAgICAgICAgICAgICAgICBsZXQgYm9hcmRCb29sZWFuID0gc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCcxJyk7XG4gICAgICAgICAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9Cb2FyZCAxIGlzIHBsYXllciAxXG4gICAgICAgICAgICAgICAgICAgIGlmKCFvcHBvbmVudC5nYW1lQm9hcmQuY2hlY2tUdXJuKGJvYXJkQm9vbGVhbikpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHggPSBOdW1iZXIoc3F1YXJlLmlkLmF0KDApKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHkgPSBOdW1iZXIoc3F1YXJlLmlkLmF0KDIpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG9wcG9uZW50LmdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHksIGJvYXJkQm9vbGVhbik7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlVUkoc3F1YXJlLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBvcHBvbmVudC5nYW1lQm9hcmQuY2hhbmdlVHVybihyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXIyLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdDb21wdXRlcicpIHBsYXllcjIuY29tcHV0ZXJBdHRhY2soZGlmZmljdWx0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvL0NoZWNrcyBmb3IgU2hpcCwgdG8gc2hvdyBvciBoaWRlXG4gICAgICAgICAgICAgICAgaWYoZ3JpZFtpXVtuXSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYCR7Z3JpZFtpXVtuXS5uYW1lfWApXG4gICAgICAgICAgICAgICAgICAgIGlmKChwbGF5ZXIyLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdDb21wdXRlcicgJiYgYm9hcmRCb29sZWFuID09PSBmYWxzZSkgfHwgcGxheWVyMi5jb25zdHJ1Y3Rvci5uYW1lID09PSAnUGxheWVyJylcbiAgICAgICAgICAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vT25seSBkaXNwbGF5cyBvcHBvbmVudCBib2FyZDtcbiAgICAgICAgaWYoc2NyZWVuV2lkdGgpIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyJykuY2xhc3NMaXN0LnRvZ2dsZSgndG9nZ2xlJyk7XG4gICAgICAgIHNjcmVlbldpZHRoID0gZmFsc2VcbiAgICB9XG59XG5cbmV4cG9ydCB7b3Bwb25lbnR9XG5cbiIsImltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHsgQ29tcHV0ZXIgfSBmcm9tIFwiLi9jb21wdXRlclwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3N0eWxlLmNzcydcbmltcG9ydCBiYWNrZ3JvdW5kQXVkaW8gZnJvbSAnLi9iYWNrZ3JvdW5kLW11c2ljLm1wMydcblxuY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XG5jb25zdCBnYW1lTW9kZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1tb2RlJyk7XG5jb25zdCBnYW1lQm9hcmRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmQnKTtcbmNvbnN0IGJhY2tncm91bmRNdXNpYyA9IG5ldyBBdWRpbyhiYWNrZ3JvdW5kQXVkaW8pO1xuY29uc3QgcGxheWVyMSA9IG5ldyBQbGF5ZXI7XG5cbmxldCBwbGF5ZXIyO1xubGV0IGRpZmZpY3VsdCA9IG51bGw7XG5sZXQgc2VsZWN0ZWRTaGlwID0gW107XG5sZXQgcm90YXRlID0gZmFsc2U7XG5sZXQgcmFuZG9taXplID0gZmFsc2U7XG5sZXQgdXNlZFNoaXBzID0gW107XG5sZXQgcGxheWVyUGxhY2VtZW50ID0gcGxheWVyMTtcblxuLy9DUFUgYnV0dG9uXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcHV0ZXInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBiYWNrZ3JvdW5kTXVzaWMubG9vcCA9IHRydWU7XG4gICAgYmFja2dyb3VuZE11c2ljLmxvYWQoKVxuICAgIGJhY2tncm91bmRNdXNpYy5wbGF5KClcbiAgICBwbGF5ZXIyID0gbmV3IENvbXB1dGVyO1xuICAgIC8vRGlmZmljdWx0eSBidXR0b25zXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRpZmZpY3VsdCA+IGJ1dHRvbicpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZS1jb250YWluZXInKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaWZmaWN1bHQnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLXBsYWNlbWVudCcpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBnYW1lTW9kZURpc3BsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGRpZmZpY3VsdCA9IGUudGFyZ2V0LmNsYXNzTmFtZVxuICAgICAgICAgICAgY3JlYXRlUGxhY2VtZW50R3JpZChwbGF5ZXIxKTtcbiAgICAgICAgfSlcbiAgICB9KVxufSk7XG4vL1ZTIEJ1dHRvblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgYmFja2dyb3VuZE11c2ljLmxvb3AgPSB0cnVlO1xuICAgIGJhY2tncm91bmRNdXNpYy5sb2FkKClcbiAgICBiYWNrZ3JvdW5kTXVzaWMucGxheSgpXG4gICAgcGxheWVyMiA9IG5ldyBQbGF5ZXJcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZU1vZGVEaXNwbGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLXBsYWNlbWVudCcpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgY3JlYXRlUGxhY2VtZW50R3JpZChwbGF5ZXIxKVxufSk7XG5cblxuXG5cbi8vU2hpcCBidXR0b25zIGZvciBwbGFjZW1lbnRcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwcyA+IGJ1dHRvbicpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIHNlbGVjdGVkU2hpcCA9IHJldHVyblNoaXBMZW5ndGgoZS50YXJnZXQuY2xhc3NMaXN0LnZhbHVlKVxuICAgIH0pXG59KTtcbi8vUm90YXRlIEJ1dHRvblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvdGF0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIChyb3RhdGUgPT09IGZhbHNlKSA/IHJvdGF0ZSA9IHRydWUgOiByb3RhdGUgPSBmYWxzZVxufSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYW5kb21pemUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICByYW5kb21pemUgPSB0cnVlXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICBsZXQgcmFuZG9tID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNjMpO1xuICAgICAgICBsZXQgcm90YXRlID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKVxuICAgICAgICAvL1NlbGVjdHMgc2hpcFxuICAgICAgICBsZXQgc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGlwcycpLmNoaWxkcmVuW2ldO1xuICAgICAgICBzaGlwLmNsaWNrKClcbiAgICAgICAgaWYocm90YXRlID09PSAxKSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm90YXRlJykuY2xpY2soKVxuICAgICAgICAvL0F0dGVtcHQgdG8gcGxhY2Ugc2hpcFxuICAgICAgICBnYW1lQm9hcmRzWzBdLmNoaWxkcmVuW3JhbmRvbV0uY2xpY2soKTtcbiAgICAgICAgLy9JZiBzaGlwIGRpZCBub3QgcGxhY2UgcmUgcnVuIGxvb3BcbiAgICAgICAgaWYoIWdhbWVCb2FyZHNbMF0uY2hpbGRyZW5bcmFuZG9tXS5jbGFzc0xpc3QuY29udGFpbnMoc2hpcC5jbGFzc05hbWUpKXtcbiAgICAgICAgICAgIGktLTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByYW5kb21pemUgPSBmYWxzZVxufSlcblxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGxldCBzdG9yYWdlID0ge1xuICAgICAgICBiYXR0bGVzaGlwOiBbXSxcbiAgICAgICAgZGVzdHJveWVyOiBbXSxcbiAgICAgICAgc3VibWFyaW5lOiBbXSxcbiAgICAgICAgJ3BhdHJvbC1ib2F0JzogW11cbiAgICB9XG4gICAgLy9BZGRzIGluZGV4IG9mIHNoaXBzIHRvIHN0b3JhZ2VcbiAgICBmb3IobGV0IGkgPSAwOyBpPCA2NDsgaSsrKSB7XG4gICAgICAgIGxldCBkaXYgPSBnYW1lQm9hcmRzWzBdLmNoaWxkcmVuW2ldXG4gICAgICAgIGlmKGRpdi5jbGFzc0xpc3QuY29udGFpbnMoJ2JhdHRsZXNoaXAnKSkge1xuICAgICAgICAgICAgc3RvcmFnZS5iYXR0bGVzaGlwLnB1c2goW2Rpdi5pZFswXSwgZGl2LmlkWzJdXSlcbiAgICAgICAgfSBlbHNlIGlmKGRpdi5jbGFzc0xpc3QuY29udGFpbnMoJ2Rlc3Ryb3llcicpKSB7XG4gICAgICAgICAgICBzdG9yYWdlLmRlc3Ryb3llci5wdXNoKFtkaXYuaWRbMF0sIGRpdi5pZFsyXV0pXG4gICAgICAgIH0gZWxzZSBpZihkaXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdzdWJtYXJpbmUnKSkge1xuICAgICAgICAgICAgc3RvcmFnZS5zdWJtYXJpbmUucHVzaChbZGl2LmlkWzBdLCBkaXYuaWRbMl1dKVxuICAgICAgICB9IGVsc2UgaWYoZGl2LmNsYXNzTGlzdC5jb250YWlucygncGF0cm9sLWJvYXQnKSkge1xuICAgICAgICAgICAgc3RvcmFnZVsncGF0cm9sLWJvYXQnXS5wdXNoKFtkaXYuaWRbMF0sIGRpdi5pZFsyXV0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9CcmVha3MgaWYgbWlzc2luZyBhIHNoaXBcbiAgICBmb3IobGV0IG4gaW4gc3RvcmFnZSl7XG4gICAgICAgIGlmKHN0b3JhZ2Vbbl0ubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgfVxuICAgIC8vSW5zZXJ0IHNoaXAgcGxhY2UgdG8gb2JqZWN0J3MgZ3JpZFxuICAgIGZvcihsZXQgbiBpbiBzdG9yYWdlKXtcbiAgICAgICAgcGxheWVyUGxhY2VtZW50LmdhbWVCb2FyZC5wbGFjZVNoaXAobmV3IFNoaXAobiwgcmV0dXJuU2hpcExlbmd0aChuKVsxXSksIHN0b3JhZ2Vbbl0pXG4gICAgfVxuICAgIGlmKHBsYXllcjIuY29uc3RydWN0b3IubmFtZSA9PT0gJ0NvbXB1dGVyJykge1xuICAgICAgICBwbGF5ZXIxLmdhbWVCb2FyZC5jcmVhdGVHYW1lR3JpZChwbGF5ZXIxLmdhbWVCb2FyZC5ncmlkLCAxKVxuICAgICAgICBwbGF5ZXIyLmNyZWF0ZUNwdUdyaWQocGxheWVyMik7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC1wbGFjZW1lbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgfSBlbHNlIGlmIChwbGF5ZXIyLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdQbGF5ZXInKSB7XG4gICAgICAgIGlmKHBsYXllclBsYWNlbWVudCA9PT0gcGxheWVyMSkge1xuICAgICAgICAgICAgY3JlYXRlUGxhY2VtZW50R3JpZChwbGF5ZXIyKVxuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICBwbGF5ZXIxLmdhbWVCb2FyZC5jcmVhdGVHYW1lR3JpZChwbGF5ZXIxLmdhbWVCb2FyZC5ncmlkLCAxKTtcbiAgICAgICAgICAgIHBsYXllcjIuZ2FtZUJvYXJkLmNyZWF0ZUdhbWVHcmlkKHBsYXllcjIuZ2FtZUJvYXJkLmdyaWQsIDIpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLXBsYWNlbWVudCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5nYW1lQm9hcmRzWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtwbGFjZVNoaXAoZSl9KTtcblxuZnVuY3Rpb24gY3JlYXRlUGxhY2VtZW50R3JpZChwbGF5ZXIpIHtcbiAgICBwbGF5ZXJQbGFjZW1lbnQgPSBwbGF5ZXI7XG4gICAgY29uc3QgcGxheWVyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItbmFtZScpO1xuICAgIChwbGF5ZXIgPT09IHBsYXllcjEpID8gcGxheWVyTmFtZS50ZXh0Q29udGVudCA9IFwiUGxheWVyIDFcIiA6IHBsYXllck5hbWUudGV4dENvbnRlbnQgPSBcIlBsYXllciAyXCI7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYXllci5nYW1lQm9hcmQuZ3JpZC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGZvcihsZXQgbiBpbiBwbGF5ZXIuZ2FtZUJvYXJkLmdyaWRbaV0pe1xuICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAvL1JlbW92ZSBwbGF5ZXIgMSBib2FyZFxuICAgICAgICAgICAgaWYocGxheWVyID09PSBwbGF5ZXIyKSBnYW1lQm9hcmRzWzBdLmNoaWxkcmVuWzBdLnJlbW92ZSgpO1xuICAgICAgICAgICAgZ2FtZUJvYXJkc1swXS5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgICAgICAgICAgZ2FtZUJvYXJkc1swXS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCg2NCwgMWZyKWA7XG4gICAgICAgICAgICBnYW1lQm9hcmRzWzBdLnN0eWxlLmdyaWRUZW1wbGF0ZVJvd3MgPSBgcmVwZWF0KDY0LCAxZnIpYDtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc05hbWUgPSBcInNxdWFyZXNcIjtcbiAgICAgICAgICAgIHNxdWFyZS5pZCA9IGAke2l9LCR7bn1gO1xuICAgICAgICB9XG4gICAgfVxufSBcblxuZnVuY3Rpb24gcGxhY2VTaGlwKGUpIHtcbiAgICBpZihzZWxlY3RlZFNoaXAgPT09IG51bGwpIHJldHVybjtcbiAgICBsZXQgY3VycmVudCA9IGUudGFyZ2V0O1xuICAgIC8vUmVtb3ZlcyBzYW1lIHNoaXAgdG8gcmUgaW5zZXJ0XG4gICAgaWYodXNlZFNoaXBzLmluY2x1ZGVzKHNlbGVjdGVkU2hpcFswXSkpIHtcbiAgICAgICAgdXNlZFNoaXBzID0gdXNlZFNoaXBzLmZpbHRlcigoc2hpcCkgPT4gc2hpcCAhPT0gc2VsZWN0ZWRTaGlwWzBdKTtcbiAgICAgICAgcmVtb3ZlU2hpcFBsYWNlbWVudChzZWxlY3RlZFNoaXBbMF0pXG4gICAgfVxuICAgIGlmKHJvdGF0ZSAmICEoKCtjdXJyZW50LmlkWzBdICsgc2VsZWN0ZWRTaGlwWzFdKSA+IDgpKSB7XG4gICAgICAgIC8vR29lcyB0aHJvdWdoIGJvYXJkJ3MgZGl2IHZlcnRpY2FsbHlcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkU2hpcFsxXTsgaSsrKXtcbiAgICAgICAgICAgIC8vUmVtb3ZlIHNoaXAgZHVlIHRvIGEgc2hpcCBhbHJlYWR5IHRoZXJlXG4gICAgICAgICAgICBpZihjdXJyZW50LmNsYXNzTGlzdC5sZW5ndGggPiAxKSByZXR1cm4gcmVtb3ZlU2hpcFBsYWNlbWVudChzZWxlY3RlZFNoaXBbMF0pXG4gICAgICAgICAgICAvL0Rpc3BsYXkgc2hpcCB0byBncmlkXG4gICAgICAgICAgICBjdXJyZW50LmNsYXNzTGlzdC5hZGQoc2VsZWN0ZWRTaGlwWzBdKTtcbiAgICAgICAgICAgIGlmKGkgPT09IHNlbGVjdGVkU2hpcFsxXSAtIDEpIGJyZWFrO1xuICAgICAgICAgICAgLy9Hb2VzIHRyb3VnaCBjb2x1bW5zXG4gICAgICAgICAgICBmb3IobGV0IG4gPSAwOyBuIDw9IDc7IG4rKyl7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHVzZWRTaGlwcy5wdXNoKHNlbGVjdGVkU2hpcFswXSlcbiAgICAgfSBlbHNlIGlmKCFyb3RhdGUgJiAhKCgrY3VycmVudC5pZFsyXSArIHNlbGVjdGVkU2hpcFsxXSkgPiA4KSl7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzZWxlY3RlZFNoaXBbMV07IGkrKyl7XG4gICAgICAgICAgICAvL1JlbW92ZSBzaGlwIGR1ZSB0byBhIHNoaXAgYWxyZWFkeSB0aGVyZVxuICAgICAgICAgICAgaWYoY3VycmVudC5jbGFzc0xpc3QubGVuZ3RoID4gMSkgcmV0dXJuIHJlbW92ZVNoaXBQbGFjZW1lbnQoc2VsZWN0ZWRTaGlwWzBdKVxuICAgICAgICAgICAgLy9EaXNwbGF5IHNoaXAgdG8gZ3JpZFxuICAgICAgICAgICAgY3VycmVudC5jbGFzc0xpc3QuYWRkKHNlbGVjdGVkU2hpcFswXSk7XG4gICAgICAgICAgICBpZihpID09PSBzZWxlY3RlZFNoaXBbMV0gLSAxKSBicmVhaztcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgfVxuICAgICAgICB1c2VkU2hpcHMucHVzaChzZWxlY3RlZFNoaXBbMF0pXG4gICAgIH1cbiAgICAgLy9TaGFrZXMgYm9hcmQgaWYgaW52YWxpZCBwbGFjZW1lbnRcbiAgICAgaWYoIXVzZWRTaGlwcy5pbmNsdWRlcyhzZWxlY3RlZFNoaXBbMF0pICYmIHJhbmRvbWl6ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgZ2FtZUJvYXJkc1swXS5jbGFzc0xpc3QudG9nZ2xlKCdzaGFrZScpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge2dhbWVCb2FyZHNbMF0uY2xhc3NMaXN0LnRvZ2dsZSgnc2hha2UnKX0sIDI1MClcbiAgICAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVTaGlwUGxhY2VtZW50KHNoaXApIHtcbiAgICBpZihzaGlwID09PSB1bmRlZmluZWQpIHJldHVyblxuICAgIGZvcihsZXQgbiBpbiBnYW1lQm9hcmRzWzBdLmNoaWxkcmVuKXtcbiAgICAgICAgaWYoZ2FtZUJvYXJkc1swXS5jaGlsZHJlblsrbl0uY2xhc3NMaXN0LmNvbnRhaW5zKHNoaXApKXtcbiAgICAgICAgICAgIGdhbWVCb2FyZHNbMF0uY2hpbGRyZW5bK25dLmNsYXNzTGlzdC5yZW1vdmUoc2hpcClcbiAgICAgICAgfTtcbiAgICAgICAgaWYoK24gPT09IDYzKSByZXR1cm47XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZXR1cm5TaGlwTGVuZ3RoKHNoaXBOYW1lKSB7XG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgaWYoc2hpcE5hbWUgPT09ICdiYXR0bGVzaGlwJykge1xuICAgICAgICBsZW5ndGggPSA0XG4gICAgfSBlbHNlIGlmKHNoaXBOYW1lID09PSAncGF0cm9sLWJvYXQnKSB7XG4gICAgICAgIGxlbmd0aCA9IDJcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZW5ndGggPSAzXG4gICAgfVxuICAgIHJldHVybiBbc2hpcE5hbWUsIGxlbmd0aF1cbn1cblxuXG5cblxuZXhwb3J0IHsgcGxheWVyMSwgcGxheWVyMiwgZGlmZmljdWx0fSIsImltcG9ydCBHYW1lQm9hcmQgZnJvbSBcIi4vZ2FtZS1ib2FyZFwiXG5cbmNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkID0gbmV3IEdhbWVCb2FyZDtcbiAgICB9XG4gICAgXG59XG5cblxuZXhwb3J0IHtQbGF5ZXJ9IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgsIHRpbWVzSGl0ID0gMCwgc3VuayA9IGZhbHNlKXtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy50aW1lc0hpdCA9IHRpbWVzSGl0O1xuICAgICAgICB0aGlzLnN1bmsgPSBzdW5rXG4gICAgfVxuICAgIGhpdCgpe1xuICAgICAgICByZXR1cm4gdGhpcy50aW1lc0hpdCArPSAxXG4gICAgfVxuICAgIGlzU3Vuaygpe1xuICAgICAgICBpZih0aGlzLmxlbmd0aCA9PT0gdGhpcy50aW1lc0hpdCkgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VuaztcbiAgICB9XG59IiwiaW1wb3J0IHsgcGxheWVyMSwgcGxheWVyMn0gZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCB7IG9wcG9uZW50IH0gZnJvbSBcIi4vZ2FtZS1ib2FyZFwiO1xuaW1wb3J0IGhpdCBmcm9tICcuL2hpdC1hdWRpby53YXYnO1xuaW1wb3J0IG1pc3MgZnJvbSAnLi9taXNzLWF1ZGlvLm1wMydcblxuY29uc3QgdHVybkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXR1cm4nKTtcbmNvbnN0IGluZm9TdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mbycpO1xuY29uc3QgaGl0QXVkaW8gPSBuZXcgQXVkaW8oaGl0KTtcbmNvbnN0IG1pc3NBdWRpbyA9IG5ldyBBdWRpbyhtaXNzKTtcblxubGV0IHByZXZpb3VzRGl2ID0gbnVsbDtcblxubWlzc0F1ZGlvLnByZWxvYWQgPSAnYXV0byc7XG5oaXRBdWRpby5wcmVsb2FkID0gJ2F1dG8nO1xuXG5mdW5jdGlvbiBzdHlsZVVJKHNxdWFyZSwgc3RhdHVzKSB7XG4gICAgaWYoc3RhdHVzID09PSAnc2FtZSBzcG90JykgcmV0dXJuXG4gICAgaWYoc3RhdHVzID09PSAnaGl0Jykge1xuICAgICAgICBoaXRBdWRpby5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgIGhpdEF1ZGlvLnBsYXkoKVxuICAgICAgICAvL0NvbXBlbnNhdGVzIGZvciBhdWRpbyBkZWxheVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIGluZm9TdGF0dXMudGV4dENvbnRlbnQgPSBcIkF0dGFjayBhZ2FpbiFcIjtcbiAgICAgICAgICAgIHNxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3NoYWtlJyk7XG4gICAgICAgIH0sMjUwKVxuICAgICAgICAvL1JlbW92ZSBzaGFrZVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdzaGFrZScpfSwgNTAwKVxuICAgIH0gZWxzZSBpZihzdGF0dXMgPT09ICdtaXNzJykge1xuICAgICAgICBtaXNzQXVkaW8uY3VycmVudFRpbWUgPSAwO1xuICAgICAgICBtaXNzQXVkaW8ucGxheSgpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ21pc3MnKVxuICAgICAgICAgICAgaW5mb1N0YXR1cy50ZXh0Q29udGVudCA9IFwiT2ggbm8sIGEgbWlzcyFcIjtcbiAgICAgICAgICAgIGlmKHByZXZpb3VzRGl2ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNEaXYuY2xhc3NMaXN0LnRvZ2dsZSgncHJldi1taXNzJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpb3VzRGl2ID0gc3F1YXJlO1xuICAgICAgICB9LCAyNTApXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgKG9wcG9uZW50ID09PSBwbGF5ZXIxKVxuICAgICAgICAgICAgPyB0dXJuRGlzcGxheS50ZXh0Q29udGVudCA9IFwiUGxheWVyIDI6XCJcbiAgICAgICAgICAgIDogdHVybkRpc3BsYXkudGV4dENvbnRlbnQgPSBcIlBsYXllciAxOlwiO1xuICAgICAgICAgICAgaW5mb1N0YXR1cy50ZXh0Q29udGVudCA9IFwiQXR0YWNrIVwiO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjEnKS5jbGFzc0xpc3QudG9nZ2xlKCd0b2dnbGUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyJykuY2xhc3NMaXN0LnRvZ2dsZSgndG9nZ2xlJylcbiAgICAgICAgfSwgMTA1MClcbiAgICB9XG59XG5mdW5jdGlvbiBkZXN0cm95Qm9hcmQoYm9hcmQpe1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgeExlZnQgPSAwO1xuICAgIGxldCB4UmlnaHQgPSA3O1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBib2FyZC5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdoaXQnKTtcbiAgICAgICAgICAgIGJvYXJkLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ21pc3MnKTtcbiAgICAgICAgICAgIGJvYXJkLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3ByZXYtbWlzcycpXG4gICAgICAgICAgICBoaXRBdWRpby5jdXJyZW50VGltZSA9IDE7XG4gICAgICAgICAgICBoaXRBdWRpby5wbGF5KCk7XG4gICAgICAgICAgICBpZihpID09PSB4TGVmdCl7XG4gICAgICAgICAgICAgICAgeExlZnQgKz0gOTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9hcmQuY2hpbGRyZW5baV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCdcbiAgICAgICAgICAgIH0gZWxzZSBpZihpID09PSB4UmlnaHQpIHtcbiAgICAgICAgICAgICAgICB4UmlnaHQgKz0gNztcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9hcmQuY2hpbGRyZW5baV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvYXJkLmNoaWxkcmVuW2ldLmlkID0gJ2dhbWUtb3Zlcic7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBpZihpID09PSA2NCkgY2xlYXJJbnRlcnZhbChpbnRlcnZhbClcbiAgICAgICAgfSwgMjApO1xuICAgIH0sIDI1MCk7XG4gICBcbn1cblxuZnVuY3Rpb24gZ2FtZU92ZXJEaXNwbGF5KHdpbm5lcikge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZih3aW5uZXIuY29uc3RydWN0b3IubmFtZSA9PT0gJ0NvbXB1dGVyJyl7XG4gICAgICAgICAgICB0dXJuRGlzcGxheS50ZXh0Q29udGVudCA9IFwiQ29tcHV0ZXI6XCJcbiAgICAgICAgICAgIGluZm9TdGF0dXMudGV4dENvbnRlbnQgPSBcIkRlZmVhdGVkIGFsbCBQbGF5ZXIgMSBzaGlwcyFcIlxuICAgICAgICB9IGVsc2UgaWYob3Bwb25lbnQgPT09IHBsYXllcjIpIHtcbiAgICAgICAgICAgIHR1cm5EaXNwbGF5LnRleHRDb250ZW50ID0gXCJQbGF5ZXIgMTpcIlxuICAgICAgICAgICAgaW5mb1N0YXR1cy50ZXh0Q29udGVudCA9IFwiRGVmZWF0ZWQgYWxsIFBsYXllciAyIHNoaXBzIVwiXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0dXJuRGlzcGxheS50ZXh0Q29udGVudCA9IFwiUGxheWVyIDI6XCJcbiAgICAgICAgICAgIGluZm9TdGF0dXMudGV4dENvbnRlbnQgPSBcIkRlZmVhdGVkIGFsbCBQbGF5ZXIgMSBzaGlwcyFcIlxuICAgICAgICB9XG4gICAgfSw1MDApIFxufVxuXG5leHBvcnQge3N0eWxlVUksIGRlc3Ryb3lCb2FyZCwgZ2FtZU92ZXJEaXNwbGF5fSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9