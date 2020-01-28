let playerPlacement = true;
let playerShips = {};
let selectedShip;
let shipPlacementDirection = 'horizontal';

let board = [];

function createBoard() {
    board = [];
    for (let i = 0; i < 10; i++) {
        board[i] = [];
        for (let j = 0; j < 10; j++) {
            board[i][j] = '~';
        }
    }
};

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

// when player placement mode is on/true randomly place a ship by
// clicking on ship list, then allow player to move it to desired location
document.querySelector('#enemy-ship-list').addEventListener('click', event => {
    selectedShip = event.target.id;
    // console.log(ships[selectedShip]);
    // placeAShip(selectedShip);
    // gameView.renderBoard(board);
}) 

document.querySelector('#board').addEventListener('mouseover', event => {
    const mouseGridPos = event.target.id.split('-');
    const mouseGridX = +mouseGridPos[0];
    const mouseGridY = +mouseGridPos[1];
    const selectedShipSize = ships[selectedShip].size;

    createBoard();
    if (shipPlacementDirection === 'horizontal') {
        for (let i = 0; i < selectedShipSize; i++) {
            board[mouseGridX][mouseGridY + i] = selectedShip;
        } 
    } else if (shipPlacementDirection === 'vertical') {
        for (let i = 0; i < selectedShipSize; i++) {
            board[mouseGridX + i][mouseGridY] = selectedShip;
        }
    }
    gameView.renderBoard(board);
});

document.getElementById('board').addEventListener('click', event => {
    const shipPlacementPos = [];
    if (playerPlacement && selectedShip) {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (board[i][j] === selectedShip) {
                    shipPlacementPos.push([i, j]);
                }
            }
        }
        playerShips[selectedShip] = shipPlacementPos;
        console.log(playerShips);
        selectedShip = '';
    }
})

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


// function placeAShip(ship) {
//     let direction = horizonatalOrVertical();
//     let startPositions = calcStartPositions(ships[ship], direction);
//     let randIndex = Math.floor(Math.random() * Math.floor(startPositions.length));
//     let randStartPos = startPositions[randIndex]; 
//     let x = randStartPos[0];
//     let y = randStartPos[1];

//     if (direction === 'horizontal') {
//         for (let i = x; i < (x + ships[ship].size); i++) {
//             board[y][i] = ship;
//         }
//     } else if (direction === 'vertical') {
//         for (let i = y; i < (y + ships[ship].size); i++) {
//             board[i][x] = ship;
//         }
//     }
// }

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

function checkForSunk(ship) {
        if (ships[ship].hits === ships[ship].size) {
            console.log(`you sunk a ${ships[ship].type}!`)
            return true;
        }
}

// determine whether player has made a hit
document.getElementById('board').addEventListener('click', event => {
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
        
        console.log(ships);
    } else {
        gridElement.innerHTML = '&#10005'; 
    }

    determineWinner();
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
// placeShips();

gameView.renderBoard(board);
gameView.renderShipList(ships);
console.log(board);
console.log(ships);
