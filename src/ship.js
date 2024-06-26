export default class Ship{
    constructor(length, timesHit = 0, sunk = false){
        this.length = length;
        this.timesHit = timesHit;
        this.sunk = sunk
    }
    hit(){
        return this.timesHit += 1
    }
    isSunk(){
        if(this.length === this.timesHit) return this.isSunk = true
    }
}