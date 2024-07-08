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
        }, 1900)
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






const overlay = document.querySelector('.overlay');
const gameModeDisplay = document.querySelector('.game-mode');
const gameContainer = document.querySelector('.board-container')
const gameBoards = document.getElementsByClassName('board');
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
        (0,_styleUI__WEBPACK_IMPORTED_MODULE_2__.destroyBoard)(gameBoards[2])
        ;(0,_styleUI__WEBPACK_IMPORTED_MODULE_2__.gameOverDisplay)(player1)
    } else if(opponent === player1 && over) {
        (0,_styleUI__WEBPACK_IMPORTED_MODULE_2__.destroyBoard)(gameBoards[1])
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



const turnDisplay = document.querySelector('.player-turn');
const infoStatus = document.querySelector('.info');
const hitAudio = new Audio(_hit_audio_wav__WEBPACK_IMPORTED_MODULE_1__);
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
        square.classList.add('miss')
        infoStatus.textContent = "Oh no, a miss!"
        setTimeout(() => {
            (_index__WEBPACK_IMPORTED_MODULE_0__.opponent === _index__WEBPACK_IMPORTED_MODULE_0__.player1)
            ? turnDisplay.textContent = "Player 2:"
            : turnDisplay.textContent = "Player 1:";
            infoStatus.textContent = "Attack!";
            document.querySelector('.player1').classList.toggle('toggle');
            document.querySelector('.player2').classList.toggle('toggle')
        }, 900)
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
            board.classList.toggle('toggle')
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
}




/***/ }),

