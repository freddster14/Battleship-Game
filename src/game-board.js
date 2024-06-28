export default class GameBoard {
    constructor(){
        this.grid = new Array(8).fill(null).map(() => new Array(8).fill(false));
    }
    placeShip(ship, area){
        let index;
        for(let n = 0; n < ship.length; n++){
            if(this.grid[area[n][0]][area[n][1]] !== false) return 'invalid placement';
            index = this.grid[area[n][0]][area[n][1]] = ship
        }
        return area
    }
    receiveAttack(x, y){
        const ship = this.grid[x][y];
        const hitOrMiss = this.attackLogic(ship);
        return this.grid[x][y] = hitOrMiss;
    }
    attackLogic(index){
        if(index === 'hit' || index === 'miss') return index
        if(index === false) {
            return index = 'miss';
        } else if(index !== false) {
            index.hit();
            index.sunk = index.isSunk();
            // if(index.sunk) this.isAllSunk();
            return index = 'hit'
        }
    }
    isAllSunk(ships){
        for(let i = 0; i < ships.length; i++){
            if(ships[i].sunk === false) return false
        }
        return true
    }
}