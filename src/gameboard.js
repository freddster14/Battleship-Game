export default class Gameboard {
    constructor(){
        this.grid = new Array(8).fill(null).map(() => new Array(8).fill(false));
    }
    placeShip(ship, x, y){
        this.grid[x[0]][x[1]] = ship
        this.grid[y[0]][y[1]] = ship
        return this.grid[4][3]
    }
    receiveAttack(x, y){
        const ship = this.grid[x][y];
        if(ship !== false){
            ship.hit();
            return ship.isSunk()
        }
        return 'missed attack'
    }
}