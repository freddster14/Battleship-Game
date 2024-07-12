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
let screenWidth  = 
window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

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
                if(_index__WEBPACK_IMPORTED_MODULE_0__.player2.constructor.name === 'Computer' && t === 1) {
                    gameBoards[t].classList.add('board-cover')
                }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7VUVsQkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvLi9zcmMvc3R5bGUuY3NzP2UzMjAiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lLy4vc3JjL2NvbXB1dGVyLmpzIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS8uL3NyYy9nYW1lLWJvYXJkLmpzIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS8uL3NyYy9zdHlsZVVJLmpzIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgcGxheWVyMSwgcGxheWVyMn0gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgR2FtZUJvYXJkIGZyb20gJy4vZ2FtZS1ib2FyZCc7XG5pbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHtvcHBvbmVudH0gZnJvbSAnLi9nYW1lLWJvYXJkJ1xuXG5sZXQgYXR0YWNrQWdhaW4gPSBmYWxzZTtcblxuY2xhc3MgQ29tcHV0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkID0gbmV3IEdhbWVCb2FyZDtcbiAgICB9XG4gICAgY3JlYXRlQ3B1R3JpZChjcHUpIHtcbiAgICAgICAgY3B1LmdhbWVCb2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoJ2Rlc3Ryb3llcicsIDMpLCByYW5kb21DcHVQbGFjZW1lbnQoMywgMikpXG4gICAgICAgIGNwdS5nYW1lQm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKCdiYXR0bGVzaGlwJywgNCksIHJhbmRvbUNwdVBsYWNlbWVudCg0LCAyKSlcbiAgICAgICAgY3B1LmdhbWVCb2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoJ3N1Ym1hcmluZScsIDMpLCByYW5kb21DcHVQbGFjZW1lbnQoMywgMikpXG4gICAgICAgIGNwdS5nYW1lQm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKCdwYXRyb2wtYm9hdCcsIDIpLCByYW5kb21DcHVQbGFjZW1lbnQoMiwgMikpO1xuICAgICAgICBjcHUuZ2FtZUJvYXJkLmNyZWF0ZUdhbWVHcmlkKGNwdS5nYW1lQm9hcmQuZ3JpZCwgMilcbiAgICB9XG4gICAgY29tcHV0ZXJBdHRhY2soZGlmZmljdWx0KXtcbiAgICAgICAgaWYob3Bwb25lbnQgPT09IHBsYXllcjEpe1xuICAgICAgICAgICBpZihkaWZmaWN1bHQgPT09ICdlYXN5Jyl7XG4gICAgICAgICAgICBlYXN5QXR0YWNrKClcbiAgICAgICAgICAgfSBlbHNlIGlmKGRpZmZpY3VsdCA9PT0gJ21lZGl1bScgJiYgIWF0dGFja0FnYWluKSB7XG4gICAgICAgICAgICBtZWRpdW1BdHRhY2soKVxuICAgICAgICAgICB9IGVsc2UgaWYoZGlmZmljdWx0ID09PSAnaGFyZCcgJiYgIWF0dGFja0FnYWluKSB7XG4gICAgICAgICAgICBoYXJkQXR0YWNrKClcbiAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBlYXN5QXR0YWNrKCkge1xuICAgIC8vUmFuZG9tIGF0dGFja1xuICAgIGxldCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDY0KTtcbiAgICBsZXQgc3F1YXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmQnKVsxXS5jaGlsZHJlbltyYW5kb21JbmRleF07XG4gICAgd2hpbGUoc3F1YXJlLmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSB8fCBzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwibWlzc1wiKSkge1xuICAgICAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDY0KTtcbiAgICAgICAgc3F1YXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmQnKVsxXS5jaGlsZHJlbltyYW5kb21JbmRleF07XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzcXVhcmUuY2xpY2soKVxuICAgIH0sIDIwMDApXG4gICAgXG4gICByZXR1cm4gc3F1YXJlXG59XG5cbmZ1bmN0aW9uIG1lZGl1bUF0dGFjaygpIHtcbiAgICBsZXQgc3F1YXJlO1xuICAgIGxldCBpbmRleDtcbiAgICAvL0F0dGFjayByYW5kb20gdW50aWwgaGl0XG4gICAgaWYoIWF0dGFja0FnYWluKSBzcXVhcmUgPSBlYXN5QXR0YWNrKCk7XG5cbiAgICBsZXQgeCA9ICtzcXVhcmUuaWRbMF07XG4gICAgbGV0IHkgPSArc3F1YXJlLmlkWzJdO1xuICAgIC8vU2hpcCA9PT0gJ2hpdCdcbiAgICBsZXQgb2JqZWN0ID0gcGxheWVyMS5nYW1lQm9hcmQuZ3JpZFt4XVt5XTtcbiAgICBpZihvYmplY3QgIT09IGZhbHNlKSB7XG4gICAgICAgIGF0dGFja0FnYWluID0gdHJ1ZVxuICAgICAgICBpbmRleCA9IGZpbmRBZGphY2VudFNoaXAoeCwgeSwgc3F1YXJlKVswXVxuICAgICAgICBpZihpbmRleCA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgICAgIC8vNHMgYmVjYXVzZSB0aGUgZmlyc3QgYXR0YWNrIGFsc28gaGFzIFRpbWVvdXRcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpbmRleC5jbGljaygpXG4gICAgICAgICAgICBhdHRhY2tBZ2FpbiA9IGZhbHNlO1xuICAgICAgICAgICAgcGxheWVyMi5jb21wdXRlckF0dGFjaygnbWVkaXVtJylcbiAgICAgICAgfSwgNDAwMCk7IFxuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBoYXJkQXR0YWNrKCkge1xuICAgIGxldCBzcXVhcmU7XG4gICAgbGV0IGluZGV4O1xuICAgIC8vQXR0YWNrIHJhbmRvbSB1bnRpbCBoaXRcbiAgICBpZighYXR0YWNrQWdhaW4pIHNxdWFyZSA9IGVhc3lBdHRhY2soKTtcbiAgICBcbiAgICBsZXQgeCA9ICtzcXVhcmUuaWRbMF07XG4gICAgbGV0IHkgPSArc3F1YXJlLmlkWzJdO1xuICAgIC8vU2hpcCA9PT0gJ2hpdCdcbiAgICBsZXQgb2JqZWN0ID0gcGxheWVyMS5nYW1lQm9hcmQuZ3JpZFt4XVt5XTtcbiAgICBpZihvYmplY3QgIT09IGZhbHNlKSB7XG4gICAgICAgIGxldCBzdG9yYWdlID0gW107XG4gICAgICAgIGF0dGFja0FnYWluID0gdHJ1ZTtcbiAgICAgICAgaW5kZXggPSBmaW5kQWRqYWNlbnRTaGlwKHgsIHksIHNxdWFyZSk7XG4gICAgICAgIGlmKGluZGV4ID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAgICAgZm9yKGxldCBuIGluIGluZGV4KSB7c3RvcmFnZS5wdXNoKGluZGV4W25dKX1cbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICB3aGlsZShzdG9yYWdlLmxlbmd0aCAhPT0gb2JqZWN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGZpbmRBZGphY2VudFNoaXAoc3RvcmFnZVtpXS5pZFswXSwgc3RvcmFnZVtpXS5pZFsyXSwgc3RvcmFnZVtpXSk7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBuIGluIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vUHVzaCBuZXcgc2hpcCBwbGFjZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgaWYoIXN0b3JhZ2UuaW5jbHVkZXMoaW5kZXhbbl0pICYmIHNxdWFyZS5pZCAhPT0gaW5kZXhbbl0uaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JhZ2UucHVzaChpbmRleFtuXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBmb3IobGV0IG4gaW4gc3RvcmFnZSl7XG4gICAgICAgICAgICAgICAgbGV0IGkgPSAxO1xuICAgICAgICAgICAgICAgIGkgKz0gK247XG4gICAgICAgICAgICAgICAgaSAqPSAxODAwO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzdG9yYWdlW25dLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmKG9iamVjdC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNrQWdhaW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjIuY29tcHV0ZXJBdHRhY2soJ2hhcmQnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgaSlcbiAgICAgICAgICAgIH0gIFxuICAgICAgICB9LCAyMDAwKSAgIFxuICAgIH1cbn1cblxuZnVuY3Rpb24gZmluZEFkamFjZW50U2hpcCh4LCB5LCBzcXVhcmUpIHtcbiAgICBsZXQgejtcbiAgICBsZXQgdzsgXG4gICAgbGV0IGluZGV4O1xuICAgIGxldCBzdG9yYWdlID0gW11cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgIHogPSAreDtcbiAgICAgICAgdyA9ICt5O1xuICAgICAgICAvL0NoZWNrIGFkamFjZW50IHNxdWFyZSB0byBmaW5kIHNoaXBcbiAgICAgICAgaWYoaSA9PT0gMCl7XG4gICAgICAgICAgICBpbmRleCA9IHNxdWFyZS5uZXh0U2libGluZztcbiAgICAgICAgfSBlbHNlIGlmKGkgPT09IDEpIHtcbiAgICAgICAgICAgIGluZGV4ID0gc3F1YXJlLnByZXZpb3VzU2libGluZztcbiAgICAgICAgfSBlbHNlIGlmKGkgPT09IDIpIHtcbiAgICAgICAgICAgIGluZGV4ID0gc3F1YXJlLnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bKCh6IC09IDEpICogOCkgKyB3XVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5kZXggPSBzcXVhcmUucGFyZW50RWxlbWVudC5jaGlsZHJlblsoKHogKz0gMSkgKiA4KSArIHddXG4gICAgICAgIH1cbiAgICAgICAgLy9ObyB2YWxpZCBzcXVhcmUgdG8gYXR0YWNrIGFnYWluXG4gICAgICAgIGlmKGluZGV4ID09PSBudWxsIHx8IGluZGV4ID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgICBpZihpbmRleC5jbGFzc0xpc3QuY29udGFpbnMoc3F1YXJlLmNsYXNzTGlzdFsxXSkgJiYgIWluZGV4LmNsYXNzTGlzdC5jb250YWlucygnaGl0Jykpe1xuICAgICAgICAgICAgc3RvcmFnZS5wdXNoKGluZGV4KVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmKHN0b3JhZ2UgPT09IFtdKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgcmV0dXJuIHN0b3JhZ2U7XG59XG5cblxuZnVuY3Rpb24gcmFuZG9tQ3B1UGxhY2VtZW50KHNoaXBMZW5ndGgpIHtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSByYW5kb21Db29yZGluYXRlcygpXG4gICAgbGV0IHggPSBjb29yZGluYXRlc1swXVswXTtcbiAgICBsZXQgeSA9IGNvb3JkaW5hdGVzWzBdWzFdO1xuICAgIGxldCB2ZXJ0aWNhbCA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoIC0gMTsgaSsrKXtcbiAgICAgICAgaWYodmVydGljYWwpe1xuICAgICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChbeCArPSAxLCB5XSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goW3gsIHkgKz0gMV0pXG4gICAgICAgIH1cbiAgICAgICAgaWYoeCA9PT0gOCB8fCB5ID09PSA4IHx8IHBsYXllcjIuZ2FtZUJvYXJkLmdyaWRbeF1beV0gIT09IGZhbHNlKXtcbiAgICAgICAgICAgIC8vUmVzdGFydCwgaW52YWxpZCBwb3NpdGlvblxuICAgICAgICAgICAgaSA9IC0xO1xuICAgICAgICAgICAgY29vcmRpbmF0ZXMgPSByYW5kb21Db29yZGluYXRlcygpO1xuICAgICAgICAgICAgeCA9IGNvb3JkaW5hdGVzWzBdWzBdO1xuICAgICAgICAgICAgeSA9IGNvb3JkaW5hdGVzWzBdWzFdO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzIFxufVxuXG5mdW5jdGlvbiByYW5kb21Db29yZGluYXRlcygpIHtcbiAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgd2hpbGUocGxheWVyMi5nYW1lQm9hcmQuZ3JpZFt4XVt5XSAhPT0gZmFsc2UpIHtcbiAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgfVxuICAgIHJldHVybiBbW3gseV1dXG59XG5cbmV4cG9ydCB7Q29tcHV0ZXJ9IiwiaW1wb3J0IHsgcGxheWVyMSwgcGxheWVyMiwgZGlmZmljdWx0IH0gZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCB7IGRlc3Ryb3lCb2FyZCwgZ2FtZU92ZXJEaXNwbGF5LCBzdHlsZVVJIH0gZnJvbSBcIi4vc3R5bGVVSVwiO1xuXG5jb25zdCBnYW1lQm9hcmRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmQnKTtcbmxldCBvcHBvbmVudDtcbmxldCBzY3JlZW5XaWR0aCAgPSBcbndpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuXG4oc2NyZWVuV2lkdGggPCAxMTg1KSA/IHNjcmVlbldpZHRoID0gdHJ1ZSA6IHNjcmVlbldpZHRoID0gZmFsc2U7XG4gICAgICAgIFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKG9wcG9uZW50KXtcbiAgICAgICAgdGhpcy5ncmlkID0gbmV3IEFycmF5KDgpLmZpbGwobnVsbCkubWFwKCgpID0+IG5ldyBBcnJheSg4KS5maWxsKGZhbHNlKSk7XG4gICAgICAgIHRoaXMub3Bwb25lbnQgPSBvcHBvbmVudFxuICAgIH1cbiAgICBwbGFjZVNoaXAoc2hpcCwgYXJlYSl7XG4gICAgICAgIGZvcihsZXQgbiA9IDA7IG4gPCBzaGlwLmxlbmd0aDsgbisrKXtcbiAgICAgICAgICAgIGlmKHRoaXMuZ3JpZFthcmVhW25dWzBdXVthcmVhW25dWzFdXSAhPT0gZmFsc2UpIHJldHVybiAnaW52YWxpZCBwbGFjZW1lbnQnO1xuICAgICAgICAgICAgdGhpcy5ncmlkW2FyZWFbbl1bMF1dW2FyZWFbbl1bMV1dID0gc2hpcFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcmVhXG4gICAgfVxuICAgIHJlY2VpdmVBdHRhY2soeCwgeSwgYm9hcmQpe1xuICAgICAgICBpZihvcHBvbmVudCA9PT0gcGxheWVyMSAmJiBib2FyZCA9PT0gdHJ1ZSB8fCBib2FyZCA9PT0gZmFsc2UgJiYgb3Bwb25lbnQgPT09IHBsYXllcjIpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLmdyaWRbeF1beV07XG4gICAgICAgICAgICBjb25zdCBoaXRPck1pc3MgPSB0aGlzLmF0dGFja0xvZ2ljKHNoaXApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ3JpZFt4XVt5XSA9IGhpdE9yTWlzcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgYXR0YWNrTG9naWMoaW5kZXgpe1xuICAgICAgICBpZihpbmRleCA9PT0gJ2hpdCcgfHwgaW5kZXggPT09ICdtaXNzJyB8fCBpbmRleCA9PT0gJ3NhbWUgc3BvdCcpIHJldHVybiAnc2FtZSBzcG90J1xuICAgICAgICBpZihpbmRleCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRleCA9ICdtaXNzJztcbiAgICAgICAgfSBlbHNlIGlmKGluZGV4ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgaW5kZXguaGl0KCk7XG4gICAgICAgICAgICBpbmRleC5zdW5rID0gaW5kZXguaXNTdW5rKCk7XG4gICAgICAgICAgICAvL1JlbW92ZSBzaGlwIGZyb20gZ3JpZFxuICAgICAgICAgICAgcmV0dXJuIGluZGV4ID0gJ2hpdCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGFuZ2VUdXJuKHJlc3VsdCkge1xuICAgICAgICBpZihyZXN1bHQgPT09ICdzYW1lIHNwb3QnKSByZXR1cm4gb3Bwb25lbnRcbiAgICAgICAgaWYocmVzdWx0ID09PSAnaGl0Jykge1xuICAgICAgICAgICAgdGhpcy5nYW1lU3RhdHVzKClcbiAgICAgICAgICAgIHJldHVybiBvcHBvbmVudFxuICAgICAgICB9IGVsc2UgaWYocmVzdWx0ID09PSAnbWlzcycpIHtcbiAgICAgICAgICAgIHJldHVybiAob3Bwb25lbnQgPT09IHBsYXllcjEpID8gb3Bwb25lbnQgPSBwbGF5ZXIyIDogIG9wcG9uZW50ID0gcGxheWVyMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja1R1cm4oYm9hcmRCb29sZWFuKSB7XG4gICAgICAgIGlmKChvcHBvbmVudCA9PT0gcGxheWVyMSAmJiBib2FyZEJvb2xlYW4gPT09IHRydWUpIHx8IChib2FyZEJvb2xlYW4gPT09IGZhbHNlICYmIG9wcG9uZW50ID09PSBwbGF5ZXIyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaXNBbGxTdW5rKCl7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdyaWQubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgZm9yKGxldCBuIGluIHRoaXMuZ3JpZFtpXSl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5ncmlkW2ldW25dLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdTaGlwJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgZ2FtZVN0YXR1cygpe1xuICAgICAgICBsZXQgb3ZlciA9IG51bGw7XG4gICAgICAgIC8vQ2hlY2tzIGZvciBnYW1lIG92ZXJcbiAgICAgICAgaWYob3Bwb25lbnQgPT09IHBsYXllcjIpe1xuICAgICAgICAgICAgb3ZlciA9IHBsYXllcjIuZ2FtZUJvYXJkLmlzQWxsU3VuaygpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdmVyID0gcGxheWVyMS5nYW1lQm9hcmQuaXNBbGxTdW5rKClcbiAgICAgICAgfVxuICAgICAgICAvL1N0eWxlIGJvYXJkIGFuZCB1cGRhdGVzIGdhbWUgZGlzcGxheVxuICAgICAgICBpZihvdmVyICYmIG9wcG9uZW50ID09PSBwbGF5ZXIyKSB7XG4gICAgICAgICAgICBkZXN0cm95Qm9hcmQoZ2FtZUJvYXJkc1syXSlcbiAgICAgICAgICAgIGdhbWVPdmVyRGlzcGxheShwbGF5ZXIxKVxuICAgICAgICB9IGVsc2UgaWYob3Bwb25lbnQgPT09IHBsYXllcjEgJiYgb3Zlcikge1xuICAgICAgICAgICAgZGVzdHJveUJvYXJkKGdhbWVCb2FyZHNbMV0pXG4gICAgICAgICAgICBnYW1lT3ZlckRpc3BsYXkocGxheWVyMilcbiAgICAgICAgfVxuICAgIH1cbiAgICBjcmVhdGVHYW1lR3JpZChncmlkLCB0KSB7XG4gICAgICAgIGNvbnN0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQtY29udGFpbmVyJyk7XG4gICAgICAgIG9wcG9uZW50ID0gcGxheWVyMjtcbiAgICAgICAgZ2FtZUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZ3JpZC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBmb3IobGV0IG4gaW4gZ3JpZFtpXSl7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgZ2FtZUJvYXJkc1t0XS5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgICAgICAgICAgICAgIGdhbWVCb2FyZHNbdF0uc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoNjQsIDFmcilgO1xuICAgICAgICAgICAgICAgIGdhbWVCb2FyZHNbdF0uc3R5bGUuZ3JpZFRlbXBsYXRlUm93cyA9IGByZXBlYXQoNjQsIDFmcilgO1xuICAgICAgICAgICAgICAgIHNxdWFyZS5jbGFzc05hbWUgPSBcInNxdWFyZXNcIjtcbiAgICAgICAgICAgICAgICBzcXVhcmUuaWQgPSBgJHtpfSwke259YDtcbiAgICAgICAgICAgICAgICBsZXQgYm9hcmRCb29sZWFuID0gc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCcxJyk7XG4gICAgICAgICAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9Cb2FyZCAxIGlzIHBsYXllciAxXG4gICAgICAgICAgICAgICAgICAgIGlmKCFvcHBvbmVudC5nYW1lQm9hcmQuY2hlY2tUdXJuKGJvYXJkQm9vbGVhbikpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHggPSBOdW1iZXIoc3F1YXJlLmlkLmF0KDApKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHkgPSBOdW1iZXIoc3F1YXJlLmlkLmF0KDIpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG9wcG9uZW50LmdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHksIGJvYXJkQm9vbGVhbik7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlVUkoc3F1YXJlLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBvcHBvbmVudC5nYW1lQm9hcmQuY2hhbmdlVHVybihyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXIyLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdDb21wdXRlcicpIHBsYXllcjIuY29tcHV0ZXJBdHRhY2soZGlmZmljdWx0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvL0NoZWNrcyBmb3IgU2hpcCwgdG8gc2hvdyBvciBoaWRlXG4gICAgICAgICAgICAgICAgaWYoZ3JpZFtpXVtuXSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYCR7Z3JpZFtpXVtuXS5uYW1lfWApXG4gICAgICAgICAgICAgICAgICAgIGlmKChwbGF5ZXIyLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdDb21wdXRlcicgJiYgYm9hcmRCb29sZWFuID09PSBmYWxzZSkgfHwgcGxheWVyMi5jb25zdHJ1Y3Rvci5uYW1lID09PSAnUGxheWVyJylcbiAgICAgICAgICAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmKHBsYXllcjIuY29uc3RydWN0b3IubmFtZSA9PT0gJ0NvbXB1dGVyJyAmJiB0ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGdhbWVCb2FyZHNbdF0uY2xhc3NMaXN0LmFkZCgnYm9hcmQtY292ZXInKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL09ubHkgZGlzcGxheXMgb3Bwb25lbnQgYm9hcmQ7XG4gICAgICAgIGlmKHNjcmVlbldpZHRoKSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMicpLmNsYXNzTGlzdC50b2dnbGUoJ3RvZ2dsZScpO1xuICAgICAgICBzY3JlZW5XaWR0aCA9IGZhbHNlXG4gICAgfVxufVxuXG5leHBvcnQge29wcG9uZW50fVxuXG4iLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcbmltcG9ydCB7IENvbXB1dGVyIH0gZnJvbSBcIi4vY29tcHV0ZXJcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9zdHlsZS5jc3MnXG5pbXBvcnQgYmFja2dyb3VuZEF1ZGlvIGZyb20gJy4vYmFja2dyb3VuZC1tdXNpYy5tcDMnXG5cbmNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpO1xuY29uc3QgZ2FtZU1vZGVEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtbW9kZScpO1xuY29uc3QgZ2FtZUJvYXJkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvYXJkJyk7XG5jb25zdCBiYWNrZ3JvdW5kTXVzaWMgPSBuZXcgQXVkaW8oYmFja2dyb3VuZEF1ZGlvKTtcbmNvbnN0IHBsYXllcjEgPSBuZXcgUGxheWVyO1xuXG5sZXQgcGxheWVyMjtcbmxldCBkaWZmaWN1bHQgPSBudWxsO1xubGV0IHNlbGVjdGVkU2hpcCA9IFtdO1xubGV0IHJvdGF0ZSA9IGZhbHNlO1xubGV0IHJhbmRvbWl6ZSA9IGZhbHNlO1xubGV0IHVzZWRTaGlwcyA9IFtdO1xubGV0IHBsYXllclBsYWNlbWVudCA9IHBsYXllcjE7XG5cbi8vQ1BVIGJ1dHRvblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbXB1dGVyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgYmFja2dyb3VuZE11c2ljLmxvb3AgPSB0cnVlO1xuICAgIGJhY2tncm91bmRNdXNpYy5sb2FkKClcbiAgICBiYWNrZ3JvdW5kTXVzaWMucGxheSgpXG4gICAgcGxheWVyMiA9IG5ldyBDb21wdXRlcjtcbiAgICAvL0RpZmZpY3VsdHkgYnV0dG9uc1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kaWZmaWN1bHQgPiBidXR0b24nKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGUtY29udGFpbmVyJykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlmZmljdWx0Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC1wbGFjZW1lbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgZ2FtZU1vZGVEaXNwbGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBkaWZmaWN1bHQgPSBlLnRhcmdldC5jbGFzc05hbWVcbiAgICAgICAgICAgIGNyZWF0ZVBsYWNlbWVudEdyaWQocGxheWVyMSk7XG4gICAgICAgIH0pXG4gICAgfSlcbn0pO1xuLy9WUyBCdXR0b25cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52cycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGJhY2tncm91bmRNdXNpYy5sb29wID0gdHJ1ZTtcbiAgICBiYWNrZ3JvdW5kTXVzaWMubG9hZCgpXG4gICAgYmFja2dyb3VuZE11c2ljLnBsYXkoKVxuICAgIHBsYXllcjIgPSBuZXcgUGxheWVyXG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWVNb2RlRGlzcGxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC1wbGFjZW1lbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIGNyZWF0ZVBsYWNlbWVudEdyaWQocGxheWVyMSlcbn0pO1xuXG5cblxuXG4vL1NoaXAgYnV0dG9ucyBmb3IgcGxhY2VtZW50XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcHMgPiBidXR0b24nKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBzZWxlY3RlZFNoaXAgPSByZXR1cm5TaGlwTGVuZ3RoKGUudGFyZ2V0LmNsYXNzTGlzdC52YWx1ZSlcbiAgICB9KVxufSk7XG4vL1JvdGF0ZSBCdXR0b25cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb3RhdGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAocm90YXRlID09PSBmYWxzZSkgPyByb3RhdGUgPSB0cnVlIDogcm90YXRlID0gZmFsc2Vcbn0pO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmFuZG9taXplJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcmFuZG9taXplID0gdHJ1ZVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgbGV0IHJhbmRvbSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDYzKTtcbiAgICAgICAgbGV0IHJvdGF0ZSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSlcbiAgICAgICAgLy9TZWxlY3RzIHNoaXBcbiAgICAgICAgbGV0IHNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hpcHMnKS5jaGlsZHJlbltpXTtcbiAgICAgICAgc2hpcC5jbGljaygpXG4gICAgICAgIGlmKHJvdGF0ZSA9PT0gMSkgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvdGF0ZScpLmNsaWNrKClcbiAgICAgICAgLy9BdHRlbXB0IHRvIHBsYWNlIHNoaXBcbiAgICAgICAgZ2FtZUJvYXJkc1swXS5jaGlsZHJlbltyYW5kb21dLmNsaWNrKCk7XG4gICAgICAgIC8vSWYgc2hpcCBkaWQgbm90IHBsYWNlIHJlIHJ1biBsb29wXG4gICAgICAgIGlmKCFnYW1lQm9hcmRzWzBdLmNoaWxkcmVuW3JhbmRvbV0uY2xhc3NMaXN0LmNvbnRhaW5zKHNoaXAuY2xhc3NOYW1lKSl7XG4gICAgICAgICAgICBpLS07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmFuZG9taXplID0gZmFsc2Vcbn0pXG5cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmZpcm0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBsZXQgc3RvcmFnZSA9IHtcbiAgICAgICAgYmF0dGxlc2hpcDogW10sXG4gICAgICAgIGRlc3Ryb3llcjogW10sXG4gICAgICAgIHN1Ym1hcmluZTogW10sXG4gICAgICAgICdwYXRyb2wtYm9hdCc6IFtdXG4gICAgfVxuICAgIC8vQWRkcyBpbmRleCBvZiBzaGlwcyB0byBzdG9yYWdlXG4gICAgZm9yKGxldCBpID0gMDsgaTwgNjQ7IGkrKykge1xuICAgICAgICBsZXQgZGl2ID0gZ2FtZUJvYXJkc1swXS5jaGlsZHJlbltpXVxuICAgICAgICBpZihkaXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdiYXR0bGVzaGlwJykpIHtcbiAgICAgICAgICAgIHN0b3JhZ2UuYmF0dGxlc2hpcC5wdXNoKFtkaXYuaWRbMF0sIGRpdi5pZFsyXV0pXG4gICAgICAgIH0gZWxzZSBpZihkaXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZXN0cm95ZXInKSkge1xuICAgICAgICAgICAgc3RvcmFnZS5kZXN0cm95ZXIucHVzaChbZGl2LmlkWzBdLCBkaXYuaWRbMl1dKVxuICAgICAgICB9IGVsc2UgaWYoZGl2LmNsYXNzTGlzdC5jb250YWlucygnc3VibWFyaW5lJykpIHtcbiAgICAgICAgICAgIHN0b3JhZ2Uuc3VibWFyaW5lLnB1c2goW2Rpdi5pZFswXSwgZGl2LmlkWzJdXSlcbiAgICAgICAgfSBlbHNlIGlmKGRpdi5jbGFzc0xpc3QuY29udGFpbnMoJ3BhdHJvbC1ib2F0JykpIHtcbiAgICAgICAgICAgIHN0b3JhZ2VbJ3BhdHJvbC1ib2F0J10ucHVzaChbZGl2LmlkWzBdLCBkaXYuaWRbMl1dKVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vQnJlYWtzIGlmIG1pc3NpbmcgYSBzaGlwXG4gICAgZm9yKGxldCBuIGluIHN0b3JhZ2Upe1xuICAgICAgICBpZihzdG9yYWdlW25dLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgIH1cbiAgICAvL0luc2VydCBzaGlwIHBsYWNlIHRvIG9iamVjdCdzIGdyaWRcbiAgICBmb3IobGV0IG4gaW4gc3RvcmFnZSl7XG4gICAgICAgIHBsYXllclBsYWNlbWVudC5nYW1lQm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKG4sIHJldHVyblNoaXBMZW5ndGgobilbMV0pLCBzdG9yYWdlW25dKVxuICAgIH1cbiAgICBpZihwbGF5ZXIyLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdDb21wdXRlcicpIHtcbiAgICAgICAgcGxheWVyMS5nYW1lQm9hcmQuY3JlYXRlR2FtZUdyaWQocGxheWVyMS5nYW1lQm9hcmQuZ3JpZCwgMSlcbiAgICAgICAgcGxheWVyMi5jcmVhdGVDcHVHcmlkKHBsYXllcjIpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQtcGxhY2VtZW50Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIH0gZWxzZSBpZiAocGxheWVyMi5jb25zdHJ1Y3Rvci5uYW1lID09PSAnUGxheWVyJykge1xuICAgICAgICBpZihwbGF5ZXJQbGFjZW1lbnQgPT09IHBsYXllcjEpIHtcbiAgICAgICAgICAgIGNyZWF0ZVBsYWNlbWVudEdyaWQocGxheWVyMilcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgcGxheWVyMS5nYW1lQm9hcmQuY3JlYXRlR2FtZUdyaWQocGxheWVyMS5nYW1lQm9hcmQuZ3JpZCwgMSk7XG4gICAgICAgICAgICBwbGF5ZXIyLmdhbWVCb2FyZC5jcmVhdGVHYW1lR3JpZChwbGF5ZXIyLmdhbWVCb2FyZC5ncmlkLCAyKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC1wbGFjZW1lbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuZ2FtZUJvYXJkc1swXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7cGxhY2VTaGlwKGUpfSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYWNlbWVudEdyaWQocGxheWVyKSB7XG4gICAgcGxheWVyUGxhY2VtZW50ID0gcGxheWVyO1xuICAgIGNvbnN0IHBsYXllck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLW5hbWUnKTtcbiAgICAocGxheWVyID09PSBwbGF5ZXIxKSA/IHBsYXllck5hbWUudGV4dENvbnRlbnQgPSBcIlBsYXllciAxXCIgOiBwbGF5ZXJOYW1lLnRleHRDb250ZW50ID0gXCJQbGF5ZXIgMlwiO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwbGF5ZXIuZ2FtZUJvYXJkLmdyaWQubGVuZ3RoOyBpKyspe1xuICAgICAgICBmb3IobGV0IG4gaW4gcGxheWVyLmdhbWVCb2FyZC5ncmlkW2ldKXtcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgLy9SZW1vdmUgcGxheWVyIDEgYm9hcmRcbiAgICAgICAgICAgIGlmKHBsYXllciA9PT0gcGxheWVyMikgZ2FtZUJvYXJkc1swXS5jaGlsZHJlblswXS5yZW1vdmUoKTtcbiAgICAgICAgICAgIGdhbWVCb2FyZHNbMF0uYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICAgICAgICAgIGdhbWVCb2FyZHNbMF0uc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoNjQsIDFmcilgO1xuICAgICAgICAgICAgZ2FtZUJvYXJkc1swXS5zdHlsZS5ncmlkVGVtcGxhdGVSb3dzID0gYHJlcGVhdCg2NCwgMWZyKWA7XG4gICAgICAgICAgICBzcXVhcmUuY2xhc3NOYW1lID0gXCJzcXVhcmVzXCI7XG4gICAgICAgICAgICBzcXVhcmUuaWQgPSBgJHtpfSwke259YDtcbiAgICAgICAgfVxuICAgIH1cbn0gXG5cbmZ1bmN0aW9uIHBsYWNlU2hpcChlKSB7XG4gICAgaWYoc2VsZWN0ZWRTaGlwID09PSBudWxsKSByZXR1cm47XG4gICAgbGV0IGN1cnJlbnQgPSBlLnRhcmdldDtcbiAgICAvL1JlbW92ZXMgc2FtZSBzaGlwIHRvIHJlIGluc2VydFxuICAgIGlmKHVzZWRTaGlwcy5pbmNsdWRlcyhzZWxlY3RlZFNoaXBbMF0pKSB7XG4gICAgICAgIHVzZWRTaGlwcyA9IHVzZWRTaGlwcy5maWx0ZXIoKHNoaXApID0+IHNoaXAgIT09IHNlbGVjdGVkU2hpcFswXSk7XG4gICAgICAgIHJlbW92ZVNoaXBQbGFjZW1lbnQoc2VsZWN0ZWRTaGlwWzBdKVxuICAgIH1cbiAgICBpZihyb3RhdGUgJiAhKCgrY3VycmVudC5pZFswXSArIHNlbGVjdGVkU2hpcFsxXSkgPiA4KSkge1xuICAgICAgICAvL0dvZXMgdGhyb3VnaCBib2FyZCdzIGRpdiB2ZXJ0aWNhbGx5XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzZWxlY3RlZFNoaXBbMV07IGkrKyl7XG4gICAgICAgICAgICAvL1JlbW92ZSBzaGlwIGR1ZSB0byBhIHNoaXAgYWxyZWFkeSB0aGVyZVxuICAgICAgICAgICAgaWYoY3VycmVudC5jbGFzc0xpc3QubGVuZ3RoID4gMSkgcmV0dXJuIHJlbW92ZVNoaXBQbGFjZW1lbnQoc2VsZWN0ZWRTaGlwWzBdKVxuICAgICAgICAgICAgLy9EaXNwbGF5IHNoaXAgdG8gZ3JpZFxuICAgICAgICAgICAgY3VycmVudC5jbGFzc0xpc3QuYWRkKHNlbGVjdGVkU2hpcFswXSk7XG4gICAgICAgICAgICBpZihpID09PSBzZWxlY3RlZFNoaXBbMV0gLSAxKSBicmVhaztcbiAgICAgICAgICAgIC8vR29lcyB0cm91Z2ggY29sdW1uc1xuICAgICAgICAgICAgZm9yKGxldCBuID0gMDsgbiA8PSA3OyBuKyspe1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB1c2VkU2hpcHMucHVzaChzZWxlY3RlZFNoaXBbMF0pXG4gICAgIH0gZWxzZSBpZighcm90YXRlICYgISgoK2N1cnJlbnQuaWRbMl0gKyBzZWxlY3RlZFNoaXBbMV0pID4gOCkpe1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRTaGlwWzFdOyBpKyspe1xuICAgICAgICAgICAgLy9SZW1vdmUgc2hpcCBkdWUgdG8gYSBzaGlwIGFscmVhZHkgdGhlcmVcbiAgICAgICAgICAgIGlmKGN1cnJlbnQuY2xhc3NMaXN0Lmxlbmd0aCA+IDEpIHJldHVybiByZW1vdmVTaGlwUGxhY2VtZW50KHNlbGVjdGVkU2hpcFswXSlcbiAgICAgICAgICAgIC8vRGlzcGxheSBzaGlwIHRvIGdyaWRcbiAgICAgICAgICAgIGN1cnJlbnQuY2xhc3NMaXN0LmFkZChzZWxlY3RlZFNoaXBbMF0pO1xuICAgICAgICAgICAgaWYoaSA9PT0gc2VsZWN0ZWRTaGlwWzFdIC0gMSkgYnJlYWs7XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIH1cbiAgICAgICAgdXNlZFNoaXBzLnB1c2goc2VsZWN0ZWRTaGlwWzBdKVxuICAgICB9XG4gICAgIC8vU2hha2VzIGJvYXJkIGlmIGludmFsaWQgcGxhY2VtZW50XG4gICAgIGlmKCF1c2VkU2hpcHMuaW5jbHVkZXMoc2VsZWN0ZWRTaGlwWzBdKSAmJiByYW5kb21pemUgPT09IGZhbHNlKSB7XG4gICAgICAgIGdhbWVCb2FyZHNbMF0uY2xhc3NMaXN0LnRvZ2dsZSgnc2hha2UnKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtnYW1lQm9hcmRzWzBdLmNsYXNzTGlzdC50b2dnbGUoJ3NoYWtlJyl9LCAyNTApXG4gICAgIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU2hpcFBsYWNlbWVudChzaGlwKSB7XG4gICAgaWYoc2hpcCA9PT0gdW5kZWZpbmVkKSByZXR1cm5cbiAgICBmb3IobGV0IG4gaW4gZ2FtZUJvYXJkc1swXS5jaGlsZHJlbil7XG4gICAgICAgIGlmKGdhbWVCb2FyZHNbMF0uY2hpbGRyZW5bK25dLmNsYXNzTGlzdC5jb250YWlucyhzaGlwKSl7XG4gICAgICAgICAgICBnYW1lQm9hcmRzWzBdLmNoaWxkcmVuWytuXS5jbGFzc0xpc3QucmVtb3ZlKHNoaXApXG4gICAgICAgIH07XG4gICAgICAgIGlmKCtuID09PSA2MykgcmV0dXJuO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmV0dXJuU2hpcExlbmd0aChzaGlwTmFtZSkge1xuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGlmKHNoaXBOYW1lID09PSAnYmF0dGxlc2hpcCcpIHtcbiAgICAgICAgbGVuZ3RoID0gNFxuICAgIH0gZWxzZSBpZihzaGlwTmFtZSA9PT0gJ3BhdHJvbC1ib2F0Jykge1xuICAgICAgICBsZW5ndGggPSAyXG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGVuZ3RoID0gM1xuICAgIH1cbiAgICByZXR1cm4gW3NoaXBOYW1lLCBsZW5ndGhdXG59XG5cblxuXG5cbmV4cG9ydCB7IHBsYXllcjEsIHBsYXllcjIsIGRpZmZpY3VsdH0iLCJpbXBvcnQgR2FtZUJvYXJkIGZyb20gXCIuL2dhbWUtYm9hcmRcIlxuXG5jbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmdhbWVCb2FyZCA9IG5ldyBHYW1lQm9hcmQ7XG4gICAgfVxuICAgIFxufVxuXG5cbmV4cG9ydCB7UGxheWVyfSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgbGVuZ3RoLCB0aW1lc0hpdCA9IDAsIHN1bmsgPSBmYWxzZSl7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMudGltZXNIaXQgPSB0aW1lc0hpdDtcbiAgICAgICAgdGhpcy5zdW5rID0gc3Vua1xuICAgIH1cbiAgICBoaXQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXNIaXQgKz0gMVxuICAgIH1cbiAgICBpc1N1bmsoKXtcbiAgICAgICAgaWYodGhpcy5sZW5ndGggPT09IHRoaXMudGltZXNIaXQpIHRoaXMuc3VuayA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzLnN1bms7XG4gICAgfVxufSIsImltcG9ydCB7IHBsYXllcjEsIHBsYXllcjJ9IGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQgeyBvcHBvbmVudCB9IGZyb20gXCIuL2dhbWUtYm9hcmRcIjtcbmltcG9ydCBoaXQgZnJvbSAnLi9oaXQtYXVkaW8ud2F2JztcbmltcG9ydCBtaXNzIGZyb20gJy4vbWlzcy1hdWRpby5tcDMnXG5cbmNvbnN0IHR1cm5EaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci10dXJuJyk7XG5jb25zdCBpbmZvU3RhdHVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8nKTtcbmNvbnN0IGhpdEF1ZGlvID0gbmV3IEF1ZGlvKGhpdCk7XG5jb25zdCBtaXNzQXVkaW8gPSBuZXcgQXVkaW8obWlzcyk7XG5cbmxldCBwcmV2aW91c0RpdiA9IG51bGw7XG5cbm1pc3NBdWRpby5wcmVsb2FkID0gJ2F1dG8nO1xuaGl0QXVkaW8ucHJlbG9hZCA9ICdhdXRvJztcblxuZnVuY3Rpb24gc3R5bGVVSShzcXVhcmUsIHN0YXR1cykge1xuICAgIGlmKHN0YXR1cyA9PT0gJ3NhbWUgc3BvdCcpIHJldHVyblxuICAgIGlmKHN0YXR1cyA9PT0gJ2hpdCcpIHtcbiAgICAgICAgaGl0QXVkaW8uY3VycmVudFRpbWUgPSAwO1xuICAgICAgICBoaXRBdWRpby5wbGF5KClcbiAgICAgICAgLy9Db21wZW5zYXRlcyBmb3IgYXVkaW8gZGVsYXlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgICAgICBpbmZvU3RhdHVzLnRleHRDb250ZW50ID0gXCJBdHRhY2sgYWdhaW4hXCI7XG4gICAgICAgICAgICBzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdzaGFrZScpO1xuICAgICAgICB9LDI1MClcbiAgICAgICAgLy9SZW1vdmUgc2hha2VcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7c3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnc2hha2UnKX0sIDUwMClcbiAgICB9IGVsc2UgaWYoc3RhdHVzID09PSAnbWlzcycpIHtcbiAgICAgICAgbWlzc0F1ZGlvLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgbWlzc0F1ZGlvLnBsYXkoKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdtaXNzJylcbiAgICAgICAgICAgIGluZm9TdGF0dXMudGV4dENvbnRlbnQgPSBcIk9oIG5vLCBhIG1pc3MhXCI7XG4gICAgICAgICAgICBpZihwcmV2aW91c0RpdiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHByZXZpb3VzRGl2LmNsYXNzTGlzdC50b2dnbGUoJ3ByZXYtbWlzcycpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aW91c0RpdiA9IHNxdWFyZTtcbiAgICAgICAgfSwgMjUwKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIChvcHBvbmVudCA9PT0gcGxheWVyMSlcbiAgICAgICAgICAgID8gdHVybkRpc3BsYXkudGV4dENvbnRlbnQgPSBcIlBsYXllciAyOlwiXG4gICAgICAgICAgICA6IHR1cm5EaXNwbGF5LnRleHRDb250ZW50ID0gXCJQbGF5ZXIgMTpcIjtcbiAgICAgICAgICAgIGluZm9TdGF0dXMudGV4dENvbnRlbnQgPSBcIkF0dGFjayFcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIxJykuY2xhc3NMaXN0LnRvZ2dsZSgndG9nZ2xlJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMicpLmNsYXNzTGlzdC50b2dnbGUoJ3RvZ2dsZScpXG4gICAgICAgIH0sIDEwNTApXG4gICAgfVxufVxuZnVuY3Rpb24gZGVzdHJveUJvYXJkKGJvYXJkKXtcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IHhMZWZ0ID0gMDtcbiAgICBsZXQgeFJpZ2h0ID0gNztcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgYm9hcmQuY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZSgnaGl0Jyk7XG4gICAgICAgICAgICBib2FyZC5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdtaXNzJyk7XG4gICAgICAgICAgICBib2FyZC5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdwcmV2LW1pc3MnKVxuICAgICAgICAgICAgaGl0QXVkaW8uY3VycmVudFRpbWUgPSAxO1xuICAgICAgICAgICAgaGl0QXVkaW8ucGxheSgpO1xuICAgICAgICAgICAgaWYoaSA9PT0geExlZnQpe1xuICAgICAgICAgICAgICAgIHhMZWZ0ICs9IDk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvYXJkLmNoaWxkcmVuW2ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnXG4gICAgICAgICAgICB9IGVsc2UgaWYoaSA9PT0geFJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgeFJpZ2h0ICs9IDc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvYXJkLmNoaWxkcmVuW2ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBib2FyZC5jaGlsZHJlbltpXS5pZCA9ICdnYW1lLW92ZXInO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgaWYoaSA9PT0gNjQpIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpXG4gICAgICAgIH0sIDIwKTtcbiAgICB9LCAyNTApO1xuICAgXG59XG5cbmZ1bmN0aW9uIGdhbWVPdmVyRGlzcGxheSh3aW5uZXIpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYod2lubmVyLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdDb21wdXRlcicpe1xuICAgICAgICAgICAgdHVybkRpc3BsYXkudGV4dENvbnRlbnQgPSBcIkNvbXB1dGVyOlwiXG4gICAgICAgICAgICBpbmZvU3RhdHVzLnRleHRDb250ZW50ID0gXCJEZWZlYXRlZCBhbGwgUGxheWVyIDEgc2hpcHMhXCJcbiAgICAgICAgfSBlbHNlIGlmKG9wcG9uZW50ID09PSBwbGF5ZXIyKSB7XG4gICAgICAgICAgICB0dXJuRGlzcGxheS50ZXh0Q29udGVudCA9IFwiUGxheWVyIDE6XCJcbiAgICAgICAgICAgIGluZm9TdGF0dXMudGV4dENvbnRlbnQgPSBcIkRlZmVhdGVkIGFsbCBQbGF5ZXIgMiBzaGlwcyFcIlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHVybkRpc3BsYXkudGV4dENvbnRlbnQgPSBcIlBsYXllciAyOlwiXG4gICAgICAgICAgICBpbmZvU3RhdHVzLnRleHRDb250ZW50ID0gXCJEZWZlYXRlZCBhbGwgUGxheWVyIDEgc2hpcHMhXCJcbiAgICAgICAgfVxuICAgIH0sNTAwKSBcbn1cblxuZXhwb3J0IHtzdHlsZVVJLCBkZXN0cm95Qm9hcmQsIGdhbWVPdmVyRGlzcGxheX0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==