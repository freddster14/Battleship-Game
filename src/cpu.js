import {createGameGrid, player1, player2, opponent} from './index';
import Ship from './ship';

let attackAgain = false;

function createCpuGrid(cpu) {
    cpu.gameBoard.placeShip(new Ship('destroyer', 3), randomCpuPlacement(3, 2))
    cpu.gameBoard.placeShip(new Ship('battleship', 4), randomCpuPlacement(4, 2))
    cpu.gameBoard.placeShip(new Ship('submarine', 3), randomCpuPlacement(3, 2))
    cpu.gameBoard.placeShip(new Ship('patrol-boat', 2), randomCpuPlacement(2, 2));
    createGameGrid(cpu.gameBoard.grid, 2)
}

function computerAttack(difficult){
    if(opponent === player1 && player2.constructor.name === "Computer"){
       if(difficult === 'easy'){
        easyAttack()
       } else if(difficult === 'medium' && !attackAgain) {
        mediumAttack()
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
        console.log(square)
        square.click()
    }, 2000)
    
   return square
}

function mediumAttack() {
    let square;
    let index;
    //Attack random until hit
    if(!attackAgain) {
        square = easyAttack();
        index = square
    }
    let x = +square.id[0];
    let y = +square.id[2];
    //Ship === 'hit'
    let object = player1.gameBoard.grid[x][y];
    if(object !== false) {
        attackAgain = true
        let z;
        let w;
        for(let i = 0; i < 4; i++) {
            z = x;
            w = y;
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
            if(index === undefined || index === null) {
                return attackAgain = false;
            }
            if(index.classList.contains(object.name) && !index.classList.contains('hit')) break;
        }
        //4s because the first attack also has Timeout
        setTimeout(() => {
            index.click()
            attackAgain = false;
            computerAttack('medium')
        }, 4000); 
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

export {createCpuGrid, computerAttack}