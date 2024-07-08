import { player1, player2, opponent } from "./index";

const turnDisplay = document.querySelector('.player-turn');
const infoStatus = document.querySelector('.info');

function styleUI(square, status) {
    if(status === 'same spot') return
    if(status === 'hit') {
        square.classList.add('hit');
        square.classList.remove('hidden')
        infoStatus.textContent = "Attack again!"
    } else if(status === 'miss') {
        square.classList.add('miss')
        infoStatus.textContent = "Oh no, a miss!"
        setTimeout(() => {
            (opponent === player1)
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

export {styleUI, destroyBoard, gameOverDisplay}
