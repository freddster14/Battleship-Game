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

/***/ "./src/cpu.js":
/*!********************!*\
  !*** ./src/cpu.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   computerAttack: () => (/* binding */ computerAttack),
/* harmony export */   createCpuGrid: () => (/* binding */ createCpuGrid)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/ship.js");



function createCpuGrid(cpu) {
    cpu.gameBoard.placeShip(new _ship__WEBPACK_IMPORTED_MODULE_1__["default"]('destroyer', 3), (0,_index__WEBPACK_IMPORTED_MODULE_0__.randomCpuPlacement)(3, 2))
    cpu.gameBoard.placeShip(new _ship__WEBPACK_IMPORTED_MODULE_1__["default"]('battleship', 4), (0,_index__WEBPACK_IMPORTED_MODULE_0__.randomCpuPlacement)(4, 2))
    cpu.gameBoard.placeShip(new _ship__WEBPACK_IMPORTED_MODULE_1__["default"]('submarine', 3), (0,_index__WEBPACK_IMPORTED_MODULE_0__.randomCpuPlacement)(3, 2))
    cpu.gameBoard.placeShip(new _ship__WEBPACK_IMPORTED_MODULE_1__["default"]('patrol-boat', 2), (0,_index__WEBPACK_IMPORTED_MODULE_0__.randomCpuPlacement)(2, 2));
    (0,_index__WEBPACK_IMPORTED_MODULE_0__.createBoardGrid)(cpu.gameBoard.grid, 2)
}

function computerAttack(){
    if(_index__WEBPACK_IMPORTED_MODULE_0__.opponent === _index__WEBPACK_IMPORTED_MODULE_0__.player1 && _index__WEBPACK_IMPORTED_MODULE_0__.player2.constructor.name === "Computer"){
        setTimeout(() => {
            let randomIndex = Math.floor(Math.random() * 64);
            let square = document.getElementsByClassName('board')[1].children[randomIndex];
            while(square.classList.contains("hit") || square.classList.contains("miss")) {
                randomIndex = Math.floor(Math.random() * 64);
                square = document.getElementsByClassName('board')[1].children[randomIndex];
            }
            square.click()
        }, 2000)
    }
}



/***/ }),

/***/ "./src/game-board.js":
/*!***************************!*\
  !*** ./src/game-board.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameBoard)
/* harmony export */ });
class GameBoard {
    constructor(){
        this.grid = new Array(8).fill(null).map(() => new Array(8).fill(false));
    }
    placeShip(ship, area){
        for(let n = 0; n < ship.length; n++){
            if(this.grid[area[n][0]][area[n][1]] !== false) return 'invalid placement';
            this.grid[area[n][0]][area[n][1]] = ship
        }
        return area
    }
    receiveAttack(x, y){
        const ship = this.grid[x][y];
        const hitOrMiss = this.attackLogic(ship);
        return this.grid[x][y] = hitOrMiss;
    }
    attackLogic(index){
        if(index === 'hit' || index === 'miss' || index === 'same spot') return 'same spot'
        if(index === false) {
            return index = 'miss';
        } else if(index !== false) {
            index.hit();
            index.sunk = index.isSunk();
            return index = 'hit'
        }
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
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createBoardGrid: () => (/* binding */ createBoardGrid),
/* harmony export */   opponent: () => (/* binding */ opponent),
/* harmony export */   player1: () => (/* binding */ player1),
/* harmony export */   player2: () => (/* binding */ player2),
/* harmony export */   randomCpuPlacement: () => (/* binding */ randomCpuPlacement)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _styleUI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styleUI */ "./src/styleUI.js");
/* harmony import */ var _cpu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cpu */ "./src/cpu.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _background_music_mp3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./background-music.mp3 */ "./src/background-music.mp3");







const overlay = document.querySelector('.overlay');
const gameModeDisplay = document.querySelector('.game-mode');
const gameContainer = document.querySelector('.board-container')
const gameBoards = document.getElementsByClassName('board');
const backgroundMusic = new Audio(_background_music_mp3__WEBPACK_IMPORTED_MODULE_5__);
const player1 = new _player__WEBPACK_IMPORTED_MODULE_0__.Player;

let player2;
let gameMode = 'null';
let opponent;
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
    player2 = new _player__WEBPACK_IMPORTED_MODULE_0__.Computer;
    overlay.style.display = 'none';
    gameModeDisplay.style.display = 'none';
    document.querySelector('.board-placement').style.display = 'flex';
    gameMode = 'computer';
    opponent = player2
    playerPlacementGrid(player1);
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
    gameMode = 'vs';
    opponent = player2
    playerPlacementGrid(player1)
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
        let ship = document.querySelector('.ships').children[i];
        ship.click()
        if(rotate === 1) document.querySelector('.rotate').click()
        gameBoards[0].children[random].click();
        if(!gameBoards[0].children[random].classList.contains(ship.className)){
            i--;
        }
    }
    randomize = false
})

gameBoards[0].addEventListener('click', (e) => {placeShip(e)});

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
    if(gameMode === 'computer') {
        createBoardGrid(player1.gameBoard.grid, 1)
        ;(0,_cpu__WEBPACK_IMPORTED_MODULE_3__.createCpuGrid)(player2);
        document.querySelector('.board-placement').style.display = 'none'
    } else if (gameMode === 'vs') {
        if(playerPlacement === player1) {
            playerPlacementGrid(player2)
        } else{
            createBoardGrid(player1.gameBoard.grid, 1);
            createBoardGrid(player2.gameBoard.grid, 2);
            document.querySelector('.board-placement').style.display = 'none'
        }
    }
});

