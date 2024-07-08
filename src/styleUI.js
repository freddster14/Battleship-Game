import { player1, player2, opponent } from "./index";
import audio from './hit-audio.wav';

const turnDisplay = document.querySelector('.player-turn');
const infoStatus = document.querySelector('.info');
const hitAudio = new Audio(audio);
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
    } else if(opponent === player2) {
        turnDisplay.textContent = "Player 1:"
        infoStatus.textContent = "Defeated all Player 2 ships!"
    } else {
        turnDisplay.textContent = "Player 2:"
        infoStatus.textContent = "Defeated all Player 1 ships!"
    }
}

export {styleUI, destroyBoard, gameOverDisplay}
