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
    cpu.gameBoard.placeShip(new _ship__WEBPACK_IMPORTED_MODULE_1__["default"]('destroyer', 3), (0,_index__WEBPACK_IMPORTED_MODULE_0__.randomPlacement)(3))
    cpu.gameBoard.placeShip(new _ship__WEBPACK_IMPORTED_MODULE_1__["default"]('battleship', 4), (0,_index__WEBPACK_IMPORTED_MODULE_0__.randomPlacement)(4))
    cpu.gameBoard.placeShip(new _ship__WEBPACK_IMPORTED_MODULE_1__["default"]('submarine', 3), (0,_index__WEBPACK_IMPORTED_MODULE_0__.randomPlacement)(3))
    cpu.gameBoard.placeShip(new _ship__WEBPACK_IMPORTED_MODULE_1__["default"]('patrol-boat', 2), (0,_index__WEBPACK_IMPORTED_MODULE_0__.randomPlacement)(2));
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
/* harmony export */   randomPlacement: () => (/* binding */ randomPlacement)
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

gameBoards[0].addEventListener('click', (e) => {addShipsToBoard(e)});

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

function addShipsToBoard(e) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS8uL3NyYy9jcHUuanMiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lLy4vc3JjL2dhbWUtYm9hcmQuanMiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lLy4vc3JjL3N0eWxlVUkuanMiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQge2NyZWF0ZUJvYXJkR3JpZCwgcmFuZG9tUGxhY2VtZW50LCBwbGF5ZXIxLCBwbGF5ZXIyLCBvcHBvbmVudH0gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAnO1xuXG5mdW5jdGlvbiBjcmVhdGVDcHVHcmlkKGNwdSkge1xuICAgIGNwdS5nYW1lQm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKCdkZXN0cm95ZXInLCAzKSwgcmFuZG9tUGxhY2VtZW50KDMpKVxuICAgIGNwdS5nYW1lQm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKCdiYXR0bGVzaGlwJywgNCksIHJhbmRvbVBsYWNlbWVudCg0KSlcbiAgICBjcHUuZ2FtZUJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgnc3VibWFyaW5lJywgMyksIHJhbmRvbVBsYWNlbWVudCgzKSlcbiAgICBjcHUuZ2FtZUJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgncGF0cm9sLWJvYXQnLCAyKSwgcmFuZG9tUGxhY2VtZW50KDIpKTtcbiAgICBjcmVhdGVCb2FyZEdyaWQoY3B1LmdhbWVCb2FyZC5ncmlkLCAyKVxufVxuXG5mdW5jdGlvbiBjb21wdXRlckF0dGFjaygpe1xuICAgIGlmKG9wcG9uZW50ID09PSBwbGF5ZXIxICYmIHBsYXllcjIuY29uc3RydWN0b3IubmFtZSA9PT0gXCJDb21wdXRlclwiKXtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2NCk7XG4gICAgICAgICAgICBsZXQgc3F1YXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmQnKVsxXS5jaGlsZHJlbltyYW5kb21JbmRleF07XG4gICAgICAgICAgICB3aGlsZShzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpIHx8IHNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoXCJtaXNzXCIpKSB7XG4gICAgICAgICAgICAgICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2NCk7XG4gICAgICAgICAgICAgICAgc3F1YXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmQnKVsxXS5jaGlsZHJlbltyYW5kb21JbmRleF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzcXVhcmUuY2xpY2soKVxuICAgICAgICB9LCAyMDAwKVxuICAgIH1cbn1cblxuZXhwb3J0IHtjcmVhdGVDcHVHcmlkLCBjb21wdXRlckF0dGFja30iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuZ3JpZCA9IG5ldyBBcnJheSg4KS5maWxsKG51bGwpLm1hcCgoKSA9PiBuZXcgQXJyYXkoOCkuZmlsbChmYWxzZSkpO1xuICAgIH1cbiAgICBwbGFjZVNoaXAoc2hpcCwgYXJlYSl7XG4gICAgICAgIGZvcihsZXQgbiA9IDA7IG4gPCBzaGlwLmxlbmd0aDsgbisrKXtcbiAgICAgICAgICAgIGlmKHRoaXMuZ3JpZFthcmVhW25dWzBdXVthcmVhW25dWzFdXSAhPT0gZmFsc2UpIHJldHVybiAnaW52YWxpZCBwbGFjZW1lbnQnO1xuICAgICAgICAgICAgdGhpcy5ncmlkW2FyZWFbbl1bMF1dW2FyZWFbbl1bMV1dID0gc2hpcFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcmVhXG4gICAgfVxuICAgIHJlY2VpdmVBdHRhY2soeCwgeSl7XG4gICAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLmdyaWRbeF1beV07XG4gICAgICAgIGNvbnN0IGhpdE9yTWlzcyA9IHRoaXMuYXR0YWNrTG9naWMoc2hpcCk7XG4gICAgICAgIHJldHVybiB0aGlzLmdyaWRbeF1beV0gPSBoaXRPck1pc3M7XG4gICAgfVxuICAgIGF0dGFja0xvZ2ljKGluZGV4KXtcbiAgICAgICAgaWYoaW5kZXggPT09ICdoaXQnIHx8IGluZGV4ID09PSAnbWlzcycgfHwgaW5kZXggPT09ICdzYW1lIHNwb3QnKSByZXR1cm4gJ3NhbWUgc3BvdCdcbiAgICAgICAgaWYoaW5kZXggPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXggPSAnbWlzcyc7XG4gICAgICAgIH0gZWxzZSBpZihpbmRleCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGluZGV4LmhpdCgpO1xuICAgICAgICAgICAgaW5kZXguc3VuayA9IGluZGV4LmlzU3VuaygpO1xuICAgICAgICAgICAgcmV0dXJuIGluZGV4ID0gJ2hpdCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBpc0FsbFN1bmsoKXtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZ3JpZC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBmb3IobGV0IG4gaW4gdGhpcy5ncmlkW2ldKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmdyaWRbaV1bbl0uY29uc3RydWN0b3IubmFtZSA9PT0gJ1NoaXAnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbn0iLCJpbXBvcnQge1BsYXllciwgQ29tcHV0ZXJ9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHsgc3R5bGVVSSwgZGVzdHJveUJvYXJkLCBnYW1lT3ZlckRpc3BsYXkgfSBmcm9tIFwiLi9zdHlsZVVJXCI7XG5pbXBvcnQgeyBjcmVhdGVDcHVHcmlkLCBjb21wdXRlckF0dGFjayB9IGZyb20gXCIuL2NwdVwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3N0eWxlLmNzcydcbmltcG9ydCBiYWNrZ3JvdW5kQXVkaW8gZnJvbSAnLi9iYWNrZ3JvdW5kLW11c2ljLm1wMydcblxuY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XG5jb25zdCBnYW1lTW9kZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1tb2RlJyk7XG5jb25zdCBnYW1lQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLWNvbnRhaW5lcicpXG5jb25zdCBnYW1lQm9hcmRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmQnKTtcbmNvbnN0IGJhY2tncm91bmRNdXNpYyA9IG5ldyBBdWRpbyhiYWNrZ3JvdW5kQXVkaW8pO1xuY29uc3QgcGxheWVyMSA9IG5ldyBQbGF5ZXI7XG5cbmxldCBwbGF5ZXIyO1xubGV0IGdhbWVNb2RlID0gJ251bGwnO1xubGV0IG9wcG9uZW50O1xubGV0IHNlbGVjdGVkU2hpcCA9IFtdO1xubGV0IHJvdGF0ZSA9IGZhbHNlO1xubGV0IHVzZWRTaGlwcyA9IFtdO1xubGV0IHBsYXllclBsYWNlbWVudCA9IHBsYXllcjE7XG5sZXQgc2NyZWVuV2lkdGggID0gXG53aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcblxuKHNjcmVlbldpZHRoIDwgMTE4NSkgPyBzY3JlZW5XaWR0aCA9IHRydWUgOiBzY3JlZW5XaWR0aCA9IGZhbHNlO1xuLy9DUFUgYnV0dG9uXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcHV0ZXInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBiYWNrZ3JvdW5kTXVzaWMubG9vcCA9IHRydWU7XG4gICAgYmFja2dyb3VuZE11c2ljLmxvYWQoKVxuICAgIGJhY2tncm91bmRNdXNpYy5wbGF5KClcbiAgICBwbGF5ZXIyID0gbmV3IENvbXB1dGVyO1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lTW9kZURpc3BsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQtcGxhY2VtZW50Jykuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICBnYW1lTW9kZSA9ICdjb21wdXRlcic7XG4gICAgb3Bwb25lbnQgPSBwbGF5ZXIyXG4gICAgcGxheWVyUGxhY2VtZW50R3JpZChwbGF5ZXIxKTtcbn0pO1xuLy9WUyBCdXR0b25cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52cycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGJhY2tncm91bmRNdXNpYy5sb29wID0gdHJ1ZTtcbiAgICBiYWNrZ3JvdW5kTXVzaWMubG9hZCgpXG4gICAgYmFja2dyb3VuZE11c2ljLnBsYXkoKVxuICAgIHBsYXllcjIgPSBuZXcgUGxheWVyXG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWVNb2RlRGlzcGxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC1wbGFjZW1lbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIGdhbWVNb2RlID0gJ3ZzJztcbiAgICBvcHBvbmVudCA9IHBsYXllcjJcbiAgICBwbGF5ZXJQbGFjZW1lbnRHcmlkKHBsYXllcjEpXG59KTtcbi8vU2hpcCBidXR0b25zIGZvciBwbGFjZW1lbnRcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwcyA+IGJ1dHRvbicpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIHNlbGVjdGVkU2hpcCA9IHJldHVyblNoaXBMZW5ndGgoZS50YXJnZXQuY2xhc3NMaXN0LnZhbHVlKVxuICAgIH0pXG59KTtcbi8vUm90YXRlIEJ1dHRvblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvdGF0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIChyb3RhdGUgPT09IGZhbHNlKSA/IHJvdGF0ZSA9IHRydWUgOiByb3RhdGUgPSBmYWxzZVxufSk7XG5cbmdhbWVCb2FyZHNbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge2FkZFNoaXBzVG9Cb2FyZChlKX0pO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGxldCBzdG9yYWdlID0ge1xuICAgICAgICBiYXR0bGVzaGlwOiBbXSxcbiAgICAgICAgZGVzdHJveWVyOiBbXSxcbiAgICAgICAgc3VibWFyaW5lOiBbXSxcbiAgICAgICAgJ3BhdHJvbC1ib2F0JzogW11cbiAgICB9XG4gICAgLy9BZGRzIGluZGV4IG9mIHNoaXBzIHRvIHN0b3JhZ2VcbiAgICBmb3IobGV0IGkgPSAwOyBpPCA2NDsgaSsrKSB7XG4gICAgICAgIGxldCBkaXYgPSBnYW1lQm9hcmRzWzBdLmNoaWxkcmVuW2ldXG4gICAgICAgIGlmKGRpdi5jbGFzc0xpc3QuY29udGFpbnMoJ2JhdHRsZXNoaXAnKSkge1xuICAgICAgICAgICAgc3RvcmFnZS5iYXR0bGVzaGlwLnB1c2goW2Rpdi5pZFswXSwgZGl2LmlkWzJdXSlcbiAgICAgICAgfSBlbHNlIGlmKGRpdi5jbGFzc0xpc3QuY29udGFpbnMoJ2Rlc3Ryb3llcicpKSB7XG4gICAgICAgICAgICBzdG9yYWdlLmRlc3Ryb3llci5wdXNoKFtkaXYuaWRbMF0sIGRpdi5pZFsyXV0pXG4gICAgICAgIH0gZWxzZSBpZihkaXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdzdWJtYXJpbmUnKSkge1xuICAgICAgICAgICAgc3RvcmFnZS5zdWJtYXJpbmUucHVzaChbZGl2LmlkWzBdLCBkaXYuaWRbMl1dKVxuICAgICAgICB9IGVsc2UgaWYoZGl2LmNsYXNzTGlzdC5jb250YWlucygncGF0cm9sLWJvYXQnKSkge1xuICAgICAgICAgICAgc3RvcmFnZVsncGF0cm9sLWJvYXQnXS5wdXNoKFtkaXYuaWRbMF0sIGRpdi5pZFsyXV0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9CcmVha3MgaWYgbWlzc2luZyBhIHNoaXBcbiAgICBmb3IobGV0IG4gaW4gc3RvcmFnZSl7XG4gICAgICAgIGlmKHN0b3JhZ2Vbbl0ubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgfVxuICAgIC8vSW5zZXJ0IHNoaXAgcGxhY2UgdG8gb2JqZWN0J3MgZ3JpZFxuICAgIGZvcihsZXQgbiBpbiBzdG9yYWdlKXtcbiAgICAgICAgcGxheWVyUGxhY2VtZW50LmdhbWVCb2FyZC5wbGFjZVNoaXAobmV3IFNoaXAobiwgcmV0dXJuU2hpcExlbmd0aChuKVsxXSksIHN0b3JhZ2Vbbl0pXG4gICAgfVxuICAgIGlmKGdhbWVNb2RlID09PSAnY29tcHV0ZXInKSB7XG4gICAgICAgIGNyZWF0ZUJvYXJkR3JpZChwbGF5ZXIxLmdhbWVCb2FyZC5ncmlkLCAxKVxuICAgICAgICBjcmVhdGVDcHVHcmlkKHBsYXllcjIpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQtcGxhY2VtZW50Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIH0gZWxzZSBpZiAoZ2FtZU1vZGUgPT09ICd2cycpIHtcbiAgICAgICAgaWYocGxheWVyUGxhY2VtZW50ID09PSBwbGF5ZXIxKSB7XG4gICAgICAgICAgICBwbGF5ZXJQbGFjZW1lbnRHcmlkKHBsYXllcjIpXG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIGNyZWF0ZUJvYXJkR3JpZChwbGF5ZXIxLmdhbWVCb2FyZC5ncmlkLCAxKTtcbiAgICAgICAgICAgIGNyZWF0ZUJvYXJkR3JpZChwbGF5ZXIyLmdhbWVCb2FyZC5ncmlkLCAyKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC1wbGFjZW1lbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuZnVuY3Rpb24gcGxheWVyUGxhY2VtZW50R3JpZChwbGF5ZXIpIHtcbiAgICBwbGF5ZXJQbGFjZW1lbnQgPSBwbGF5ZXI7XG4gICAgY29uc3QgcGxheWVyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItbmFtZScpO1xuICAgIChwbGF5ZXIgPT09IHBsYXllcjEpID8gcGxheWVyTmFtZS50ZXh0Q29udGVudCA9IFwiUGxheWVyIDFcIiA6IHBsYXllck5hbWUudGV4dENvbnRlbnQgPSBcIlBsYXllciAyXCI7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYXllci5nYW1lQm9hcmQuZ3JpZC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGZvcihsZXQgbiBpbiBwbGF5ZXIuZ2FtZUJvYXJkLmdyaWRbaV0pe1xuICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAvL1JlbW92ZSBwbGF5ZXIgMSBib2FyZFxuICAgICAgICAgICAgaWYocGxheWVyID09PSBwbGF5ZXIyKSBnYW1lQm9hcmRzWzBdLmNoaWxkcmVuWzBdLnJlbW92ZSgpO1xuICAgICAgICAgICAgZ2FtZUJvYXJkc1swXS5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgICAgICAgICAgZ2FtZUJvYXJkc1swXS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCg2NCwgMWZyKWA7XG4gICAgICAgICAgICBnYW1lQm9hcmRzWzBdLnN0eWxlLmdyaWRUZW1wbGF0ZVJvd3MgPSBgcmVwZWF0KDY0LCAxZnIpYDtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc05hbWUgPSBcInNxdWFyZXNcIjtcbiAgICAgICAgICAgIHNxdWFyZS5pZCA9IGAke2l9LCR7bn1gO1xuICAgICAgICB9XG4gICAgfVxufSBcblxuZnVuY3Rpb24gYWRkU2hpcHNUb0JvYXJkKGUpIHtcbiAgICBpZihzZWxlY3RlZFNoaXAgPT09IG51bGwpIHJldHVybjtcbiAgICBsZXQgY3VycmVudCA9IGUudGFyZ2V0O1xuICAgIC8vUmVtb3ZlcyBzYW1lIHNoaXAgdG8gcmUgaW5zZXJ0XG4gICAgaWYodXNlZFNoaXBzLmluY2x1ZGVzKHNlbGVjdGVkU2hpcFswXSkpIHtcbiAgICAgICAgdXNlZFNoaXBzID0gdXNlZFNoaXBzLmZpbHRlcigoc2hpcCkgPT4gc2hpcCAhPT0gc2VsZWN0ZWRTaGlwWzBdKTtcbiAgICAgICAgcmVtb3ZlU2hpcFBsYWNlbWVudChzZWxlY3RlZFNoaXBbMF0pXG4gICAgfVxuICAgIGlmKHJvdGF0ZSAmICEoKCtjdXJyZW50LmlkWzBdICsgc2VsZWN0ZWRTaGlwWzFdKSA+IDgpKSB7XG4gICAgICAgIC8vR29lcyB0aHJvdWdoIGJvYXJkJ3MgZGl2IHZlcnRpY2FsbHlcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkU2hpcFsxXTsgaSsrKXtcbiAgICAgICAgICAgIC8vUmVtb3ZlIHNoaXAgZHVlIHRvIGEgc2hpcCBhbHJlYWR5IHRoZXJlXG4gICAgICAgICAgICBpZihjdXJyZW50LmNsYXNzTGlzdC5sZW5ndGggPiAxKSByZXR1cm4gcmVtb3ZlU2hpcFBsYWNlbWVudChzZWxlY3RlZFNoaXBbMF0pXG4gICAgICAgICAgICAvL0Rpc3BsYXkgc2hpcCB0byBncmlkXG4gICAgICAgICAgICBjdXJyZW50LmNsYXNzTGlzdC5hZGQoc2VsZWN0ZWRTaGlwWzBdKTtcbiAgICAgICAgICAgIGlmKGkgPT09IHNlbGVjdGVkU2hpcFsxXSAtIDEpIGJyZWFrO1xuICAgICAgICAgICAgLy9Hb2VzIHRyb3VnaCBjb2x1bW5zXG4gICAgICAgICAgICBmb3IobGV0IG4gPSAwOyBuIDw9IDc7IG4rKyl7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHVzZWRTaGlwcy5wdXNoKHNlbGVjdGVkU2hpcFswXSlcbiAgICAgfSBlbHNlIGlmKCFyb3RhdGUgJiAhKCgrY3VycmVudC5pZFsyXSArIHNlbGVjdGVkU2hpcFsxXSkgPiA4KSl7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzZWxlY3RlZFNoaXBbMV07IGkrKyl7XG4gICAgICAgICAgICAvL1JlbW92ZSBzaGlwIGR1ZSB0byBhIHNoaXAgYWxyZWFkeSB0aGVyZVxuICAgICAgICAgICAgaWYoY3VycmVudC5jbGFzc0xpc3QubGVuZ3RoID4gMSkgcmV0dXJuIHJlbW92ZVNoaXBQbGFjZW1lbnQoc2VsZWN0ZWRTaGlwWzBdKVxuICAgICAgICAgICAgLy9EaXNwbGF5IHNoaXAgdG8gZ3JpZFxuICAgICAgICAgICAgY3VycmVudC5jbGFzc0xpc3QuYWRkKHNlbGVjdGVkU2hpcFswXSk7XG4gICAgICAgICAgICBpZihpID09PSBzZWxlY3RlZFNoaXBbMV0gLSAxKSBicmVhaztcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgfVxuICAgICAgICB1c2VkU2hpcHMucHVzaChzZWxlY3RlZFNoaXBbMF0pXG4gICAgIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU2hpcFBsYWNlbWVudChzaGlwKSB7XG4gICAgaWYoc2hpcCA9PT0gdW5kZWZpbmVkKSByZXR1cm5cbiAgICBmb3IobGV0IG4gaW4gZ2FtZUJvYXJkc1swXS5jaGlsZHJlbil7XG4gICAgICAgIGlmKGdhbWVCb2FyZHNbMF0uY2hpbGRyZW5bK25dLmNsYXNzTGlzdC5jb250YWlucyhzaGlwKSl7XG4gICAgICAgICAgICBnYW1lQm9hcmRzWzBdLmNoaWxkcmVuWytuXS5jbGFzc0xpc3QucmVtb3ZlKHNoaXApXG4gICAgICAgIH07XG4gICAgICAgIGlmKCtuID09PSA2MykgcmV0dXJuO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmV0dXJuU2hpcExlbmd0aChzaGlwTmFtZSkge1xuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGlmKHNoaXBOYW1lID09PSAnYmF0dGxlc2hpcCcpIHtcbiAgICAgICAgbGVuZ3RoID0gNFxuICAgIH0gZWxzZSBpZihzaGlwTmFtZSA9PT0gJ3BhdHJvbC1ib2F0Jykge1xuICAgICAgICBsZW5ndGggPSAyXG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGVuZ3RoID0gM1xuICAgIH1cbiAgICByZXR1cm4gW3NoaXBOYW1lLCBsZW5ndGhdXG59XG5cblxuZnVuY3Rpb24gY3JlYXRlQm9hcmRHcmlkKGdyaWQsIHQpIHtcbiAgICBnYW1lQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGdyaWQubGVuZ3RoOyBpKyspe1xuICAgICAgICBmb3IobGV0IG4gaW4gZ3JpZFtpXSl7XG4gICAgICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGdhbWVCb2FyZHNbdF0uYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICAgICAgICAgIGdhbWVCb2FyZHNbdF0uc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoNjQsIDFmcilgO1xuICAgICAgICAgICAgZ2FtZUJvYXJkc1t0XS5zdHlsZS5ncmlkVGVtcGxhdGVSb3dzID0gYHJlcGVhdCg2NCwgMWZyKWA7XG4gICAgICAgICAgICBjb25zdCBib2FyZEJvb2xlYW4gPSBzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJzEnKTtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc05hbWUgPSBcInNxdWFyZXNcIjtcbiAgICAgICAgICAgIHNxdWFyZS5pZCA9IGAke2l9LCR7bn1gXG4gICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB4ID0gTnVtYmVyKHNxdWFyZS5pZC5hdCgwKSk7XG4gICAgICAgICAgICAgICAgbGV0IHkgPSBOdW1iZXIoc3F1YXJlLmlkLmF0KDIpKTtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXR0YWNrU3F1YXJlKHgsIHksIGJvYXJkQm9vbGVhbik7XG4gICAgICAgICAgICAgICAgc3R5bGVVSShzcXVhcmUsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgY2hhbmdlVHVybihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIGNvbXB1dGVyQXR0YWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vQ2hlY2tzIGZvciBTaGlwLCB0byBzaG93IG9yIGhpZGVcbiAgICAgICAgICAgIGlmKGdyaWRbaV1bbl0gIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYCR7Z3JpZFtpXVtuXS5uYW1lfWApXG4gICAgICAgICAgICAgICAgaWYoKGdhbWVNb2RlID09PSAnY29tcHV0ZXInICYmIGJvYXJkQm9vbGVhbiA9PT0gZmFsc2UpIHx8IGdhbWVNb2RlID09PSAndnMnKVxuICAgICAgICAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vT25seSBkaXNwbGF5cyBvcHBvbmVudCBib2FyZFxuICAgIGlmKHNjcmVlbldpZHRoKSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMicpLmNsYXNzTGlzdC50b2dnbGUoJ3RvZ2dsZScpO1xuICAgIHNjcmVlbldpZHRoID0gZmFsc2Vcbn1cblxuZnVuY3Rpb24gYXR0YWNrU3F1YXJlKHgsIHksIGJvYXJkKXtcbiAgICBpZihvcHBvbmVudCA9PT0gcGxheWVyMSAmJiBib2FyZCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gb3Bwb25lbnQuZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgfSBlbHNlIGlmKGJvYXJkID09PSBmYWxzZSAmJiBvcHBvbmVudCA9PT0gcGxheWVyMil7XG4gICAgICAgIHJldHVybiBvcHBvbmVudC5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNoYW5nZVR1cm4ocmVzdWx0KSB7XG4gICAgaWYocmVzdWx0ID09PSAnc2FtZSBzcG90JykgcmV0dXJuXG4gICAgaWYocmVzdWx0ID09PSAnaGl0Jykge1xuICAgICAgICByZXR1cm4gZ2FtZVN0YXR1cygpXG4gICAgfSBlbHNlIGlmKHJlc3VsdCA9PT0gJ21pc3MnKSB7XG4gICAgICAgIChvcHBvbmVudCA9PT0gcGxheWVyMSkgPyBvcHBvbmVudCA9IHBsYXllcjIgOiBvcHBvbmVudCA9IHBsYXllcjE7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByYW5kb21QbGFjZW1lbnQoc2hpcExlbmd0aCkge1xuICAgIGxldCBjb29yZGluYXRlcyA9IHJhbmRvbUNvb3JkaW5hdGVzKClcbiAgICBsZXQgeCA9IGNvb3JkaW5hdGVzWzBdWzBdO1xuICAgIGxldCB5ID0gY29vcmRpbmF0ZXNbMF1bMV07XG4gICAgbGV0IHZlcnRpY2FsID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMSk7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGggLSAxOyBpKyspe1xuICAgICAgICBpZih2ZXJ0aWNhbCl7XG4gICAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKFt4ICs9IDEsIHldKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChbeCwgeSArPSAxXSlcbiAgICAgICAgfVxuICAgICAgICBpZih4ID09PSA4IHx8IHkgPT09IDggfHwgcGxheWVyMi5nYW1lQm9hcmQuZ3JpZFt4XVt5XSAhPT0gZmFsc2Upe1xuICAgICAgICAgICAgLy9SZXN0YXJ0LCBpbnZhbGlkIHBvc2l0aW9uXG4gICAgICAgICAgICBpID0gLTE7XG4gICAgICAgICAgICBjb29yZGluYXRlcyA9IHJhbmRvbUNvb3JkaW5hdGVzKCk7XG4gICAgICAgICAgICB4ID0gY29vcmRpbmF0ZXNbMF1bMF07XG4gICAgICAgICAgICB5ID0gY29vcmRpbmF0ZXNbMF1bMV07XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29vcmRpbmF0ZXMgXG59XG5cbmZ1bmN0aW9uIHJhbmRvbUNvb3JkaW5hdGVzKCkge1xuICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICB3aGlsZShwbGF5ZXIyLmdhbWVCb2FyZC5ncmlkW3hdW3ldICE9PSBmYWxzZSkge1xuICAgICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICB9XG4gICAgcmV0dXJuIFtbeCx5XV1cbn1cblxuZnVuY3Rpb24gZ2FtZVN0YXR1cygpe1xuICAgIGxldCBvdmVyID0gbnVsbDtcbiAgICAvL0NoZWNrcyBmb3IgZ2FtZSBvdmVyXG4gICAgaWYob3Bwb25lbnQgPT09IHBsYXllcjIpe1xuICAgICAgICBvdmVyID0gcGxheWVyMi5nYW1lQm9hcmQuaXNBbGxTdW5rKClcbiAgICB9IGVsc2Uge1xuICAgICAgICBvdmVyID0gcGxheWVyMS5nYW1lQm9hcmQuaXNBbGxTdW5rKClcbiAgICB9XG4gICAgLy9TdHlsZSBib2FyZCBhbmQgdXBkYXRlcyBnYW1lIGRpc3BsYXlcbiAgICBpZihvdmVyICYmIG9wcG9uZW50ID09PSBwbGF5ZXIyKSB7XG4gICAgICAgIGJhY2tncm91bmRNdXNpYy5wYXVzZSgpXG4gICAgICAgIGRlc3Ryb3lCb2FyZChnYW1lQm9hcmRzWzJdKVxuICAgICAgICBnYW1lT3ZlckRpc3BsYXkocGxheWVyMSlcbiAgICB9IGVsc2UgaWYob3Bwb25lbnQgPT09IHBsYXllcjEgJiYgb3Zlcikge1xuICAgICAgICBiYWNrZ3JvdW5kTXVzaWMucGF1c2UoKVxuICAgICAgICBkZXN0cm95Qm9hcmQoZ2FtZUJvYXJkc1sxXSlcbiAgICAgICAgZ2FtZU92ZXJEaXNwbGF5KHBsYXllcjIpXG4gICAgfVxufVxuXG5leHBvcnQge2NyZWF0ZUJvYXJkR3JpZCwgcmFuZG9tUGxhY2VtZW50LCBwbGF5ZXIxLCBwbGF5ZXIyLCBvcHBvbmVudH0iLCJpbXBvcnQgR2FtZUJvYXJkIGZyb20gXCIuL2dhbWUtYm9hcmRcIlxuXG5jbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmdhbWVCb2FyZCA9IG5ldyBHYW1lQm9hcmQ7XG4gICAgfVxufVxuXG5jbGFzcyBDb21wdXRlciB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5nYW1lQm9hcmQgPSBuZXcgR2FtZUJvYXJkO1xuICAgIH1cbn1cblxuZXhwb3J0IHtQbGF5ZXIsIENvbXB1dGVyfSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgbGVuZ3RoLCB0aW1lc0hpdCA9IDAsIHN1bmsgPSBmYWxzZSl7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMudGltZXNIaXQgPSB0aW1lc0hpdDtcbiAgICAgICAgdGhpcy5zdW5rID0gc3Vua1xuICAgIH1cbiAgICBoaXQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXNIaXQgKz0gMVxuICAgIH1cbiAgICBpc1N1bmsoKXtcbiAgICAgICAgaWYodGhpcy5sZW5ndGggPT09IHRoaXMudGltZXNIaXQpIHRoaXMuc3VuayA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzLnN1bms7XG4gICAgfVxufSIsImltcG9ydCB7IHBsYXllcjEsIHBsYXllcjIsIG9wcG9uZW50IH0gZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCBoaXQgZnJvbSAnLi9oaXQtYXVkaW8ud2F2JztcbmltcG9ydCBtaXNzIGZyb20gJy4vbWlzcy1hdWRpby5tcDMnXG5cbmNvbnN0IHR1cm5EaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci10dXJuJyk7XG5jb25zdCBpbmZvU3RhdHVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8nKTtcbmNvbnN0IGhpdEF1ZGlvID0gbmV3IEF1ZGlvKGhpdCk7XG5jb25zdCBtaXNzQXVkaW8gPSBuZXcgQXVkaW8obWlzcyk7XG5taXNzQXVkaW8ucHJlbG9hZCA9ICdhdXRvJztcbmhpdEF1ZGlvLnByZWxvYWQgPSAnYXV0byc7XG5cbmZ1bmN0aW9uIHN0eWxlVUkoc3F1YXJlLCBzdGF0dXMpIHtcbiAgICBpZihzdGF0dXMgPT09ICdzYW1lIHNwb3QnKSByZXR1cm5cbiAgICBpZihzdGF0dXMgPT09ICdoaXQnKSB7XG4gICAgICAgIGhpdEF1ZGlvLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgaGl0QXVkaW8ucGxheSgpXG4gICAgICAgIC8vQ29tcGVuc2F0ZXMgZm9yIGF1ZGlvIGRlbGF5XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICAgICAgaW5mb1N0YXR1cy50ZXh0Q29udGVudCA9IFwiQXR0YWNrIGFnYWluIVwiO1xuICAgICAgICAgICAgc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnc2hha2UnKTtcbiAgICAgICAgfSwyNTApXG4gICAgICAgIC8vUmVtb3ZlIHNoYWtlXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge3NxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3NoYWtlJyl9LCA1MDApXG4gICAgfSBlbHNlIGlmKHN0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgIG1pc3NBdWRpby5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgIG1pc3NBdWRpby5wbGF5KClcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnbWlzcycpXG4gICAgICAgICAgICBpbmZvU3RhdHVzLnRleHRDb250ZW50ID0gXCJPaCBubywgYSBtaXNzIVwiXG4gICAgICAgIH0sIDI1MClcbiAgICAgICAgXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgKG9wcG9uZW50ID09PSBwbGF5ZXIxKVxuICAgICAgICAgICAgPyB0dXJuRGlzcGxheS50ZXh0Q29udGVudCA9IFwiUGxheWVyIDI6XCJcbiAgICAgICAgICAgIDogdHVybkRpc3BsYXkudGV4dENvbnRlbnQgPSBcIlBsYXllciAxOlwiO1xuICAgICAgICAgICAgaW5mb1N0YXR1cy50ZXh0Q29udGVudCA9IFwiQXR0YWNrIVwiO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjEnKS5jbGFzc0xpc3QudG9nZ2xlKCd0b2dnbGUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyJykuY2xhc3NMaXN0LnRvZ2dsZSgndG9nZ2xlJylcbiAgICAgICAgfSwgMTA1MClcbiAgICB9XG59XG5mdW5jdGlvbiBkZXN0cm95Qm9hcmQoYm9hcmQpe1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgeExlZnQgPSAwO1xuICAgIGxldCB4UmlnaHQgPSA3O1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBib2FyZC5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdoaXQnKTtcbiAgICAgICAgICAgIGJvYXJkLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ21pc3MnKTtcbiAgICAgICAgICAgIGhpdEF1ZGlvLmN1cnJlbnRUaW1lID0gMTtcbiAgICAgICAgICAgIGhpdEF1ZGlvLnBsYXkoKTtcbiAgICAgICAgICAgIGlmKGkgPT09IHhMZWZ0KXtcbiAgICAgICAgICAgICAgICB4TGVmdCArPSA5O1xuICAgICAgICAgICAgICAgIHJldHVybiBib2FyZC5jaGlsZHJlbltpXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJ1xuICAgICAgICAgICAgfSBlbHNlIGlmKGkgPT09IHhSaWdodCkge1xuICAgICAgICAgICAgICAgIHhSaWdodCArPSA3O1xuICAgICAgICAgICAgICAgIHJldHVybiBib2FyZC5jaGlsZHJlbltpXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9hcmQuY2hpbGRyZW5baV0uaWQgPSAnZ2FtZS1vdmVyJztcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGlmKGkgPT09IDY0KSBjbGVhckludGVydmFsKGludGVydmFsKVxuICAgICAgICB9LCAyMCk7XG4gICAgfSwgMjUwKTtcbiAgIFxufVxuXG5mdW5jdGlvbiBnYW1lT3ZlckRpc3BsYXkod2lubmVyKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmKHdpbm5lci5jb25zdHJ1Y3Rvci5uYW1lID09PSAnQ29tcHV0ZXInKXtcbiAgICAgICAgICAgIHR1cm5EaXNwbGF5LnRleHRDb250ZW50ID0gXCJDb21wdXRlcjpcIlxuICAgICAgICAgICAgaW5mb1N0YXR1cy50ZXh0Q29udGVudCA9IFwiRGVmZWF0ZWQgYWxsIFBsYXllciAxIHNoaXBzIVwiXG4gICAgICAgIH0gZWxzZSBpZihvcHBvbmVudCA9PT0gcGxheWVyMikge1xuICAgICAgICAgICAgdHVybkRpc3BsYXkudGV4dENvbnRlbnQgPSBcIlBsYXllciAxOlwiXG4gICAgICAgICAgICBpbmZvU3RhdHVzLnRleHRDb250ZW50ID0gXCJEZWZlYXRlZCBhbGwgUGxheWVyIDIgc2hpcHMhXCJcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHR1cm5EaXNwbGF5LnRleHRDb250ZW50ID0gXCJQbGF5ZXIgMjpcIlxuICAgICAgICAgICAgaW5mb1N0YXR1cy50ZXh0Q29udGVudCA9IFwiRGVmZWF0ZWQgYWxsIFBsYXllciAxIHNoaXBzIVwiXG4gICAgICAgIH1cbiAgICB9LDUwMCkgXG59XG5cbmV4cG9ydCB7c3R5bGVVSSwgZGVzdHJveUJvYXJkLCBnYW1lT3ZlckRpc3BsYXl9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgKCFzY3JpcHRVcmwgfHwgIS9eaHR0cChzPyk6Ly50ZXN0KHNjcmlwdFVybCkpKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=