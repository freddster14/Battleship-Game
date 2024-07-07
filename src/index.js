import {Player, Computer} from "./player";
import Ship from "./ship";
import styles from './style.css'

const overlay = document.querySelector('.overlay');
const gameModeDisplay = document.querySelector('.game-mode');
const gameContainer = document.querySelector('.board-container')
const gameBoards = document.getElementsByClassName('board');
const turnDisplay = document.querySelector('.player-turn');
const infoStatus = document.querySelector('.info');

const player1 = new Player;
let player2;
let gameMode = 'null';
let opponent;

document.querySelector('.computer').addEventListener('click', () => {
    player2 = new Computer;
    overlay.style.display = 'none';
    gameModeDisplay.style.display = 'none';
    gameMode = 'computer';
    opponent = player2
    createPlayerGrid(player1);
});

document.querySelector('.vs').addEventListener('click', () => {
    player2 = new Player
    overlay.style.display = 'none';
    gameModeDisplay.style.display = 'none';
    gameMode = 'vs';
    opponent = player2

});


function createCpuGrid(cpu) {
    cpu.gameBoard.placeShip(new Ship('destroyer', 3), randomPlacement(3))
    cpu.gameBoard.placeShip(new Ship('battleship', 4), randomPlacement(4))
    cpu.gameBoard.placeShip(new Ship('submarine', 3), randomPlacement(3))
    cpu.gameBoard.placeShip(new Ship('patrol-boat', 2), randomPlacement(2));
    createBoardGrid(cpu.gameBoard.grid, 2)
}


function createPlayerGrid(player) {
    let selectedShip = []
    let rotate = false
    let usedShips = []
    let playerPlacement = player1
    for(let i = 0; i < player.gameBoard.grid.length; i++){
        for(let n in player.gameBoard.grid[i]){
            let square = document.createElement('div');
            gameBoards[0].appendChild(square);
            gameBoards[0].style.gridTemplateColumns = `repeat(64, 1fr)`;
            gameBoards[0].style.gridTemplateRows = `repeat(64, 1fr)`;
            square.className = "squares";
            square.id = `${i},${n}`;
            square.addEventListener('click', () => {
                let length = returnShipLength[1]
            });
        }
    }
    gameBoards[0].addEventListener('click', (e) => {
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
                if(current.classList.length > 1) return removeShipPlacement(selectedShip[0])
                current.classList.add(selectedShip[0]);
                if(i === selectedShip[1] - 1) break;
                for(let n = 0; n <= 7; n++){
                    current = current.nextElementSibling;
                }
            }
            usedShips.push(selectedShip[0])
         } else if(!rotate & !((+current.id[2] + selectedShip[1]) > 8)){
            for(let i = 0; i < selectedShip[1]; i++){
                if(current.classList.length > 1) return removeShipPlacement(selectedShip[0])
                current.classList.add(selectedShip[0]);
                if(i === selectedShip[1] - 1) break;
                current = current.nextElementSibling;
            }
            usedShips.push(selectedShip[0])
         }
    })
    document.querySelectorAll('.ships > button').forEach((button) => {
        button.addEventListener('click', (e) => {
            selectedShip = returnShipLength(e.target.classList.value)
        })
    });
    document.querySelector('.rotate').addEventListener('click', () => {
        if(rotate === false) {
            rotate = true;
        } else {
            rotate = false
        }
    });
    document.querySelector('.confirm').addEventListener('click', () => {
        let storage = {
            battleship: [],
            destroyer: [],
            submarine: [],
            'patrol-boat': []
        }
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
        if(gameMode === 'computer') {
            for(let n in storage){
                playerPlacement.gameBoard.placeShip(new Ship(n, returnShipLength(n)[1]), storage[n])
            }
            createBoardGrid(player1.gameBoard.grid, 1)
            createCpuGrid(player2)
        }
        document.querySelector('.board-placement').style.display = 'none'
    });
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
            let square = document.getElementsByClassName('board')[1].children[randomIndex];
            while(square.classList.contains("hit") || square.classList.contains("miss")) {
                randomIndex = Math.floor(Math.random() * 64);
                square = document.getElementsByClassName('board')[1].children[randomIndex];
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
        destroyBoard(gameBoards[2])
        gameOverDisplay(player1)
    } else if(opponent === player1 && over) {
        destroyBoard(gameBoards[1])
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
