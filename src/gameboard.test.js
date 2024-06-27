import Gameboard from "./gameboard";
import Ship from "./ship"

const game = new Gameboard;
const destroyer = new Ship(2)

test('check if ship is in correct coordinates', () => {
    expect(game.placeShip(destroyer, [3,3], [4,3])).toBe(destroyer);
   
});

test('see if receiveAttack hit or miss', () => {
    expect(game.receiveAttack(3,3)).toBe(destroyer.sunk); //false
    expect(game.receiveAttack(2,6)).toBe('missed attack')
    expect(game.receiveAttack(4,3)).toBe(destroyer.sunk); //true
})