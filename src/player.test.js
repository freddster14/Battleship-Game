import Player from "./player";
import Ship from "./ship";

const player1 = new Player;
const comp = new Player;
const boat = new Ship(2)

test('check file', () => {
    expect(player1.gameBoard.isAllSunk([boat])).toBe(false)
})