import Ship from './ship';

test('checks ships properties', () => {
    const battleship = new Ship(4);
    expect(battleship.length).toBe(4);
    expect(battleship.timesHit).toBe(0);
    expect(battleship.sunk).toBe(false);
});