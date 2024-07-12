import { player1, player2, difficult } from "./index";
import { destroyBoard, gameOverDisplay, styleUI } from "./styleUI";

const gameBoards = document.getElementsByClassName('board');
let opponent;
let screenWidth  = 
window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

(screenWidth < 1185) ? screenWidth = true : screenWidth = false;
        

export default class GameBoard {
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
        if(opponent === player1 && board === true || board === false && opponent === player2) {
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
            return (opponent === player1) ? opponent = player2 :  opponent = player1;
        }
    }
    checkTurn(boardBoolean) {
        if((opponent === player1 && boardBoolean === true) || (boardBoolean === false && opponent === player2)) {
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
    createGameGrid(grid, t) {
        const gameContainer = document.querySelector('.board-container');
        opponent = player2;
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
                    styleUI(square, result);
                    opponent.gameBoard.changeTurn(result);
                    if(player2.constructor.name === 'Computer') player2.computerAttack(difficult);
                });
                //Checks for Ship, to show or hide
                if(grid[i][n] !== false) {
                    square.classList.add(`${grid[i][n].name}`)
                    if((player2.constructor.name === 'Computer' && boardBoolean === false) || player2.constructor.name === 'Player')
                     square.classList.add('hidden');
                };
                if(player2.constructor.name === 'Computer' && t === 1) {
                    gameBoards[t].classList.add('board-cover')
                }
            }
        }
        //Only displays opponent board;
        if(screenWidth) document.querySelector('.player2').classList.toggle('toggle');
        screenWidth = false
    }
}

export {opponent}

