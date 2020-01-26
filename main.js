const board = [];

function createBoard() {
    for (let i = 0; i < 10; i++) {
        board[i] = [];
        for (let j = 0; j < 10; j++) {
            board[i][j] = '~';
        }
    }
};

const ships = {
    c1: {type: 'carrier', size: 5, hits: 0},
    b1: {type: 'battleship', size: 4, hits: 0},
    b2: {type: 'battleship', size: 4, hits: 0},
    cr1: {type: 'cruiser', size: 4, hits: 0},
    cr2: {type: 'cruiser', size: 4, hits: 0},
    cr3: {type: 'cruiser', size: 4, hits: 0},
    s1: {type: 'submarine', size: 3, hits: 0},
    s2: {type: 'submarine', size: 3, hits: 0},
    s3: {type: 'submarine', size: 3, hits: 0},
    s4: {type: 'submarine', size: 3, hits: 0},
    d1: {type: 'destroyer', size: 2, hits: 0},
    d2: {type: 'destroyer', size: 2, hits: 0},
    d3: {type: 'destroyer', size: 2, hits: 0},
    d4: {type: 'destroyer', size: 2, hits: 0},
    d5: {type: 'destroyer', size: 2, hits: 0},
    // {type: 'carrier', size: 5, num: 1},
    // {type: 'battleship', size: 4, num: 2},
    // {type: 'cruiser', size: 3, num: 3},
    // {type: 'submarine', size: 3, num: 4},
    // {type: 'destroyer', size: 2, num: 5},
};

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
    for (ship in ships) {
        console.log(ships[ship])
            let direction = horizonatalOrVertical();
            let startPositions = calcStartPositions(ships[ship], direction);
            let randIndex = Math.floor(Math.random() * Math.floor(startPositions.length));
            let randStartPos = startPositions[randIndex]; 
            let x = randStartPos[0];
            let y = randStartPos[1];

            if (direction === 'horizontal') {
                for (let i = x; i < (x + ships[ship].size); i++) {
                    board[y][i] = 1;
                }
            } else if (direction === 'vertical') {
                for (let i = y; i < (y + ships[ship].size); i++) {
                    board[i][x] = 1;
                }
            }
    }
}

// determine whether player has made a hit
document.getElementById('board').addEventListener('click', event => {
    const gridElement = event.target;
    const clickPosition = event.target.id.split('-');
    const x = +clickPosition[0];
    const y = +clickPosition[1];
    if (board[x][y] === 1) {
        console.log('HIT');
        board[x][y] = "X"
        gridElement.classList.add('hit');

    }
})

createBoard();
placeShips();

gameView.renderBoard(board);
