import GameBoard from "./game-board"

class Player {
    constructor() {
        this.gameBoard = new GameBoard;
    }
}

class Computer {
    constructor(){
        this.gameBoard = new GameBoard;
    }
}

export {Player, Computer}