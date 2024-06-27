export default class GameBoard {
    constructor(){
        this.grid = new Array(8).fill(null).map(() => new Array(8).fill(false));
    }
    placeShip(ship, area){
        let index;
        for(let n = 0; n < ship.length - 1; n++){
            if(this.grid[area[n][0]][area[n][1]] !== false) return 'invalid placement';
            index = this.grid[area[n][0]][area[n][1]] = ship
        }
        return index
    }
    receiveAttack(x, y){
        const ship = this.grid[x][y];
        const hitOrMiss = this.attackLogic(ship);
        return hitOrMiss
    }
    attackLogic(ship){
        if(ship === 'hit' || ship === 'miss') return 'same attack spot'

        if(ship === false) {
            ship = 'miss';
        } else if(ship !== false) {
            ship.hit();
            ship = 'hit'
        }
        return ship
    }
    isAllSunk(){

    }
}