import GameBoard from "./game-board";
import Ship from "./ship"

const game = new GameBoard;
const destroyer = new Ship(2);
const battleShip = new Ship(5);
const titanic = new Ship(2)

test('check if ship is in correct coordinates', () => {
    expect(game.placeShip(destroyer, [[3,3], [4,3]])).toBe(destroyer);
    expect(game.placeShip(battleShip, [[6,6], [5,6], [4,6], [3,6], [2,6]])).toBe(battleShip);
    expect(game.placeShip(titanic, [[3,3], [2,3]])).toBe('invalid placement')
});

test('see if receiveAttack hit or miss', () => {
    expect(game.receiveAttack(3,3)).toBe('hit'); //false but hit
    expect(game.receiveAttack(2,6)).toBe('miss')
    expect(game.receiveAttack(4,3)).toBe('hit'); //true sunk
})