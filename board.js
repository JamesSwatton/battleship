const Board = {
    _board: [],

    _ships : [
        {type: 'carrier', size: 5, hits: 0},
        {type: 'battleship', size: 4, hits: 0},
        {type: 'cruiser', size: 3, hits: 0},
        {type: 'submarine', size: 3, hits: 0},
        {type: 'destroyer', size: 2, hits: 0},
    ],

    overlap: false,

    get board() {
        return this._board;
    },

    get ships() {
        return this._ships;
    },

    set board(board) {
        this._board = board;
    },

    getShip(shipType) {
        return this._ships.find(ship => ship.type === shipType);
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

    _horizonatalOrVertical() {
        const horVert = [
            "horizontal", 
            "vertical"
        ];
        const randIndex = Math.floor(Math.random() * Math.floor(2));
        return horVert[randIndex];
    },

    isWithinboard(xOrY, ship) {
        return (xOrY + ship.size) <= 10;
    },

    _shipCanBePlaced(x, y, ship) {
        let possiblePlacementPos = [];

        if (ship.orientation === 'horizontal') {
            if (this.isWithinboard(x, ship)) {
                for (let i = 0; i < ship.size; i ++) {
                    let posX = x + i;
                    possiblePlacementPos.push(this._board[y][posX]);
                }
            } else {
                return false;
            }
        } else if (ship.orientation === 'vertical') {
            if (this.isWithinboard(y, ship)) {
                for (let i = 0; i < ship.size; i ++) {
                    let posY = y + i;
                    possiblePlacementPos.push(this._board[posY][x]);
                }
            } else {
                return false;
            }
        }
                return possiblePlacementPos.every(pos => pos == '~');
    },

    _calcStartPositions(ship) {
        let startPositions = [];
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                if (this._shipCanBePlaced(x, y, ship)) {
                    startPositions.push([y, x]);
                }
            }
        }
        return startPositions;
    },

    _selectRndStartPosition(startPositions) {
        let randIndex = Math.floor(Math.random() * Math.floor(startPositions.length));
        let randStrtPos = startPositions[randIndex]; 
        let y = randStrtPos[0];
        let x = randStrtPos[1];
        return [x, y];
    }, 

    placeShip(ship) {
        this.overlap = false;
        if (ship.orientation === 'horizontal') {
            for (let x = ship.startPos[0]; x < (ship.startPos[0] + ship.size); x++) {
                if (this._board[ship.startPos[1]][x] !== '~'
                    && this._board[ship.startPos[1]][x] !== ship.type) {
                    this._board[ship.startPos[1]][x] = '!';
                    this.overlap = true;
                } else {
                    this._board[ship.startPos[1]][x] = ship.type;
                }
            }
        } else if (ship.orientation === 'vertical') {
            for (let y = ship.startPos[1]; y < (ship.startPos[1] + ship.size); y++) {
                if (this._board[y][ship.startPos[0]] !== '~'
                    &&this._board[y][ship.startPos[0]] !== ship.type) {
                    this._board[y][ship.startPos[0]] = '!';
                    this.overlap = true;
                } else {
                    this._board[y][ship.startPos[0]] = ship.type;
                }
            }
        }
    },

    randomlyPlaceShip(ship) {
        let randOrientation = this._horizonatalOrVertical();
        ship.orientation = randOrientation;
        let startPositions = this._calcStartPositions(ship)
        let randStrtPos = this._selectRndStartPosition(startPositions);
        ship.startPos = randStrtPos;
        this.placeShip(ship);
    },

    randomlyPlaceShips() {
        this._ships.forEach(ship => {
            this.randomlyPlaceShip(ship);
        })
    },
};
