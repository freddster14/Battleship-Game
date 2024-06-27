import Gameboard from "./gameboard";
import Ship from "./ship"

test('check if ship is in correct coordinates', () => {
    const game = new Gameboard;
    const destroyer = new Ship(4)
    game.placeShip(destroyer, [[3,3], [4,3]]);
    expect(game.receiveAttack([3,3])).toBe(true);
    expect(game.receiveAttack([5,3])).toBe(false);
});