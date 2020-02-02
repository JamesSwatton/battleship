const Game = {
    // checks if ship has been hit enough times to sink 
    checkForSunk(ship, ships) {
        const shipToCheck = ships.find(shipToFind => shipToFind.type === ship);
        return shipToCheck.hits === shipToCheck.size;
    },

    isHit(x, y, board) {
        return board[y][x] !== '~';
    },

    // logic to determine winner
    determineWinner(board) {
        let numOfHits = 0
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (board[i][j] === 'X') {
                    numOfHits += 1;
                } 
            }
        }
        return numOfHits === 17;
    }
}
