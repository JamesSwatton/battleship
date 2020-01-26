const board = [];

function createBoard() {
    for (let i = 0; i < 10; i++) {
        board[i] = [];
        for (let j = 0; j < 10; j++) {
            board[i][j] = '~';
        }
    }
};

const ships = [
    // [1, 1, 1, 1],
    // [1, 1, 1, 1], 
    // [1, 1, 1],
    // [1, 1, 1],
    {type: 'carrier', size: 5, num: 1},
    {type: 'battleship', size: 4, num: 2},
    {type: 'cruiser', size: 3, num: 3},
    {type: 'submarine', size: 3, num: 4},
    {type: 'destroyer', size: 2, num: 5},
];

const horVert = [
    "horizontal", 
    "vertical"
];

// randomly selects whether a ship will be placed horizontally or vertically 
function horizonatalOrVertical() {
    const randIndex = Math.floor(Math.random() * Math.floor(2));
    return horVert[randIndex];
};

function shipCanBePlaced(x, y, ship, direction) {
    let possiblePlacementPos = [];

    if (direction === 'horizontal') {
        if (board[y][x + (ship.size - 1)] === undefined) {
            return false;
        } else {
            // gather possible placment positions 
            for (let i = x; i < (x + ship.size); i++) {
                possiblePlacementPos.push(board[y][i]);
            };
            return possiblePlacementPos.every(pos => pos == '~');
        }
    } else if (direction === 'vertical') {
        if (board[y + (ship.size - 1)] === undefined) {
            return false;
        } else {
            // gather possible placment positions 
            for (let i = y; i < (y + ship.size); i++) {
                possiblePlacementPos.push(board[i][x]);
            };
            return possiblePlacementPos.every(pos => pos == '~');
        }
    }
};

// collects all starting positions that a ship can be placed at
// returns an array of starting position in this format [x,y]
function calcStartPositions(ship, direction) {
    let startPositions = [];
    console.log(direction);
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (shipCanBePlaced(x, y, ship, direction)) {
                startPositions.push([x, y]);
            }
        }
    }
    return startPositions;
};

function placeShips() {
    ships.forEach(ship => {
        for (let i = 0; i < ship.num; i++) {
            let direction = horizonatalOrVertical();
            let startPositions = calcStartPositions(ship, direction);
            let randIndex = Math.floor(Math.random() * Math.floor(startPositions.length));
            let randStartPos = startPositions[randIndex]; 
            let x = randStartPos[0];
            let y = randStartPos[1];

            if (direction === 'horizontal') {
                for (let i = x; i < (x + ship.size); i++) {
                    board[y][i] = 1;
                }
            } else if (direction === 'vertical') {
                for (let i = y; i < (y + ship.size); i++) {
                    board[i][x] = 1;
                }
            }

        }
    })
}

createBoard();
placeShips();

gameView.renderBoard(board);

console.log(board);

// console.log(shipCanBePlaced(3, 1, ships[0], 'horizontal'));

// console.log(calcStartPositions());