/***/ "./src/hit-audio.wav":
/*!***************************!*\
  !*** ./src/hit-audio.wav ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "84caba8eb3442457431e.wav";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGFBQWEsNENBQVEsS0FBSywyQ0FBTztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sUUFBUSw0Q0FBUSxLQUFLLDJDQUFPO0FBQ2xDO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRStDOzs7Ozs7Ozs7Ozs7Ozs7OztVQzFFL0M7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1VFbEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQmF0dGxlc2hpcC1HYW1lLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvLi9zcmMvY3B1LmpzIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS8uL3NyYy9nYW1lLWJvYXJkLmpzIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS8uL3NyYy9zdHlsZVVJLmpzIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9CYXR0bGVzaGlwLUdhbWUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL0JhdHRsZXNoaXAtR2FtZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHtjcmVhdGVCb2FyZEdyaWQsIHJhbmRvbVBsYWNlbWVudCwgcGxheWVyMSwgcGxheWVyMiwgb3Bwb25lbnR9IGZyb20gJy4vaW5kZXgnO1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcblxuZnVuY3Rpb24gY3JlYXRlQ3B1R3JpZChjcHUpIHtcbiAgICBjcHUuZ2FtZUJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgnZGVzdHJveWVyJywgMyksIHJhbmRvbVBsYWNlbWVudCgzKSlcbiAgICBjcHUuZ2FtZUJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgnYmF0dGxlc2hpcCcsIDQpLCByYW5kb21QbGFjZW1lbnQoNCkpXG4gICAgY3B1LmdhbWVCb2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoJ3N1Ym1hcmluZScsIDMpLCByYW5kb21QbGFjZW1lbnQoMykpXG4gICAgY3B1LmdhbWVCb2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoJ3BhdHJvbC1ib2F0JywgMiksIHJhbmRvbVBsYWNlbWVudCgyKSk7XG4gICAgY3JlYXRlQm9hcmRHcmlkKGNwdS5nYW1lQm9hcmQuZ3JpZCwgMilcbn1cblxuZnVuY3Rpb24gY29tcHV0ZXJBdHRhY2soKXtcbiAgICBpZihvcHBvbmVudCA9PT0gcGxheWVyMSAmJiBwbGF5ZXIyLmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiQ29tcHV0ZXJcIil7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNjQpO1xuICAgICAgICAgICAgbGV0IHNxdWFyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvYXJkJylbMV0uY2hpbGRyZW5bcmFuZG9tSW5kZXhdO1xuICAgICAgICAgICAgd2hpbGUoc3F1YXJlLmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSB8fCBzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwibWlzc1wiKSkge1xuICAgICAgICAgICAgICAgIHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNjQpO1xuICAgICAgICAgICAgICAgIHNxdWFyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvYXJkJylbMV0uY2hpbGRyZW5bcmFuZG9tSW5kZXhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3F1YXJlLmNsaWNrKClcbiAgICAgICAgfSwgMTkwMClcbiAgICB9XG59XG5cbmV4cG9ydCB7Y3JlYXRlQ3B1R3JpZCwgY29tcHV0ZXJBdHRhY2t9IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUJvYXJkIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmdyaWQgPSBuZXcgQXJyYXkoOCkuZmlsbChudWxsKS5tYXAoKCkgPT4gbmV3IEFycmF5KDgpLmZpbGwoZmFsc2UpKTtcbiAgICB9XG4gICAgcGxhY2VTaGlwKHNoaXAsIGFyZWEpe1xuICAgICAgICBmb3IobGV0IG4gPSAwOyBuIDwgc2hpcC5sZW5ndGg7IG4rKyl7XG4gICAgICAgICAgICBpZih0aGlzLmdyaWRbYXJlYVtuXVswXV1bYXJlYVtuXVsxXV0gIT09IGZhbHNlKSByZXR1cm4gJ2ludmFsaWQgcGxhY2VtZW50JztcbiAgICAgICAgICAgIHRoaXMuZ3JpZFthcmVhW25dWzBdXVthcmVhW25dWzFdXSA9IHNoaXBcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJlYVxuICAgIH1cbiAgICByZWNlaXZlQXR0YWNrKHgsIHkpe1xuICAgICAgICBjb25zdCBzaGlwID0gdGhpcy5ncmlkW3hdW3ldO1xuICAgICAgICBjb25zdCBoaXRPck1pc3MgPSB0aGlzLmF0dGFja0xvZ2ljKHNoaXApO1xuICAgICAgICByZXR1cm4gdGhpcy5ncmlkW3hdW3ldID0gaGl0T3JNaXNzO1xuICAgIH1cbiAgICBhdHRhY2tMb2dpYyhpbmRleCl7XG4gICAgICAgIGlmKGluZGV4ID09PSAnaGl0JyB8fCBpbmRleCA9PT0gJ21pc3MnIHx8IGluZGV4ID09PSAnc2FtZSBzcG90JykgcmV0dXJuICdzYW1lIHNwb3QnXG4gICAgICAgIGlmKGluZGV4ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGluZGV4ID0gJ21pc3MnO1xuICAgICAgICB9IGVsc2UgaWYoaW5kZXggIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpbmRleC5oaXQoKTtcbiAgICAgICAgICAgIGluZGV4LnN1bmsgPSBpbmRleC5pc1N1bmsoKTtcbiAgICAgICAgICAgIHJldHVybiBpbmRleCA9ICdoaXQnXG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNBbGxTdW5rKCl7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdyaWQubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgZm9yKGxldCBuIGluIHRoaXMuZ3JpZFtpXSl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5ncmlkW2ldW25dLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdTaGlwJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG59IiwiaW1wb3J0IHtQbGF5ZXIsIENvbXB1dGVyfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcbmltcG9ydCB7IHN0eWxlVUksIGRlc3Ryb3lCb2FyZCwgZ2FtZU92ZXJEaXNwbGF5IH0gZnJvbSBcIi4vc3R5bGVVSVwiO1xuaW1wb3J0IHsgY3JlYXRlQ3B1R3JpZCwgY29tcHV0ZXJBdHRhY2sgfSBmcm9tIFwiLi9jcHVcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9zdHlsZS5jc3MnXG5cbmNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpO1xuY29uc3QgZ2FtZU1vZGVEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtbW9kZScpO1xuY29uc3QgZ2FtZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC1jb250YWluZXInKVxuY29uc3QgZ2FtZUJvYXJkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvYXJkJyk7XG5jb25zdCBwbGF5ZXIxID0gbmV3IFBsYXllcjtcblxubGV0IHBsYXllcjI7XG5sZXQgZ2FtZU1vZGUgPSAnbnVsbCc7XG5sZXQgb3Bwb25lbnQ7XG5sZXQgc2VsZWN0ZWRTaGlwID0gW107XG5sZXQgcm90YXRlID0gZmFsc2U7XG5sZXQgdXNlZFNoaXBzID0gW107XG5sZXQgcGxheWVyUGxhY2VtZW50ID0gcGxheWVyMTtcbmxldCBzY3JlZW5XaWR0aCAgPSBcbndpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuXG4oc2NyZWVuV2lkdGggPCAxMTg1KSA/IHNjcmVlbldpZHRoID0gdHJ1ZSA6IHNjcmVlbldpZHRoID0gZmFsc2U7XG4vL0NQVSBidXR0b25cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wdXRlcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHBsYXllcjIgPSBuZXcgQ29tcHV0ZXI7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWVNb2RlRGlzcGxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC1wbGFjZW1lbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIGdhbWVNb2RlID0gJ2NvbXB1dGVyJztcbiAgICBvcHBvbmVudCA9IHBsYXllcjJcbiAgICBwbGF5ZXJQbGFjZW1lbnRHcmlkKHBsYXllcjEpO1xufSk7XG4vL1ZTIEJ1dHRvblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcGxheWVyMiA9IG5ldyBQbGF5ZXJcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZU1vZGVEaXNwbGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLXBsYWNlbWVudCcpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgZ2FtZU1vZGUgPSAndnMnO1xuICAgIG9wcG9uZW50ID0gcGxheWVyMlxuICAgIHBsYXllclBsYWNlbWVudEdyaWQocGxheWVyMSlcbn0pO1xuLy9TaGlwIGJ1dHRvbnMgZm9yIHBsYWNlbWVudFxuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXBzID4gYnV0dG9uJykuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgc2VsZWN0ZWRTaGlwID0gcmV0dXJuU2hpcExlbmd0aChlLnRhcmdldC5jbGFzc0xpc3QudmFsdWUpXG4gICAgfSlcbn0pO1xuLy9Sb3RhdGUgQnV0dG9uXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm90YXRlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgKHJvdGF0ZSA9PT0gZmFsc2UpID8gcm90YXRlID0gdHJ1ZSA6IHJvdGF0ZSA9IGZhbHNlXG59KTtcblxuZ2FtZUJvYXJkc1swXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7YWRkU2hpcHNUb0JvYXJkKGUpfSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbGV0IHN0b3JhZ2UgPSB7XG4gICAgICAgIGJhdHRsZXNoaXA6IFtdLFxuICAgICAgICBkZXN0cm95ZXI6IFtdLFxuICAgICAgICBzdWJtYXJpbmU6IFtdLFxuICAgICAgICAncGF0cm9sLWJvYXQnOiBbXVxuICAgIH1cbiAgICAvL0FkZHMgaW5kZXggb2Ygc2hpcHMgdG8gc3RvcmFnZVxuICAgIGZvcihsZXQgaSA9IDA7IGk8IDY0OyBpKyspIHtcbiAgICAgICAgbGV0IGRpdiA9IGdhbWVCb2FyZHNbMF0uY2hpbGRyZW5baV1cbiAgICAgICAgaWYoZGl2LmNsYXNzTGlzdC5jb250YWlucygnYmF0dGxlc2hpcCcpKSB7XG4gICAgICAgICAgICBzdG9yYWdlLmJhdHRsZXNoaXAucHVzaChbZGl2LmlkWzBdLCBkaXYuaWRbMl1dKVxuICAgICAgICB9IGVsc2UgaWYoZGl2LmNsYXNzTGlzdC5jb250YWlucygnZGVzdHJveWVyJykpIHtcbiAgICAgICAgICAgIHN0b3JhZ2UuZGVzdHJveWVyLnB1c2goW2Rpdi5pZFswXSwgZGl2LmlkWzJdXSlcbiAgICAgICAgfSBlbHNlIGlmKGRpdi5jbGFzc0xpc3QuY29udGFpbnMoJ3N1Ym1hcmluZScpKSB7XG4gICAgICAgICAgICBzdG9yYWdlLnN1Ym1hcmluZS5wdXNoKFtkaXYuaWRbMF0sIGRpdi5pZFsyXV0pXG4gICAgICAgIH0gZWxzZSBpZihkaXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYXRyb2wtYm9hdCcpKSB7XG4gICAgICAgICAgICBzdG9yYWdlWydwYXRyb2wtYm9hdCddLnB1c2goW2Rpdi5pZFswXSwgZGl2LmlkWzJdXSlcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL0JyZWFrcyBpZiBtaXNzaW5nIGEgc2hpcFxuICAgIGZvcihsZXQgbiBpbiBzdG9yYWdlKXtcbiAgICAgICAgaWYoc3RvcmFnZVtuXS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICB9XG4gICAgLy9JbnNlcnQgc2hpcCBwbGFjZSB0byBvYmplY3QncyBncmlkXG4gICAgZm9yKGxldCBuIGluIHN0b3JhZ2Upe1xuICAgICAgICBwbGF5ZXJQbGFjZW1lbnQuZ2FtZUJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcChuLCByZXR1cm5TaGlwTGVuZ3RoKG4pWzFdKSwgc3RvcmFnZVtuXSlcbiAgICB9XG4gICAgaWYoZ2FtZU1vZGUgPT09ICdjb21wdXRlcicpIHtcbiAgICAgICAgY3JlYXRlQm9hcmRHcmlkKHBsYXllcjEuZ2FtZUJvYXJkLmdyaWQsIDEpXG4gICAgICAgIGNyZWF0ZUNwdUdyaWQocGxheWVyMik7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC1wbGFjZW1lbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgfSBlbHNlIGlmIChnYW1lTW9kZSA9PT0gJ3ZzJykge1xuICAgICAgICBpZihwbGF5ZXJQbGFjZW1lbnQgPT09IHBsYXllcjEpIHtcbiAgICAgICAgICAgIHBsYXllclBsYWNlbWVudEdyaWQocGxheWVyMilcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgY3JlYXRlQm9hcmRHcmlkKHBsYXllcjEuZ2FtZUJvYXJkLmdyaWQsIDEpO1xuICAgICAgICAgICAgY3JlYXRlQm9hcmRHcmlkKHBsYXllcjIuZ2FtZUJvYXJkLmdyaWQsIDIpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLXBsYWNlbWVudCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiBwbGF5ZXJQbGFjZW1lbnRHcmlkKHBsYXllcikge1xuICAgIHBsYXllclBsYWNlbWVudCA9IHBsYXllcjtcbiAgICBjb25zdCBwbGF5ZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1uYW1lJyk7XG4gICAgKHBsYXllciA9PT0gcGxheWVyMSkgPyBwbGF5ZXJOYW1lLnRleHRDb250ZW50ID0gXCJQbGF5ZXIgMVwiIDogcGxheWVyTmFtZS50ZXh0Q29udGVudCA9IFwiUGxheWVyIDJcIjtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWVyLmdhbWVCb2FyZC5ncmlkLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgZm9yKGxldCBuIGluIHBsYXllci5nYW1lQm9hcmQuZ3JpZFtpXSl7XG4gICAgICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIC8vUmVtb3ZlIHBsYXllciAxIGJvYXJkXG4gICAgICAgICAgICBpZihwbGF5ZXIgPT09IHBsYXllcjIpIGdhbWVCb2FyZHNbMF0uY2hpbGRyZW5bMF0ucmVtb3ZlKCk7XG4gICAgICAgICAgICBnYW1lQm9hcmRzWzBdLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgICAgICAgICBnYW1lQm9hcmRzWzBdLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KDY0LCAxZnIpYDtcbiAgICAgICAgICAgIGdhbWVCb2FyZHNbMF0uc3R5bGUuZ3JpZFRlbXBsYXRlUm93cyA9IGByZXBlYXQoNjQsIDFmcilgO1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTmFtZSA9IFwic3F1YXJlc1wiO1xuICAgICAgICAgICAgc3F1YXJlLmlkID0gYCR7aX0sJHtufWA7XG4gICAgICAgIH1cbiAgICB9XG59IFxuXG5mdW5jdGlvbiBhZGRTaGlwc1RvQm9hcmQoZSkge1xuICAgIGlmKHNlbGVjdGVkU2hpcCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIGxldCBjdXJyZW50ID0gZS50YXJnZXQ7XG4gICAgLy9SZW1vdmVzIHNhbWUgc2hpcCB0byByZSBpbnNlcnRcbiAgICBpZih1c2VkU2hpcHMuaW5jbHVkZXMoc2VsZWN0ZWRTaGlwWzBdKSkge1xuICAgICAgICB1c2VkU2hpcHMgPSB1c2VkU2hpcHMuZmlsdGVyKChzaGlwKSA9PiBzaGlwICE9PSBzZWxlY3RlZFNoaXBbMF0pO1xuICAgICAgICByZW1vdmVTaGlwUGxhY2VtZW50KHNlbGVjdGVkU2hpcFswXSlcbiAgICB9XG4gICAgaWYocm90YXRlICYgISgoK2N1cnJlbnQuaWRbMF0gKyBzZWxlY3RlZFNoaXBbMV0pID4gOCkpIHtcbiAgICAgICAgLy9Hb2VzIHRocm91Z2ggYm9hcmQncyBkaXYgdmVydGljYWxseVxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRTaGlwWzFdOyBpKyspe1xuICAgICAgICAgICAgLy9SZW1vdmUgc2hpcCBkdWUgdG8gYSBzaGlwIGFscmVhZHkgdGhlcmVcbiAgICAgICAgICAgIGlmKGN1cnJlbnQuY2xhc3NMaXN0Lmxlbmd0aCA+IDEpIHJldHVybiByZW1vdmVTaGlwUGxhY2VtZW50KHNlbGVjdGVkU2hpcFswXSlcbiAgICAgICAgICAgIC8vRGlzcGxheSBzaGlwIHRvIGdyaWRcbiAgICAgICAgICAgIGN1cnJlbnQuY2xhc3NMaXN0LmFkZChzZWxlY3RlZFNoaXBbMF0pO1xuICAgICAgICAgICAgaWYoaSA9PT0gc2VsZWN0ZWRTaGlwWzFdIC0gMSkgYnJlYWs7XG4gICAgICAgICAgICAvL0dvZXMgdHJvdWdoIGNvbHVtbnNcbiAgICAgICAgICAgIGZvcihsZXQgbiA9IDA7IG4gPD0gNzsgbisrKXtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdXNlZFNoaXBzLnB1c2goc2VsZWN0ZWRTaGlwWzBdKVxuICAgICB9IGVsc2UgaWYoIXJvdGF0ZSAmICEoKCtjdXJyZW50LmlkWzJdICsgc2VsZWN0ZWRTaGlwWzFdKSA+IDgpKXtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkU2hpcFsxXTsgaSsrKXtcbiAgICAgICAgICAgIC8vUmVtb3ZlIHNoaXAgZHVlIHRvIGEgc2hpcCBhbHJlYWR5IHRoZXJlXG4gICAgICAgICAgICBpZihjdXJyZW50LmNsYXNzTGlzdC5sZW5ndGggPiAxKSByZXR1cm4gcmVtb3ZlU2hpcFBsYWNlbWVudChzZWxlY3RlZFNoaXBbMF0pXG4gICAgICAgICAgICAvL0Rpc3BsYXkgc2hpcCB0byBncmlkXG4gICAgICAgICAgICBjdXJyZW50LmNsYXNzTGlzdC5hZGQoc2VsZWN0ZWRTaGlwWzBdKTtcbiAgICAgICAgICAgIGlmKGkgPT09IHNlbGVjdGVkU2hpcFsxXSAtIDEpIGJyZWFrO1xuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgICAgIHVzZWRTaGlwcy5wdXNoKHNlbGVjdGVkU2hpcFswXSlcbiAgICAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVTaGlwUGxhY2VtZW50KHNoaXApIHtcbiAgICBpZihzaGlwID09PSB1bmRlZmluZWQpIHJldHVyblxuICAgIGZvcihsZXQgbiBpbiBnYW1lQm9hcmRzWzBdLmNoaWxkcmVuKXtcbiAgICAgICAgaWYoZ2FtZUJvYXJkc1swXS5jaGlsZHJlblsrbl0uY2xhc3NMaXN0LmNvbnRhaW5zKHNoaXApKXtcbiAgICAgICAgICAgIGdhbWVCb2FyZHNbMF0uY2hpbGRyZW5bK25dLmNsYXNzTGlzdC5yZW1vdmUoc2hpcClcbiAgICAgICAgfTtcbiAgICAgICAgaWYoK24gPT09IDYzKSByZXR1cm47XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZXR1cm5TaGlwTGVuZ3RoKHNoaXBOYW1lKSB7XG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgaWYoc2hpcE5hbWUgPT09ICdiYXR0bGVzaGlwJykge1xuICAgICAgICBsZW5ndGggPSA0XG4gICAgfSBlbHNlIGlmKHNoaXBOYW1lID09PSAncGF0cm9sLWJvYXQnKSB7XG4gICAgICAgIGxlbmd0aCA9IDJcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZW5ndGggPSAzXG4gICAgfVxuICAgIHJldHVybiBbc2hpcE5hbWUsIGxlbmd0aF1cbn1cblxuXG5mdW5jdGlvbiBjcmVhdGVCb2FyZEdyaWQoZ3JpZCwgdCkge1xuICAgIGdhbWVDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZ3JpZC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGZvcihsZXQgbiBpbiBncmlkW2ldKXtcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZ2FtZUJvYXJkc1t0XS5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgICAgICAgICAgZ2FtZUJvYXJkc1t0XS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCg2NCwgMWZyKWA7XG4gICAgICAgICAgICBnYW1lQm9hcmRzW3RdLnN0eWxlLmdyaWRUZW1wbGF0ZVJvd3MgPSBgcmVwZWF0KDY0LCAxZnIpYDtcbiAgICAgICAgICAgIGNvbnN0IGJvYXJkQm9vbGVhbiA9IHNxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnMScpO1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTmFtZSA9IFwic3F1YXJlc1wiO1xuICAgICAgICAgICAgc3F1YXJlLmlkID0gYCR7aX0sJHtufWBcbiAgICAgICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHggPSBOdW1iZXIoc3F1YXJlLmlkLmF0KDApKTtcbiAgICAgICAgICAgICAgICBsZXQgeSA9IE51bWJlcihzcXVhcmUuaWQuYXQoMikpO1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBhdHRhY2tTcXVhcmUoeCwgeSwgYm9hcmRCb29sZWFuKTtcbiAgICAgICAgICAgICAgICBzdHlsZVVJKHNxdWFyZSwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VUdXJuKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgY29tcHV0ZXJBdHRhY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy9DaGVja3MgZm9yIFNoaXAsIHRvIHNob3cgb3IgaGlkZVxuICAgICAgICAgICAgaWYoZ3JpZFtpXVtuXSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChgJHtncmlkW2ldW25dLm5hbWV9YClcbiAgICAgICAgICAgICAgICBpZigoZ2FtZU1vZGUgPT09ICdjb21wdXRlcicgJiYgYm9hcmRCb29sZWFuID09PSBmYWxzZSkgfHwgZ2FtZU1vZGUgPT09ICd2cycpXG4gICAgICAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9Pbmx5IGRpc3BsYXlzIG9wcG9uZW50IGJvYXJkXG4gICAgaWYoc2NyZWVuV2lkdGgpIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyJykuY2xhc3NMaXN0LnRvZ2dsZSgndG9nZ2xlJyk7XG4gICAgc2NyZWVuV2lkdGggPSBmYWxzZVxufVxuXG5mdW5jdGlvbiBhdHRhY2tTcXVhcmUoeCwgeSwgYm9hcmQpe1xuICAgIGlmKG9wcG9uZW50ID09PSBwbGF5ZXIxICYmIGJvYXJkID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBvcHBvbmVudC5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9IGVsc2UgaWYoYm9hcmQgPT09IGZhbHNlICYmIG9wcG9uZW50ID09PSBwbGF5ZXIyKXtcbiAgICAgICAgcmV0dXJuIG9wcG9uZW50LmdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY2hhbmdlVHVybihyZXN1bHQpIHtcbiAgICBpZihyZXN1bHQgPT09ICdzYW1lIHNwb3QnKSByZXR1cm5cbiAgICBpZihyZXN1bHQgPT09ICdoaXQnKSB7XG4gICAgICAgIHJldHVybiBnYW1lU3RhdHVzKClcbiAgICB9IGVsc2UgaWYocmVzdWx0ID09PSAnbWlzcycpIHtcbiAgICAgICAgKG9wcG9uZW50ID09PSBwbGF5ZXIxKSA/IG9wcG9uZW50ID0gcGxheWVyMiA6IG9wcG9uZW50ID0gcGxheWVyMTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJhbmRvbVBsYWNlbWVudChzaGlwTGVuZ3RoKSB7XG4gICAgbGV0IGNvb3JkaW5hdGVzID0gcmFuZG9tQ29vcmRpbmF0ZXMoKVxuICAgIGxldCB4ID0gY29vcmRpbmF0ZXNbMF1bMF07XG4gICAgbGV0IHkgPSBjb29yZGluYXRlc1swXVsxXTtcbiAgICBsZXQgdmVydGljYWwgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aCAtIDE7IGkrKyl7XG4gICAgICAgIGlmKHZlcnRpY2FsKXtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goW3ggKz0gMSwgeV0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKFt4LCB5ICs9IDFdKVxuICAgICAgICB9XG4gICAgICAgIGlmKHggPT09IDggfHwgeSA9PT0gOCB8fCBwbGF5ZXIyLmdhbWVCb2FyZC5ncmlkW3hdW3ldICE9PSBmYWxzZSl7XG4gICAgICAgICAgICAvL1Jlc3RhcnQsIGludmFsaWQgcG9zaXRpb25cbiAgICAgICAgICAgIGkgPSAtMTtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzID0gcmFuZG9tQ29vcmRpbmF0ZXMoKTtcbiAgICAgICAgICAgIHggPSBjb29yZGluYXRlc1swXVswXTtcbiAgICAgICAgICAgIHkgPSBjb29yZGluYXRlc1swXVsxXTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb29yZGluYXRlcyBcbn1cblxuZnVuY3Rpb24gcmFuZG9tQ29vcmRpbmF0ZXMoKSB7XG4gICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgIHdoaWxlKHBsYXllcjIuZ2FtZUJvYXJkLmdyaWRbeF1beV0gIT09IGZhbHNlKSB7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgIH1cbiAgICByZXR1cm4gW1t4LHldXVxufVxuXG5mdW5jdGlvbiBnYW1lU3RhdHVzKCl7XG4gICAgbGV0IG92ZXIgPSBudWxsO1xuICAgIC8vQ2hlY2tzIGZvciBnYW1lIG92ZXJcbiAgICBpZihvcHBvbmVudCA9PT0gcGxheWVyMil7XG4gICAgICAgIG92ZXIgPSBwbGF5ZXIyLmdhbWVCb2FyZC5pc0FsbFN1bmsoKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIG92ZXIgPSBwbGF5ZXIxLmdhbWVCb2FyZC5pc0FsbFN1bmsoKVxuICAgIH1cbiAgICAvL1N0eWxlIGJvYXJkIGFuZCB1cGRhdGVzIGdhbWUgZGlzcGxheVxuICAgIGlmKG92ZXIgJiYgb3Bwb25lbnQgPT09IHBsYXllcjIpIHtcbiAgICAgICAgZGVzdHJveUJvYXJkKGdhbWVCb2FyZHNbMl0pXG4gICAgICAgIGdhbWVPdmVyRGlzcGxheShwbGF5ZXIxKVxuICAgIH0gZWxzZSBpZihvcHBvbmVudCA9PT0gcGxheWVyMSAmJiBvdmVyKSB7XG4gICAgICAgIGRlc3Ryb3lCb2FyZChnYW1lQm9hcmRzWzFdKVxuICAgICAgICBnYW1lT3ZlckRpc3BsYXkocGxheWVyMilcbiAgICB9XG59XG5cbmV4cG9ydCB7Y3JlYXRlQm9hcmRHcmlkLCByYW5kb21QbGFjZW1lbnQsIHBsYXllcjEsIHBsYXllcjIsIG9wcG9uZW50fSIsImltcG9ydCBHYW1lQm9hcmQgZnJvbSBcIi4vZ2FtZS1ib2FyZFwiXG5cbmNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkID0gbmV3IEdhbWVCb2FyZDtcbiAgICB9XG59XG5cbmNsYXNzIENvbXB1dGVyIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmdhbWVCb2FyZCA9IG5ldyBHYW1lQm9hcmQ7XG4gICAgfVxufVxuXG5leHBvcnQge1BsYXllciwgQ29tcHV0ZXJ9IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgsIHRpbWVzSGl0ID0gMCwgc3VuayA9IGZhbHNlKXtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy50aW1lc0hpdCA9IHRpbWVzSGl0O1xuICAgICAgICB0aGlzLnN1bmsgPSBzdW5rXG4gICAgfVxuICAgIGhpdCgpe1xuICAgICAgICByZXR1cm4gdGhpcy50aW1lc0hpdCArPSAxXG4gICAgfVxuICAgIGlzU3Vuaygpe1xuICAgICAgICBpZih0aGlzLmxlbmd0aCA9PT0gdGhpcy50aW1lc0hpdCkgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VuaztcbiAgICB9XG59IiwiaW1wb3J0IHsgcGxheWVyMSwgcGxheWVyMiwgb3Bwb25lbnQgfSBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0IGF1ZGlvIGZyb20gJy4vaGl0LWF1ZGlvLndhdic7XG5cbmNvbnN0IHR1cm5EaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci10dXJuJyk7XG5jb25zdCBpbmZvU3RhdHVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8nKTtcbmNvbnN0IGhpdEF1ZGlvID0gbmV3IEF1ZGlvKGF1ZGlvKTtcbmhpdEF1ZGlvLnByZWxvYWQgPSAnYXV0byc7XG5cbmZ1bmN0aW9uIHN0eWxlVUkoc3F1YXJlLCBzdGF0dXMpIHtcbiAgICBpZihzdGF0dXMgPT09ICdzYW1lIHNwb3QnKSByZXR1cm5cbiAgICBpZihzdGF0dXMgPT09ICdoaXQnKSB7XG4gICAgICAgIGhpdEF1ZGlvLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgaGl0QXVkaW8ucGxheSgpXG4gICAgICAgIC8vQ29tcGVuc2F0ZXMgZm9yIGF1ZGlvIGRlbGF5XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICAgICAgaW5mb1N0YXR1cy50ZXh0Q29udGVudCA9IFwiQXR0YWNrIGFnYWluIVwiO1xuICAgICAgICAgICAgc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnc2hha2UnKTtcbiAgICAgICAgfSwyNTApXG4gICAgICAgIC8vUmVtb3ZlIHNoYWtlXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge3NxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3NoYWtlJyl9LCA1MDApXG4gICAgfSBlbHNlIGlmKHN0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdtaXNzJylcbiAgICAgICAgaW5mb1N0YXR1cy50ZXh0Q29udGVudCA9IFwiT2ggbm8sIGEgbWlzcyFcIlxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIChvcHBvbmVudCA9PT0gcGxheWVyMSlcbiAgICAgICAgICAgID8gdHVybkRpc3BsYXkudGV4dENvbnRlbnQgPSBcIlBsYXllciAyOlwiXG4gICAgICAgICAgICA6IHR1cm5EaXNwbGF5LnRleHRDb250ZW50ID0gXCJQbGF5ZXIgMTpcIjtcbiAgICAgICAgICAgIGluZm9TdGF0dXMudGV4dENvbnRlbnQgPSBcIkF0dGFjayFcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIxJykuY2xhc3NMaXN0LnRvZ2dsZSgndG9nZ2xlJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMicpLmNsYXNzTGlzdC50b2dnbGUoJ3RvZ2dsZScpXG4gICAgICAgIH0sIDkwMClcbiAgICB9XG59XG5mdW5jdGlvbiBkZXN0cm95Qm9hcmQoYm9hcmQpe1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgeExlZnQgPSAwO1xuICAgIGxldCB4UmlnaHQgPSA3O1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBib2FyZC5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdoaXQnKTtcbiAgICAgICAgICAgIGJvYXJkLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ21pc3MnKTtcbiAgICAgICAgICAgIGhpdEF1ZGlvLmN1cnJlbnRUaW1lID0gMTtcbiAgICAgICAgICAgIGhpdEF1ZGlvLnBsYXkoKTtcbiAgICAgICAgICAgIGJvYXJkLmNsYXNzTGlzdC50b2dnbGUoJ3RvZ2dsZScpXG4gICAgICAgICAgICBpZihpID09PSB4TGVmdCl7XG4gICAgICAgICAgICAgICAgeExlZnQgKz0gOTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9hcmQuY2hpbGRyZW5baV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCdcbiAgICAgICAgICAgIH0gZWxzZSBpZihpID09PSB4UmlnaHQpIHtcbiAgICAgICAgICAgICAgICB4UmlnaHQgKz0gNztcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9hcmQuY2hpbGRyZW5baV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvYXJkLmNoaWxkcmVuW2ldLmlkID0gJ2dhbWUtb3Zlcic7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBpZihpID09PSA2NCkgY2xlYXJJbnRlcnZhbChpbnRlcnZhbClcbiAgICAgICAgfSwgMjApO1xuICAgIH0sIDI1MCk7XG4gICBcbn1cblxuZnVuY3Rpb24gZ2FtZU92ZXJEaXNwbGF5KHdpbm5lcikge1xuICAgIGlmKHdpbm5lci5jb25zdHJ1Y3Rvci5uYW1lID09PSAnQ29tcHV0ZXInKXtcbiAgICAgICAgdHVybkRpc3BsYXkudGV4dENvbnRlbnQgPSBcIkNvbXB1dGVyOlwiXG4gICAgICAgIGluZm9TdGF0dXMudGV4dENvbnRlbnQgPSBcIkRlZmVhdGVkIGFsbCBQbGF5ZXIgMSBzaGlwcyFcIlxuICAgIH0gZWxzZSBpZihvcHBvbmVudCA9PT0gcGxheWVyMikge1xuICAgICAgICB0dXJuRGlzcGxheS50ZXh0Q29udGVudCA9IFwiUGxheWVyIDE6XCJcbiAgICAgICAgaW5mb1N0YXR1cy50ZXh0Q29udGVudCA9IFwiRGVmZWF0ZWQgYWxsIFBsYXllciAyIHNoaXBzIVwiXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdHVybkRpc3BsYXkudGV4dENvbnRlbnQgPSBcIlBsYXllciAyOlwiXG4gICAgICAgIGluZm9TdGF0dXMudGV4dENvbnRlbnQgPSBcIkRlZmVhdGVkIGFsbCBQbGF5ZXIgMSBzaGlwcyFcIlxuICAgIH1cbn1cblxuZXhwb3J0IHtzdHlsZVVJLCBkZXN0cm95Qm9hcmQsIGdhbWVPdmVyRGlzcGxheX1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9