import GameBoard from "./game-board";
import Ship from "./ship"

const game = new GameBoard;
const destroyer = new Ship(2);
const battleShip = new Ship(5);
const titanic = new Ship(2)

test('check if ship is in correct coordinates', () => {
    expect(game.placeShip(destroyer, [[3,3], [4,3]])).toBe(destroyer);
    expect(game.placeShip(battleShip, [[3,3], [5,6], [4,6], [3,6], [2,6]])).toBe('invalid placement');
    expect(game.placeShip(titanic, [[1,3], [2,3]])).toBe(titanic)
});

test('see if receiveAttack hit or miss', () => {
    expect(game.receiveAttack(3,3)).toBe('hit');
    expect(game.receiveAttack(5,3)).toBe('miss');
    expect(game.receiveAttack(3,3)).toBe('same attack spot');
    expect(game.receiveAttack(4,3)).toBe('hit'); //sunk
});

describe('have live ships then attack to test isAllSunk', () => {
    const ships = [destroyer, titanic];

    afterEach(() => {
        game.receiveAttack(1,3);
        game.receiveAttack(2,3);
    });
    
    test('checks ships if all sunk === false', () => {
        expect(game.isAllSunk(ships)).toBe(false);
    });
    test('checks ships if all sunk === true', () => {
        expect(game.isAllSunk(ships)).toBe(true);
    })
})