function playerPlacementGrid(player) {
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


function createBoardGrid(grid, t) {
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
                let x = Number(square.id.at(0));
                let y = Number(square.id.at(2));
                let result = attackSquare(x, y, boardBoolean);
                (0,_styleUI__WEBPACK_IMPORTED_MODULE_2__.styleUI)(square, result);
                changeTurn(result);
                (0,_cpu__WEBPACK_IMPORTED_MODULE_3__.computerAttack)();
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

function changeTurn(result) {
    if(result === 'same spot') return
    if(result === 'hit') {
        return gameStatus()
    } else if(result === 'miss') {
        (opponent === player1) ? opponent = player2 : opponent = player1;
    }
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
        if(x === 8 || y === 8 || player2.gameBoard.grid[x][y] !== false){
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
    while(player2.gameBoard.grid[x][y] !== false) {
        x = Math.floor(Math.random() * 8);
        y = Math.floor(Math.random() * 8);
    }
    return [[x,y]]
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
        ;(0,_styleUI__WEBPACK_IMPORTED_MODULE_2__.destroyBoard)(gameBoards[2])
        ;(0,_styleUI__WEBPACK_IMPORTED_MODULE_2__.gameOverDisplay)(player1)
    } else if(opponent === player1 && over) {
        backgroundMusic.pause()
        ;(0,_styleUI__WEBPACK_IMPORTED_MODULE_2__.destroyBoard)(gameBoards[1])
        ;(0,_styleUI__WEBPACK_IMPORTED_MODULE_2__.gameOverDisplay)(player2)
    }
}



/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Computer: () => (/* binding */ Computer),
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _game_board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-board */ "./src/game-board.js");


class Player {
    constructor() {
        this.gameBoard = new _game_board__WEBPACK_IMPORTED_MODULE_0__["default"];
    }
}

class Computer {
    constructor(){
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
/* harmony import */ var _hit_audio_wav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hit-audio.wav */ "./src/hit-audio.wav");
/* harmony import */ var _miss_audio_mp3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./miss-audio.mp3 */ "./src/miss-audio.mp3");




const turnDisplay = document.querySelector('.player-turn');
const infoStatus = document.querySelector('.info');
const hitAudio = new Audio(_hit_audio_wav__WEBPACK_IMPORTED_MODULE_1__);
const missAudio = new Audio(_miss_audio_mp3__WEBPACK_IMPORTED_MODULE_2__);
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
            infoStatus.textContent = "Oh no, a miss!"
        }, 250)
        
        setTimeout(() => {
            (_index__WEBPACK_IMPORTED_MODULE_0__.opponent === _index__WEBPACK_IMPORTED_MODULE_0__.player1)
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
        } else if(_index__WEBPACK_IMPORTED_MODULE_0__.opponent === _index__WEBPACK_IMPORTED_MODULE_0__.player2) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQXdGO0FBQzlEOztBQUUxQjtBQUNBLGdDQUFnQyw2Q0FBSSxrQkFBa0IsMERBQWtCO0FBQ3hFLGdDQUFnQyw2Q0FBSSxtQkFBbUIsMERBQWtCO0FBQ3pFLGdDQUFnQyw2Q0FBSSxrQkFBa0IsMERBQWtCO0FBQ3hFLGdDQUFnQyw2Q0FBSSxvQkFBb0IsMERBQWtCO0FBQzFFLElBQUksdURBQWU7QUFDbkI7O0FBRUE7QUFDQSxPQUFPLDRDQUFRLEtBQUssMkNBQU8sSUFBSSwyQ0FBTztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixpQkFBaUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEMwQztBQUNoQjtBQUN5QztBQUNiO0FBQ3RCO0FBQ29COztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxrREFBZTtBQUNqRCxvQkFBb0IsMkNBQU07O0FBRTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiw2Q0FBUTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiwyQ0FBTTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGdEQUFnRCxhQUFhOztBQUU3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCw2Q0FBSTtBQUNwRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLG9EQUFhO0FBQ3JCO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsa0NBQWtDO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsRUFBRSxHQUFHLEVBQUU7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsUUFBUTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCx1QkFBdUIscUJBQXFCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix3Q0FBd0M7QUFDbEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlEQUFPO0FBQ3ZCO0FBQ0EsZ0JBQWdCLG9EQUFjO0FBQzlCLGFBQWE7QUFDYjtBQUNBO0FBQ0Esd0NBQXdDLGdCQUFnQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixvQkFBb0I7QUFDdkM7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1REFBWTtBQUNwQixRQUFRLDBEQUFlO0FBQ3ZCLE1BQU07QUFDTjtBQUNBLFFBQVEsdURBQVk7QUFDcEIsUUFBUSwwREFBZTtBQUN2QjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqVG9DOztBQUVwQztBQUNBO0FBQ0EsNkJBQTZCLG1EQUFTO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZCQUE2QixtREFBUztBQUN0QztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDWmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZHFEO0FBQ25CO0FBQ0M7O0FBRW5DO0FBQ0E7QUFDQSwyQkFBMkIsMkNBQUc7QUFDOUIsNEJBQTRCLDRDQUFJO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLDBCQUEwQiwrQ0FBK0M7QUFDekUsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGFBQWEsNENBQVEsS0FBSywyQ0FBTztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsUUFBUSw0Q0FBUSxLQUFLLDJDQUFPO0FBQ3RDO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ2pGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7VUVsQkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS8uL3NyYy9jcHUuanMiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lLy4vc3JjL2dhbWUtYm9hcmQuanMiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lLy4vc3JjL3N0eWxlVUkuanMiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQge2NyZWF0ZUJvYXJkR3JpZCwgcmFuZG9tQ3B1UGxhY2VtZW50LCBwbGF5ZXIxLCBwbGF5ZXIyLCBvcHBvbmVudH0gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAnO1xuXG5mdW5jdGlvbiBjcmVhdGVDcHVHcmlkKGNwdSkge1xuICAgIGNwdS5nYW1lQm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKCdkZXN0cm95ZXInLCAzKSwgcmFuZG9tQ3B1UGxhY2VtZW50KDMsIDIpKVxuICAgIGNwdS5nYW1lQm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKCdiYXR0bGVzaGlwJywgNCksIHJhbmRvbUNwdVBsYWNlbWVudCg0LCAyKSlcbiAgICBjcHUuZ2FtZUJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgnc3VibWFyaW5lJywgMyksIHJhbmRvbUNwdVBsYWNlbWVudCgzLCAyKSlcbiAgICBjcHUuZ2FtZUJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgncGF0cm9sLWJvYXQnLCAyKSwgcmFuZG9tQ3B1UGxhY2VtZW50KDIsIDIpKTtcbiAgICBjcmVhdGVCb2FyZEdyaWQoY3B1LmdhbWVCb2FyZC5ncmlkLCAyKVxufVxuXG5mdW5jdGlvbiBjb21wdXRlckF0dGFjaygpe1xuICAgIGlmKG9wcG9uZW50ID09PSBwbGF5ZXIxICYmIHBsYXllcjIuY29uc3RydWN0b3IubmFtZSA9PT0gXCJDb21wdXRlclwiKXtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2NCk7XG4gICAgICAgICAgICBsZXQgc3F1YXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmQnKVsxXS5jaGlsZHJlbltyYW5kb21JbmRleF07XG4gICAgICAgICAgICB3aGlsZShzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpIHx8IHNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoXCJtaXNzXCIpKSB7XG4gICAgICAgICAgICAgICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2NCk7XG4gICAgICAgICAgICAgICAgc3F1YXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmQnKVsxXS5jaGlsZHJlbltyYW5kb21JbmRleF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzcXVhcmUuY2xpY2soKVxuICAgICAgICB9LCAyMDAwKVxuICAgIH1cbn1cblxuZXhwb3J0IHtjcmVhdGVDcHVHcmlkLCBjb21wdXRlckF0dGFja30iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuZ3JpZCA9IG5ldyBBcnJheSg4KS5maWxsKG51bGwpLm1hcCgoKSA9PiBuZXcgQXJyYXkoOCkuZmlsbChmYWxzZSkpO1xuICAgIH1cbiAgICBwbGFjZVNoaXAoc2hpcCwgYXJlYSl7XG4gICAgICAgIGZvcihsZXQgbiA9IDA7IG4gPCBzaGlwLmxlbmd0aDsgbisrKXtcbiAgICAgICAgICAgIGlmKHRoaXMuZ3JpZFthcmVhW25dWzBdXVthcmVhW25dWzFdXSAhPT0gZmFsc2UpIHJldHVybiAnaW52YWxpZCBwbGFjZW1lbnQnO1xuICAgICAgICAgICAgdGhpcy5ncmlkW2FyZWFbbl1bMF1dW2FyZWFbbl1bMV1dID0gc2hpcFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcmVhXG4gICAgfVxuICAgIHJlY2VpdmVBdHRhY2soeCwgeSl7XG4gICAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLmdyaWRbeF1beV07XG4gICAgICAgIGNvbnN0IGhpdE9yTWlzcyA9IHRoaXMuYXR0YWNrTG9naWMoc2hpcCk7XG4gICAgICAgIHJldHVybiB0aGlzLmdyaWRbeF1beV0gPSBoaXRPck1pc3M7XG4gICAgfVxuICAgIGF0dGFja0xvZ2ljKGluZGV4KXtcbiAgICAgICAgaWYoaW5kZXggPT09ICdoaXQnIHx8IGluZGV4ID09PSAnbWlzcycgfHwgaW5kZXggPT09ICdzYW1lIHNwb3QnKSByZXR1cm4gJ3NhbWUgc3BvdCdcbiAgICAgICAgaWYoaW5kZXggPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXggPSAnbWlzcyc7XG4gICAgICAgIH0gZWxzZSBpZihpbmRleCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGluZGV4LmhpdCgpO1xuICAgICAgICAgICAgaW5kZXguc3VuayA9IGluZGV4LmlzU3VuaygpO1xuICAgICAgICAgICAgcmV0dXJuIGluZGV4ID0gJ2hpdCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBpc0FsbFN1bmsoKXtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZ3JpZC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBmb3IobGV0IG4gaW4gdGhpcy5ncmlkW2ldKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmdyaWRbaV1bbl0uY29uc3RydWN0b3IubmFtZSA9PT0gJ1NoaXAnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbn0iLCJpbXBvcnQge1BsYXllciwgQ29tcHV0ZXJ9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHsgc3R5bGVVSSwgZGVzdHJveUJvYXJkLCBnYW1lT3ZlckRpc3BsYXkgfSBmcm9tIFwiLi9zdHlsZVVJXCI7XG5pbXBvcnQgeyBjcmVhdGVDcHVHcmlkLCBjb21wdXRlckF0dGFjayB9IGZyb20gXCIuL2NwdVwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3N0eWxlLmNzcydcbmltcG9ydCBiYWNrZ3JvdW5kQXVkaW8gZnJvbSAnLi9iYWNrZ3JvdW5kLW11c2ljLm1wMydcblxuY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XG5jb25zdCBnYW1lTW9kZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1tb2RlJyk7XG5jb25zdCBnYW1lQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLWNvbnRhaW5lcicpXG5jb25zdCBnYW1lQm9hcmRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmQnKTtcbmNvbnN0IGJhY2tncm91bmRNdXNpYyA9IG5ldyBBdWRpbyhiYWNrZ3JvdW5kQXVkaW8pO1xuY29uc3QgcGxheWVyMSA9IG5ldyBQbGF5ZXI7XG5cbmxldCBwbGF5ZXIyO1xubGV0IGdhbWVNb2RlID0gJ251bGwnO1xubGV0IG9wcG9uZW50O1xubGV0IHNlbGVjdGVkU2hpcCA9IFtdO1xubGV0IHJvdGF0ZSA9IGZhbHNlO1xubGV0IHJhbmRvbWl6ZSA9IGZhbHNlO1xubGV0IHVzZWRTaGlwcyA9IFtdO1xubGV0IHBsYXllclBsYWNlbWVudCA9IHBsYXllcjE7XG5sZXQgc2NyZWVuV2lkdGggID0gXG53aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcblxuKHNjcmVlbldpZHRoIDwgMTE4NSkgPyBzY3JlZW5XaWR0aCA9IHRydWUgOiBzY3JlZW5XaWR0aCA9IGZhbHNlO1xuLy9DUFUgYnV0dG9uXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcHV0ZXInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBiYWNrZ3JvdW5kTXVzaWMubG9vcCA9IHRydWU7XG4gICAgYmFja2dyb3VuZE11c2ljLmxvYWQoKVxuICAgIGJhY2tncm91bmRNdXNpYy5wbGF5KClcbiAgICBwbGF5ZXIyID0gbmV3IENvbXB1dGVyO1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lTW9kZURpc3BsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQtcGxhY2VtZW50Jykuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICBnYW1lTW9kZSA9ICdjb21wdXRlcic7XG4gICAgb3Bwb25lbnQgPSBwbGF5ZXIyXG4gICAgcGxheWVyUGxhY2VtZW50R3JpZChwbGF5ZXIxKTtcbn0pO1xuLy9WUyBCdXR0b25cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52cycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGJhY2tncm91bmRNdXNpYy5sb29wID0gdHJ1ZTtcbiAgICBiYWNrZ3JvdW5kTXVzaWMubG9hZCgpXG4gICAgYmFja2dyb3VuZE11c2ljLnBsYXkoKVxuICAgIHBsYXllcjIgPSBuZXcgUGxheWVyXG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWVNb2RlRGlzcGxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC1wbGFjZW1lbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIGdhbWVNb2RlID0gJ3ZzJztcbiAgICBvcHBvbmVudCA9IHBsYXllcjJcbiAgICBwbGF5ZXJQbGFjZW1lbnRHcmlkKHBsYXllcjEpXG59KTtcbi8vU2hpcCBidXR0b25zIGZvciBwbGFjZW1lbnRcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwcyA+IGJ1dHRvbicpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIHNlbGVjdGVkU2hpcCA9IHJldHVyblNoaXBMZW5ndGgoZS50YXJnZXQuY2xhc3NMaXN0LnZhbHVlKVxuICAgIH0pXG59KTtcbi8vUm90YXRlIEJ1dHRvblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvdGF0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIChyb3RhdGUgPT09IGZhbHNlKSA/IHJvdGF0ZSA9IHRydWUgOiByb3RhdGUgPSBmYWxzZVxufSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYW5kb21pemUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICByYW5kb21pemUgPSB0cnVlXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICBsZXQgcmFuZG9tID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNjMpO1xuICAgICAgICBsZXQgcm90YXRlID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKVxuICAgICAgICBsZXQgc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGlwcycpLmNoaWxkcmVuW2ldO1xuICAgICAgICBzaGlwLmNsaWNrKClcbiAgICAgICAgaWYocm90YXRlID09PSAxKSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm90YXRlJykuY2xpY2soKVxuICAgICAgICBnYW1lQm9hcmRzWzBdLmNoaWxkcmVuW3JhbmRvbV0uY2xpY2soKTtcbiAgICAgICAgaWYoIWdhbWVCb2FyZHNbMF0uY2hpbGRyZW5bcmFuZG9tXS5jbGFzc0xpc3QuY29udGFpbnMoc2hpcC5jbGFzc05hbWUpKXtcbiAgICAgICAgICAgIGktLTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByYW5kb21pemUgPSBmYWxzZVxufSlcblxuZ2FtZUJvYXJkc1swXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7cGxhY2VTaGlwKGUpfSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbGV0IHN0b3JhZ2UgPSB7XG4gICAgICAgIGJhdHRsZXNoaXA6IFtdLFxuICAgICAgICBkZXN0cm95ZXI6IFtdLFxuICAgICAgICBzdWJtYXJpbmU6IFtdLFxuICAgICAgICAncGF0cm9sLWJvYXQnOiBbXVxuICAgIH1cbiAgICAvL0FkZHMgaW5kZXggb2Ygc2hpcHMgdG8gc3RvcmFnZVxuICAgIGZvcihsZXQgaSA9IDA7IGk8IDY0OyBpKyspIHtcbiAgICAgICAgbGV0IGRpdiA9IGdhbWVCb2FyZHNbMF0uY2hpbGRyZW5baV1cbiAgICAgICAgaWYoZGl2LmNsYXNzTGlzdC5jb250YWlucygnYmF0dGxlc2hpcCcpKSB7XG4gICAgICAgICAgICBzdG9yYWdlLmJhdHRsZXNoaXAucHVzaChbZGl2LmlkWzBdLCBkaXYuaWRbMl1dKVxuICAgICAgICB9IGVsc2UgaWYoZGl2LmNsYXNzTGlzdC5jb250YWlucygnZGVzdHJveWVyJykpIHtcbiAgICAgICAgICAgIHN0b3JhZ2UuZGVzdHJveWVyLnB1c2goW2Rpdi5pZFswXSwgZGl2LmlkWzJdXSlcbiAgICAgICAgfSBlbHNlIGlmKGRpdi5jbGFzc0xpc3QuY29udGFpbnMoJ3N1Ym1hcmluZScpKSB7XG4gICAgICAgICAgICBzdG9yYWdlLnN1Ym1hcmluZS5wdXNoKFtkaXYuaWRbMF0sIGRpdi5pZFsyXV0pXG4gICAgICAgIH0gZWxzZSBpZihkaXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYXRyb2wtYm9hdCcpKSB7XG4gICAgICAgICAgICBzdG9yYWdlWydwYXRyb2wtYm9hdCddLnB1c2goW2Rpdi5pZFswXSwgZGl2LmlkWzJdXSlcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL0JyZWFrcyBpZiBtaXNzaW5nIGEgc2hpcFxuICAgIGZvcihsZXQgbiBpbiBzdG9yYWdlKXtcbiAgICAgICAgaWYoc3RvcmFnZVtuXS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICB9XG4gICAgLy9JbnNlcnQgc2hpcCBwbGFjZSB0byBvYmplY3QncyBncmlkXG4gICAgZm9yKGxldCBuIGluIHN0b3JhZ2Upe1xuICAgICAgICBwbGF5ZXJQbGFjZW1lbnQuZ2FtZUJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcChuLCByZXR1cm5TaGlwTGVuZ3RoKG4pWzFdKSwgc3RvcmFnZVtuXSlcbiAgICB9XG4gICAgaWYoZ2FtZU1vZGUgPT09ICdjb21wdXRlcicpIHtcbiAgICAgICAgY3JlYXRlQm9hcmRHcmlkKHBsYXllcjEuZ2FtZUJvYXJkLmdyaWQsIDEpXG4gICAgICAgIGNyZWF0ZUNwdUdyaWQocGxheWVyMik7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC1wbGFjZW1lbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgfSBlbHNlIGlmIChnYW1lTW9kZSA9PT0gJ3ZzJykge1xuICAgICAgICBpZihwbGF5ZXJQbGFjZW1lbnQgPT09IHBsYXllcjEpIHtcbiAgICAgICAgICAgIHBsYXllclBsYWNlbWVudEdyaWQocGxheWVyMilcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgY3JlYXRlQm9hcmRHcmlkKHBsYXllcjEuZ2FtZUJvYXJkLmdyaWQsIDEpO1xuICAgICAgICAgICAgY3JlYXRlQm9hcmRHcmlkKHBsYXllcjIuZ2FtZUJvYXJkLmdyaWQsIDIpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLXBsYWNlbWVudCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiBwbGF5ZXJQbGFjZW1lbnRHcmlkKHBsYXllcikge1xuICAgIHBsYXllclBsYWNlbWVudCA9IHBsYXllcjtcbiAgICBjb25zdCBwbGF5ZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1uYW1lJyk7XG4gICAgKHBsYXllciA9PT0gcGxheWVyMSkgPyBwbGF5ZXJOYW1lLnRleHRDb250ZW50ID0gXCJQbGF5ZXIgMVwiIDogcGxheWVyTmFtZS50ZXh0Q29udGVudCA9IFwiUGxheWVyIDJcIjtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWVyLmdhbWVCb2FyZC5ncmlkLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgZm9yKGxldCBuIGluIHBsYXllci5nYW1lQm9hcmQuZ3JpZFtpXSl7XG4gICAgICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIC8vUmVtb3ZlIHBsYXllciAxIGJvYXJkXG4gICAgICAgICAgICBpZihwbGF5ZXIgPT09IHBsYXllcjIpIGdhbWVCb2FyZHNbMF0uY2hpbGRyZW5bMF0ucmVtb3ZlKCk7XG4gICAgICAgICAgICBnYW1lQm9hcmRzWzBdLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgICAgICAgICBnYW1lQm9hcmRzWzBdLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KDY0LCAxZnIpYDtcbiAgICAgICAgICAgIGdhbWVCb2FyZHNbMF0uc3R5bGUuZ3JpZFRlbXBsYXRlUm93cyA9IGByZXBlYXQoNjQsIDFmcilgO1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTmFtZSA9IFwic3F1YXJlc1wiO1xuICAgICAgICAgICAgc3F1YXJlLmlkID0gYCR7aX0sJHtufWA7XG4gICAgICAgIH1cbiAgICB9XG59IFxuXG5mdW5jdGlvbiBwbGFjZVNoaXAoZSkge1xuICAgIGlmKHNlbGVjdGVkU2hpcCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIGxldCBjdXJyZW50ID0gZS50YXJnZXQ7XG4gICAgLy9SZW1vdmVzIHNhbWUgc2hpcCB0byByZSBpbnNlcnRcbiAgICBpZih1c2VkU2hpcHMuaW5jbHVkZXMoc2VsZWN0ZWRTaGlwWzBdKSkge1xuICAgICAgICB1c2VkU2hpcHMgPSB1c2VkU2hpcHMuZmlsdGVyKChzaGlwKSA9PiBzaGlwICE9PSBzZWxlY3RlZFNoaXBbMF0pO1xuICAgICAgICByZW1vdmVTaGlwUGxhY2VtZW50KHNlbGVjdGVkU2hpcFswXSlcbiAgICB9XG4gICAgaWYocm90YXRlICYgISgoK2N1cnJlbnQuaWRbMF0gKyBzZWxlY3RlZFNoaXBbMV0pID4gOCkpIHtcbiAgICAgICAgLy9Hb2VzIHRocm91Z2ggYm9hcmQncyBkaXYgdmVydGljYWxseVxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRTaGlwWzFdOyBpKyspe1xuICAgICAgICAgICAgLy9SZW1vdmUgc2hpcCBkdWUgdG8gYSBzaGlwIGFscmVhZHkgdGhlcmVcbiAgICAgICAgICAgIGlmKGN1cnJlbnQuY2xhc3NMaXN0Lmxlbmd0aCA+IDEpIHJldHVybiByZW1vdmVTaGlwUGxhY2VtZW50KHNlbGVjdGVkU2hpcFswXSlcbiAgICAgICAgICAgIC8vRGlzcGxheSBzaGlwIHRvIGdyaWRcbiAgICAgICAgICAgIGN1cnJlbnQuY2xhc3NMaXN0LmFkZChzZWxlY3RlZFNoaXBbMF0pO1xuICAgICAgICAgICAgaWYoaSA9PT0gc2VsZWN0ZWRTaGlwWzFdIC0gMSkgYnJlYWs7XG4gICAgICAgICAgICAvL0dvZXMgdHJvdWdoIGNvbHVtbnNcbiAgICAgICAgICAgIGZvcihsZXQgbiA9IDA7IG4gPD0gNzsgbisrKXtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdXNlZFNoaXBzLnB1c2goc2VsZWN0ZWRTaGlwWzBdKVxuICAgICB9IGVsc2UgaWYoIXJvdGF0ZSAmICEoKCtjdXJyZW50LmlkWzJdICsgc2VsZWN0ZWRTaGlwWzFdKSA+IDgpKXtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkU2hpcFsxXTsgaSsrKXtcbiAgICAgICAgICAgIC8vUmVtb3ZlIHNoaXAgZHVlIHRvIGEgc2hpcCBhbHJlYWR5IHRoZXJlXG4gICAgICAgICAgICBpZihjdXJyZW50LmNsYXNzTGlzdC5sZW5ndGggPiAxKSByZXR1cm4gcmVtb3ZlU2hpcFBsYWNlbWVudChzZWxlY3RlZFNoaXBbMF0pXG4gICAgICAgICAgICAvL0Rpc3BsYXkgc2hpcCB0byBncmlkXG4gICAgICAgICAgICBjdXJyZW50LmNsYXNzTGlzdC5hZGQoc2VsZWN0ZWRTaGlwWzBdKTtcbiAgICAgICAgICAgIGlmKGkgPT09IHNlbGVjdGVkU2hpcFsxXSAtIDEpIGJyZWFrO1xuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgICAgIHVzZWRTaGlwcy5wdXNoKHNlbGVjdGVkU2hpcFswXSlcbiAgICAgfVxuICAgICAvL1NoYWtlcyBib2FyZCBpZiBpbnZhbGlkIHBsYWNlbWVudFxuICAgICBpZighdXNlZFNoaXBzLmluY2x1ZGVzKHNlbGVjdGVkU2hpcFswXSkgJiYgcmFuZG9taXplID09PSBmYWxzZSkge1xuICAgICAgICBnYW1lQm9hcmRzWzBdLmNsYXNzTGlzdC50b2dnbGUoJ3NoYWtlJylcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7Z2FtZUJvYXJkc1swXS5jbGFzc0xpc3QudG9nZ2xlKCdzaGFrZScpfSwgMjUwKVxuICAgICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVNoaXBQbGFjZW1lbnQoc2hpcCkge1xuICAgIGlmKHNoaXAgPT09IHVuZGVmaW5lZCkgcmV0dXJuXG4gICAgZm9yKGxldCBuIGluIGdhbWVCb2FyZHNbMF0uY2hpbGRyZW4pe1xuICAgICAgICBpZihnYW1lQm9hcmRzWzBdLmNoaWxkcmVuWytuXS5jbGFzc0xpc3QuY29udGFpbnMoc2hpcCkpe1xuICAgICAgICAgICAgZ2FtZUJvYXJkc1swXS5jaGlsZHJlblsrbl0uY2xhc3NMaXN0LnJlbW92ZShzaGlwKVxuICAgICAgICB9O1xuICAgICAgICBpZigrbiA9PT0gNjMpIHJldHVybjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJldHVyblNoaXBMZW5ndGgoc2hpcE5hbWUpIHtcbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBpZihzaGlwTmFtZSA9PT0gJ2JhdHRsZXNoaXAnKSB7XG4gICAgICAgIGxlbmd0aCA9IDRcbiAgICB9IGVsc2UgaWYoc2hpcE5hbWUgPT09ICdwYXRyb2wtYm9hdCcpIHtcbiAgICAgICAgbGVuZ3RoID0gMlxuICAgIH0gZWxzZSB7XG4gICAgICAgIGxlbmd0aCA9IDNcbiAgICB9XG4gICAgcmV0dXJuIFtzaGlwTmFtZSwgbGVuZ3RoXVxufVxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkR3JpZChncmlkLCB0KSB7XG4gICAgZ2FtZUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBncmlkLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgZm9yKGxldCBuIGluIGdyaWRbaV0pe1xuICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBnYW1lQm9hcmRzW3RdLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgICAgICAgICBnYW1lQm9hcmRzW3RdLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KDY0LCAxZnIpYDtcbiAgICAgICAgICAgIGdhbWVCb2FyZHNbdF0uc3R5bGUuZ3JpZFRlbXBsYXRlUm93cyA9IGByZXBlYXQoNjQsIDFmcilgO1xuICAgICAgICAgICAgY29uc3QgYm9hcmRCb29sZWFuID0gc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCcxJyk7XG4gICAgICAgICAgICBzcXVhcmUuY2xhc3NOYW1lID0gXCJzcXVhcmVzXCI7XG4gICAgICAgICAgICBzcXVhcmUuaWQgPSBgJHtpfSwke259YFxuICAgICAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IE51bWJlcihzcXVhcmUuaWQuYXQoMCkpO1xuICAgICAgICAgICAgICAgIGxldCB5ID0gTnVtYmVyKHNxdWFyZS5pZC5hdCgyKSk7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF0dGFja1NxdWFyZSh4LCB5LCBib2FyZEJvb2xlYW4pO1xuICAgICAgICAgICAgICAgIHN0eWxlVUkoc3F1YXJlLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgIGNoYW5nZVR1cm4ocmVzdWx0KTtcbiAgICAgICAgICAgICAgICBjb21wdXRlckF0dGFjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvL0NoZWNrcyBmb3IgU2hpcCwgdG8gc2hvdyBvciBoaWRlXG4gICAgICAgICAgICBpZihncmlkW2ldW25dICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGAke2dyaWRbaV1bbl0ubmFtZX1gKVxuICAgICAgICAgICAgICAgIGlmKChnYW1lTW9kZSA9PT0gJ2NvbXB1dGVyJyAmJiBib2FyZEJvb2xlYW4gPT09IGZhbHNlKSB8fCBnYW1lTW9kZSA9PT0gJ3ZzJylcbiAgICAgICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL09ubHkgZGlzcGxheXMgb3Bwb25lbnQgYm9hcmRcbiAgICBpZihzY3JlZW5XaWR0aCkgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjInKS5jbGFzc0xpc3QudG9nZ2xlKCd0b2dnbGUnKTtcbiAgICBzY3JlZW5XaWR0aCA9IGZhbHNlXG59XG5cbmZ1bmN0aW9uIGF0dGFja1NxdWFyZSh4LCB5LCBib2FyZCl7XG4gICAgaWYob3Bwb25lbnQgPT09IHBsYXllcjEgJiYgYm9hcmQgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIG9wcG9uZW50LmdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIH0gZWxzZSBpZihib2FyZCA9PT0gZmFsc2UgJiYgb3Bwb25lbnQgPT09IHBsYXllcjIpe1xuICAgICAgICByZXR1cm4gb3Bwb25lbnQuZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjaGFuZ2VUdXJuKHJlc3VsdCkge1xuICAgIGlmKHJlc3VsdCA9PT0gJ3NhbWUgc3BvdCcpIHJldHVyblxuICAgIGlmKHJlc3VsdCA9PT0gJ2hpdCcpIHtcbiAgICAgICAgcmV0dXJuIGdhbWVTdGF0dXMoKVxuICAgIH0gZWxzZSBpZihyZXN1bHQgPT09ICdtaXNzJykge1xuICAgICAgICAob3Bwb25lbnQgPT09IHBsYXllcjEpID8gb3Bwb25lbnQgPSBwbGF5ZXIyIDogb3Bwb25lbnQgPSBwbGF5ZXIxO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmFuZG9tQ3B1UGxhY2VtZW50KHNoaXBMZW5ndGgpIHtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSByYW5kb21Db29yZGluYXRlcygpXG4gICAgbGV0IHggPSBjb29yZGluYXRlc1swXVswXTtcbiAgICBsZXQgeSA9IGNvb3JkaW5hdGVzWzBdWzFdO1xuICAgIGxldCB2ZXJ0aWNhbCA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoIC0gMTsgaSsrKXtcbiAgICAgICAgaWYodmVydGljYWwpe1xuICAgICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChbeCArPSAxLCB5XSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goW3gsIHkgKz0gMV0pXG4gICAgICAgIH1cbiAgICAgICAgaWYoeCA9PT0gOCB8fCB5ID09PSA4IHx8IHBsYXllcjIuZ2FtZUJvYXJkLmdyaWRbeF1beV0gIT09IGZhbHNlKXtcbiAgICAgICAgICAgIC8vUmVzdGFydCwgaW52YWxpZCBwb3NpdGlvblxuICAgICAgICAgICAgaSA9IC0xO1xuICAgICAgICAgICAgY29vcmRpbmF0ZXMgPSByYW5kb21Db29yZGluYXRlcygpO1xuICAgICAgICAgICAgeCA9IGNvb3JkaW5hdGVzWzBdWzBdO1xuICAgICAgICAgICAgeSA9IGNvb3JkaW5hdGVzWzBdWzFdO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzIFxufVxuXG5mdW5jdGlvbiByYW5kb21Db29yZGluYXRlcygpIHtcbiAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgd2hpbGUocGxheWVyMi5nYW1lQm9hcmQuZ3JpZFt4XVt5XSAhPT0gZmFsc2UpIHtcbiAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgfVxuICAgIHJldHVybiBbW3gseV1dXG59XG5cbmZ1bmN0aW9uIGdhbWVTdGF0dXMoKXtcbiAgICBsZXQgb3ZlciA9IG51bGw7XG4gICAgLy9DaGVja3MgZm9yIGdhbWUgb3ZlclxuICAgIGlmKG9wcG9uZW50ID09PSBwbGF5ZXIyKXtcbiAgICAgICAgb3ZlciA9IHBsYXllcjIuZ2FtZUJvYXJkLmlzQWxsU3VuaygpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3ZlciA9IHBsYXllcjEuZ2FtZUJvYXJkLmlzQWxsU3VuaygpXG4gICAgfVxuICAgIC8vU3R5bGUgYm9hcmQgYW5kIHVwZGF0ZXMgZ2FtZSBkaXNwbGF5XG4gICAgaWYob3ZlciAmJiBvcHBvbmVudCA9PT0gcGxheWVyMikge1xuICAgICAgICBiYWNrZ3JvdW5kTXVzaWMucGF1c2UoKVxuICAgICAgICBkZXN0cm95Qm9hcmQoZ2FtZUJvYXJkc1syXSlcbiAgICAgICAgZ2FtZU92ZXJEaXNwbGF5KHBsYXllcjEpXG4gICAgfSBlbHNlIGlmKG9wcG9uZW50ID09PSBwbGF5ZXIxICYmIG92ZXIpIHtcbiAgICAgICAgYmFja2dyb3VuZE11c2ljLnBhdXNlKClcbiAgICAgICAgZGVzdHJveUJvYXJkKGdhbWVCb2FyZHNbMV0pXG4gICAgICAgIGdhbWVPdmVyRGlzcGxheShwbGF5ZXIyKVxuICAgIH1cbn1cblxuZXhwb3J0IHtjcmVhdGVCb2FyZEdyaWQsIHJhbmRvbUNwdVBsYWNlbWVudCwgcGxheWVyMSwgcGxheWVyMiwgb3Bwb25lbnR9IiwiaW1wb3J0IEdhbWVCb2FyZCBmcm9tIFwiLi9nYW1lLWJvYXJkXCJcblxuY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5nYW1lQm9hcmQgPSBuZXcgR2FtZUJvYXJkO1xuICAgIH1cbn1cblxuY2xhc3MgQ29tcHV0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkID0gbmV3IEdhbWVCb2FyZDtcbiAgICB9XG59XG5cbmV4cG9ydCB7UGxheWVyLCBDb21wdXRlcn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwe1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGxlbmd0aCwgdGltZXNIaXQgPSAwLCBzdW5rID0gZmFsc2Upe1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLnRpbWVzSGl0ID0gdGltZXNIaXQ7XG4gICAgICAgIHRoaXMuc3VuayA9IHN1bmtcbiAgICB9XG4gICAgaGl0KCl7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVzSGl0ICs9IDFcbiAgICB9XG4gICAgaXNTdW5rKCl7XG4gICAgICAgIGlmKHRoaXMubGVuZ3RoID09PSB0aGlzLnRpbWVzSGl0KSB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcy5zdW5rO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBwbGF5ZXIxLCBwbGF5ZXIyLCBvcHBvbmVudCB9IGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQgaGl0IGZyb20gJy4vaGl0LWF1ZGlvLndhdic7XG5pbXBvcnQgbWlzcyBmcm9tICcuL21pc3MtYXVkaW8ubXAzJ1xuXG5jb25zdCB0dXJuRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItdHVybicpO1xuY29uc3QgaW5mb1N0YXR1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvJyk7XG5jb25zdCBoaXRBdWRpbyA9IG5ldyBBdWRpbyhoaXQpO1xuY29uc3QgbWlzc0F1ZGlvID0gbmV3IEF1ZGlvKG1pc3MpO1xubWlzc0F1ZGlvLnByZWxvYWQgPSAnYXV0byc7XG5oaXRBdWRpby5wcmVsb2FkID0gJ2F1dG8nO1xuXG5mdW5jdGlvbiBzdHlsZVVJKHNxdWFyZSwgc3RhdHVzKSB7XG4gICAgaWYoc3RhdHVzID09PSAnc2FtZSBzcG90JykgcmV0dXJuXG4gICAgaWYoc3RhdHVzID09PSAnaGl0Jykge1xuICAgICAgICBoaXRBdWRpby5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgIGhpdEF1ZGlvLnBsYXkoKVxuICAgICAgICAvL0NvbXBlbnNhdGVzIGZvciBhdWRpbyBkZWxheVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIGluZm9TdGF0dXMudGV4dENvbnRlbnQgPSBcIkF0dGFjayBhZ2FpbiFcIjtcbiAgICAgICAgICAgIHNxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3NoYWtlJyk7XG4gICAgICAgIH0sMjUwKVxuICAgICAgICAvL1JlbW92ZSBzaGFrZVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdzaGFrZScpfSwgNTAwKVxuICAgIH0gZWxzZSBpZihzdGF0dXMgPT09ICdtaXNzJykge1xuICAgICAgICBtaXNzQXVkaW8uY3VycmVudFRpbWUgPSAwO1xuICAgICAgICBtaXNzQXVkaW8ucGxheSgpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ21pc3MnKVxuICAgICAgICAgICAgaW5mb1N0YXR1cy50ZXh0Q29udGVudCA9IFwiT2ggbm8sIGEgbWlzcyFcIlxuICAgICAgICB9LCAyNTApXG4gICAgICAgIFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIChvcHBvbmVudCA9PT0gcGxheWVyMSlcbiAgICAgICAgICAgID8gdHVybkRpc3BsYXkudGV4dENvbnRlbnQgPSBcIlBsYXllciAyOlwiXG4gICAgICAgICAgICA6IHR1cm5EaXNwbGF5LnRleHRDb250ZW50ID0gXCJQbGF5ZXIgMTpcIjtcbiAgICAgICAgICAgIGluZm9TdGF0dXMudGV4dENvbnRlbnQgPSBcIkF0dGFjayFcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIxJykuY2xhc3NMaXN0LnRvZ2dsZSgndG9nZ2xlJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMicpLmNsYXNzTGlzdC50b2dnbGUoJ3RvZ2dsZScpXG4gICAgICAgIH0sIDEwNTApXG4gICAgfVxufVxuZnVuY3Rpb24gZGVzdHJveUJvYXJkKGJvYXJkKXtcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IHhMZWZ0ID0gMDtcbiAgICBsZXQgeFJpZ2h0ID0gNztcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgYm9hcmQuY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZSgnaGl0Jyk7XG4gICAgICAgICAgICBib2FyZC5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdtaXNzJyk7XG4gICAgICAgICAgICBoaXRBdWRpby5jdXJyZW50VGltZSA9IDE7XG4gICAgICAgICAgICBoaXRBdWRpby5wbGF5KCk7XG4gICAgICAgICAgICBpZihpID09PSB4TGVmdCl7XG4gICAgICAgICAgICAgICAgeExlZnQgKz0gOTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9hcmQuY2hpbGRyZW5baV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCdcbiAgICAgICAgICAgIH0gZWxzZSBpZihpID09PSB4UmlnaHQpIHtcbiAgICAgICAgICAgICAgICB4UmlnaHQgKz0gNztcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9hcmQuY2hpbGRyZW5baV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvYXJkLmNoaWxkcmVuW2ldLmlkID0gJ2dhbWUtb3Zlcic7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBpZihpID09PSA2NCkgY2xlYXJJbnRlcnZhbChpbnRlcnZhbClcbiAgICAgICAgfSwgMjApO1xuICAgIH0sIDI1MCk7XG4gICBcbn1cblxuZnVuY3Rpb24gZ2FtZU92ZXJEaXNwbGF5KHdpbm5lcikge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZih3aW5uZXIuY29uc3RydWN0b3IubmFtZSA9PT0gJ0NvbXB1dGVyJyl7XG4gICAgICAgICAgICB0dXJuRGlzcGxheS50ZXh0Q29udGVudCA9IFwiQ29tcHV0ZXI6XCJcbiAgICAgICAgICAgIGluZm9TdGF0dXMudGV4dENvbnRlbnQgPSBcIkRlZmVhdGVkIGFsbCBQbGF5ZXIgMSBzaGlwcyFcIlxuICAgICAgICB9IGVsc2UgaWYob3Bwb25lbnQgPT09IHBsYXllcjIpIHtcbiAgICAgICAgICAgIHR1cm5EaXNwbGF5LnRleHRDb250ZW50ID0gXCJQbGF5ZXIgMTpcIlxuICAgICAgICAgICAgaW5mb1N0YXR1cy50ZXh0Q29udGVudCA9IFwiRGVmZWF0ZWQgYWxsIFBsYXllciAyIHNoaXBzIVwiXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0dXJuRGlzcGxheS50ZXh0Q29udGVudCA9IFwiUGxheWVyIDI6XCJcbiAgICAgICAgICAgIGluZm9TdGF0dXMudGV4dENvbnRlbnQgPSBcIkRlZmVhdGVkIGFsbCBQbGF5ZXIgMSBzaGlwcyFcIlxuICAgICAgICB9XG4gICAgfSw1MDApIFxufVxuXG5leHBvcnQge3N0eWxlVUksIGRlc3Ryb3lCb2FyZCwgZ2FtZU92ZXJEaXNwbGF5fSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9