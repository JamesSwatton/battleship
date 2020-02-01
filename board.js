const Board = {
    _board: [],

    _ships : {
        carrier: {size: 5, hits: 0},
        battleship: {size: 4, hits: 0},
        cruiser: {size: 3, hits: 0},
        submarine: {size: 3, hits: 0},
        destroyer: {size: 2, hits: 0},
    },

    get board() {
        return this._board;
    },

    get ships() {
        return this._ships;
    },

    createBlankBoard() {
        // this._board = [];
        for (let i = 0; i < 10; i++) {
            this._board[i] = [];
            for (let j = 0; j < 10; j++) {
                this._board[i][j] = '~';
            }
        }
    },

    // TODO: work out how to not make this confusing as it's potentially
    // taking in a 'ships' constructed in a different way. Due to player
    // selecting the loctions that each ship will be placed
    placeShips(ships) {
        ships.forEach(ship => {
            ship.positions.forEach(pos => {;
                this._board[pos[0]][pos[1]] = ship.type;
            })
        })
    },

    horizonatalOrVertical() {
        const horVert = [
            "horizontal", 
            "vertical"
        ];
        const randIndex = Math.floor(Math.random() * Math.floor(2));
        return horVert[randIndex];
    },

    shipCanBePlaced(x, y, ship, orientation) {
        let possiblePlacementPos = [];

        if (orientation === 'horizontal') {
            if (this._board[y][x + (ship.size - 1)] === undefined) {
                return false;
            } else {
                // gather possible placment positions 
                for (let i = x; i < (x + ship.size); i++) {
                    possiblePlacementPos.push(this._board[y][i]);
                };
                return possiblePlacementPos.every(pos => pos == '~');
            }
        } else if (orientation === 'vertical') {
            if (this._board[y + (ship.size - 1)] === undefined) {
                return false;
            } else {
                // gather possible placment positions 
                for (let i = y; i < (y + ship.size); i++) {
                    possiblePlacementPos.push(this._board[i][x]);
                };
                return possiblePlacementPos.every(pos => pos == '~');
            }
        }
    },

    calcStartPositions(ship, orientation) {
        let startPositions = [];
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                if (this.shipCanBePlaced(x, y, ship, orientation)) {
                    startPositions.push([y, x]);
                }
            }
        }
        return startPositions;
    },

    selectRndStartPosition(startPositions) {
        let randIndex = Math.floor(Math.random() * Math.floor(startPositions.length));
        let randStrtPos = startPositions[randIndex]; 
        let y = randStrtPos[0];
        let x = randStrtPos[1];
        return [y, x];
    }, 

    placeShip(startX, startY, orientation, ship) {
        if (orientation === 'horizontal') {
            for (let x = startX; x < (startX + ship.size); x++) {
                this._board[startY][x] = ship;
            }
        } else if (orientation === 'vertical') {
            for (let y = startY; y < (startY + ship.size); y++) {
                this._board[y][startX] = ship;
            }
        }
    },

    randomlyPlaceShips() {
        for (ship in this.ships) {
            let currentShip = this.ships[ship];
            let randOrientation = this.horizonatalOrVertical();
            let startPositions = this.calcStartPositions(currentShip, randOrientation)
            let randStrtPos = this.selectRndStartPosition(startPositions);
            this.placeShip(randStrtPos[1], randStrtPos[0], randOrientation, currentShip);
        }
        console.log(this._board);
    },
};
