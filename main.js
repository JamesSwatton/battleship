let gameState = 'placement';

// let playerPlacement = true;
let playerShips = [];
let selectedShip;
let shipPlacementDirection = 'horizontal';

let board = [];

let playerBoard = [];

const ships = {
    c: {type: 'carrier', size: 5, hits: 0},
    b: {type: 'battleship', size: 4, hits: 0},
    cr: {type: 'cruiser', size: 3, hits: 0},
    s: {type: 'submarine', size: 3, hits: 0},
    d: {type: 'destroyer', size: 2, hits: 0},
};

const horVert = [
    "horizontal", 
    "vertical"
];

function createBoard() {
    board = [];
    for (let i = 0; i < 10; i++) {
        board[i] = [];
        for (let j = 0; j < 10; j++) {
            board[i][j] = '~';
        }
    }
};

function createPlayerBoard() {
    for (let i = 0; i < 10; i++) {
        playerBoard[i] = [];
        for (let j = 0; j < 10; j++) {
            playerBoard[i][j] = '~';
        }
    }

    if (playerShips) {
        playerShips.forEach(ship => {
            ship.positions.forEach(pos => {;
                playerBoard[pos[0]][pos[1]] = ship.type;
            })
        })
    }
    console.log(playerBoard);
};

// randomly selects whether a ship will be placed horizontally or vertically 
function horizonatalOrVertical() {
    const randIndex = Math.floor(Math.random() * Math.floor(2));
    return horVert[randIndex];
};

// checks if a ship can be placed. returns true or false
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

// select ship to place 
document.querySelector('#enemy-ship-list').addEventListener('click', event => {
    selectedShip = event.target.id;
    console.log(selectedShip);
}) 

// display ship at mouse location 
document.querySelector('#board').addEventListener('mouseover', event => {
    if (gameState === 'placement') {
        const mouseGridPos = event.target.id.split('-');
        const mouseGridX = +mouseGridPos[0];
        const mouseGridY = +mouseGridPos[1];
        const selectedShipSize = ships[selectedShip].size;

        createBoard();
        placePlayerShips();
        if (shipPlacementDirection === 'horizontal') {
            for (let i = 0; i < selectedShipSize; i++) {
                if (shipOverlap(mouseGridX, mouseGridY + i)) {
                    board[mouseGridX][mouseGridY + i] = '-';
                } else {
                    if (mouseGridY + i >= 10) {
                        return 
                    } else {
                        board[mouseGridX][mouseGridY + i] = selectedShip;
                    }
                } 
            }
        } else if (shipPlacementDirection === 'vertical') {
            for (let i = 0; i < selectedShipSize; i++) {
                if (shipOverlap(mouseGridX + i, mouseGridY)) {
                    board[mouseGridX + i][mouseGridY] = '-';
                } else {
                    board[mouseGridX + i][mouseGridY] = selectedShip;
                }
            }
        }
        gameView.renderBoard(board);
    }
});

// create ship object and store in player ships
document.getElementById('board').addEventListener('click', () => {
    const shipPlacementPos = [];
    let overlap = false;
    
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) { 
            if (board[i][j] === '-') {
                overlap = true;
            }
        }
    }

    //gather ship current ship position
    if (gameState == 'placement' && selectedShip && !overlap) {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (board[i][j] === selectedShip) {
                    shipPlacementPos.push([i, j]);
                }
            }
        }
        // create ship object 
        playerShips.push(
            {
                type: selectedShip, 
                positions: shipPlacementPos
            }
        );
        selectedShip = '';
    }
})

// rotate ship
document.addEventListener('keydown', event => {
    const keyCode = event.keyCode;

    if (keyCode === 32) {
        if (shipPlacementDirection === 'horizontal') {
            shipPlacementDirection = 'vertical';
        } else if (shipPlacementDirection === 'vertical') {
            shipPlacementDirection = 'horizontal';
        }
    }
    console.log(shipPlacementDirection);
});

function placePlayerShips() {
    if (playerShips) {
        playerShips.forEach(ship => {
            ship.positions.forEach(pos => {
                board[pos[0]][pos[1]] = ship.type;
            })
        })
    }
}

function shipOverlap(x, y) {
    return board[x][y] != '~';
};


// reset ships clearing the board
document.getElementById('reset').addEventListener('click', () => {
    playerShips = [];
    createBoard();
    gameView.renderBoard(board);
});

// commit player ship placement to small board view
document.getElementById('ready').addEventListener('click', () => {
    createPlayerBoard();
    gameView.renderPlayerBoard(playerBoard);
    createBoard();
    placeShips();
    gameView.renderBoard(board);
    gameState = 'game';
});

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
                    board[y][i] = ship;
                }
            } else if (direction === 'vertical') {
                for (let i = y; i < (y + ships[ship].size); i++) {
                    board[i][x] = ship;
                }
            }
    }
}

// checks if ship has been hit enough times to sink 
function checkForSunk(ship) {
        if (ships[ship].hits === ships[ship].size) {
            console.log(`you sunk a ${ships[ship].type}!`)
            return true;
        }
}

// determine whether player has made a hit
document.getElementById('board').addEventListener('click', event => {
    if (gameState === 'game') {
        const gridElement = event.target;
        const clickPosition = event.target.id.split('-');
        const x = +clickPosition[0];
        const y = +clickPosition[1];
        if (board[x][y] !== '~') {
            const ship = board[x][y];
            console.log('HIT');
            ships[ship].hits += 1;
            board[x][y] = "X"
            gridElement.classList.add('hit');
            gridElement.innerHTML = '&#10005'; 

            if (checkForSunk(ship)) {
                document.querySelector(`#${ship}`).style.backgroundColor = 'blue';
                document.querySelector(`#${ship}`).style.color = 'white';
                document.querySelector(`#${ship}`).style.textDecoration = 'line-through';
            }
        } else {
            gridElement.innerHTML = '&#10005'; 
        }
        determineWinner();
    }
})

// logic to determine winner
function determineWinner() {
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

createBoard();
createPlayerBoard();
// placeShips();

gameView.renderBoard(board);
gameView.renderPlayerBoard(playerBoard);
gameView.renderShipList(ships);
console.log(board);
console.log(ships);
