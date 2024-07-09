import {createBoardGrid, randomCpuPlacement, player1, player2, opponent} from './index';
import Ship from './ship';

function createCpuGrid(cpu) {
    cpu.gameBoard.placeShip(new Ship('destroyer', 3), randomCpuPlacement(3, 2))
    cpu.gameBoard.placeShip(new Ship('battleship', 4), randomCpuPlacement(4, 2))
    cpu.gameBoard.placeShip(new Ship('submarine', 3), randomCpuPlacement(3, 2))
    cpu.gameBoard.placeShip(new Ship('patrol-boat', 2), randomCpuPlacement(2, 2));
    createBoardGrid(cpu.gameBoard.grid, 2)
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
        }, 2000)
    }
}

export {createCpuGrid, computerAttack}