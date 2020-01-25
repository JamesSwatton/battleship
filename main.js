const board = [];

function createBoard() {
    for (let i = 0; i < 8; i++) {
        board[i] = [];
        for (let j = 0; j < 8; j++) {
            board[i][j] = '~';
        }
    }
};

const ships = [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
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
        // gather possible placment positions 
        for (let i = x; i < (x + ship.length); i++) {
            possiblePlacementPos.push(board[y][i]);
        };
        console.log(possiblePlacementPos);
        if (board[y][x + (ship.length - 1)] === undefined) {
            return false;
        } else if (possiblePlacementPos.every(pos => pos == '~')) {
            return true;
        }
        return true;

    } else if (direction === 'vertical') {
        // gather possible placment positions 
        for (let i = y; i < (y + ship.length); i++) {
            possiblePlacementPos.push(board[i][x]);
        };
        if (board[y + (ship.length - 1)][x] === undefined) {
            return false;
        }
        return true;
    }
};

const shipStartPositions = [];

// collects all starting positions that a ship can be placed at
function calcStartPositions() {
     
};

createBoard();

console.log(shipCanBePlaced(3, 1, ships[0], 'horizontal'));
