const enemyBoard = Object.create(Board);
const playerBoard = Object.create(Board);
let gameState = 'placement';

// let playerPlacement = true;
let playerShips = [];
let selectedShipType;
let selectedShip;
let selectedOrientation = 'horizontal';


// --- HERE IS HOW THE PLAYER SELECTS AND PLACES EACH SHIP ---
//
// select ship to place 
document.querySelector('#enemy-ship-list').addEventListener('click', event => {
    selectedShipType = event.target.parentElement.parentElement.id;
    selectedShip = playerBoard.getShip(selectedShipType);
}) 

// display ship at mouse location 
document.querySelector('#board').addEventListener('mouseover', event => {
    if (gameState === 'placement' && selectedShip) {
        const mouseGridPos = event.target.id.split('-');
        let mouseGridX = +mouseGridPos[1];
        let mouseGridY = +mouseGridPos[0];

        playerBoard.createBlankBoard();
        playerBoard.board = playerBoard.tempBoard;
        // console.log(playerBoard.tempBoard);
        // placePlayerShips();
        if (selectedOrientation === 'horizontal') {
            if (!playerBoard.isWithinboard(mouseGridX, selectedShip)) {
                mouseGridX = 10 - selectedShip.size;
            }
            playerBoard.placeShip(mouseGridX, mouseGridY, selectedOrientation, selectedShip)
            // for (let i = 0; i < selectedShip.size; i++) {
                // if (shipOverlap(mouseGridX, mouseGridY + i)) {
                //     board[mouseGridX][mouseGridY + i] = '-';
                // } else {
                    // if (mouseGridY + i >= 10) {
                    //     return 
                    // } else {
                    //     playerBoard.board[mouseGridX][mouseGridY + i] = selectedShip;
                    // }
                // } 
            // }
            } else if (selectedOrientation === 'vertical') {
                if (!playerBoard.isWithinboard(mouseGridY, selectedShip)) {
                    mouseGridY = 10 - selectedShip.size;
                }
            playerBoard.placeShip(mouseGridX, mouseGridY, selectedOrientation, selectedShip)
                // for (let i = 0; i < selectedShipSize; i++) {
                    // if (shipOverlap(mouseGridX + i, mouseGridY)) {
                    //     board[mouseGridX + i][mouseGridY] = '-';
                // } else {
                    // playerBoard.board[mouseGridX + i][mouseGridY] = selectedShip;
                // }
            }
        // }
        gameView.renderBoard(playerBoard.board, 'board');
    }
});

// capture temporary ship placement
document.getElementById('board').addEventListener('click', event => {
    selectedShip = '';
    playerBoard.tempBoard = playerBoard.board;
    // console.log(playerBoard.tempBoard);
})

// create ship object and store in player ships
//document.getElementById('board').addEventListener('click', () => {
//    const shipPlacementPos = [];
//    let overlap = false;
    
//    for (let i = 0; i < 10; i++) {
//        for (let j = 0; j < 10; j++) { 
//            if (board[i][j] === '-') {
//                overlap = true;
//            }
//        }
//    }

//    //gather ship current ship position
//    if (gameState == 'placement' && selectedShip && !overlap) {
//        for (let i = 0; i < 10; i++) {
//            for (let j = 0; j < 10; j++) {
//                if (board[i][j] === selectedShip) {
//                    shipPlacementPos.push([i, j]);
//                }
//            }
//        }
//        // create ship object 
//        playerShips.push(
//            {
//                type: selectedShip, 
//                positions: shipPlacementPos
//            }
//        );
//        selectedShip = '';
//    }
//})

//// rotate ship
document.addEventListener('keydown', event => {
    const keyCode = event.keyCode;

    if (keyCode === 32) {
        if (selectedOrientation === 'horizontal') {
            selectedOrientation = 'vertical';
        } else if (selectedOrientation === 'vertical') {
            selectedOrientation = 'horizontal';
        }
    }
});

//function placePlayerShips() {
//    if (playerShips) {
//        playerShips.forEach(ship => {
//            ship.positions.forEach(pos => {
//                board[pos[0]][pos[1]] = ship.type;
//            })
//        })
//    }
//}

//function shipOverlap(x, y) {
//    return board[x][y] != '~';
//};


//// reset ships clearing the board
//document.getElementById('reset').addEventListener('click', () => {
//    playerShips = [];
//    createBoard();
//    gameView.renderBoard(board);
//});

//// commit player ship placement to small board view
//document.getElementById('ready').addEventListener('click', () => {
//    createPlayerBoard();
//    gameView.renderPlayerBoard(playerBoard);
//    createBoard();
//    placeShips();
//    gameView.renderBoard(board);
//    gameState = 'game';
//});

//// checks if ship has been hit enough times to sink 
//function checkForSunk(ship) {
//        if (ships[ship].hits === ships[ship].size) {
//            console.log(`you sunk a ${ships[ship].type}!`)
//            return true;
//        }
//}

//// determine whether player has made a hit
//document.getElementById('board').addEventListener('click', event => {
//    if (gameState === 'game') {
//        const gridElement = event.target;
//        const clickPosition = event.target.id.split('-');
//        const x = +clickPosition[0];
//        const y = +clickPosition[1];
//        if (board[x][y] !== '~') {
//            const ship = board[x][y];
//            console.log('HIT');
//            ships[ship].hits += 1;
//            board[x][y] = "X"
//            gridElement.classList.add('hit');
//            gridElement.innerHTML = '&#10005'; 

//            if (checkForSunk(ship)) {
//                document.querySelector(`#${ship}`).style.backgroundColor = 'blue';
//                document.querySelector(`#${ship}`).style.color = 'white';
//                document.querySelector(`#${ship}`).style.textDecoration = 'line-through';
//            }
//        } else {
//            gridElement.innerHTML = '&#10005'; 
//        }
//        determineWinner();
//    }
//})

//// logic to determine winner
//function determineWinner() {
//    let numOfHits = 0
//    for (let i = 0; i < 10; i++) {
//        for (let j = 0; j < 10; j++) {
//            if (board[i][j] === 'X') {
//                numOfHits += 1;
//            } 
//        }
//    }
//    return numOfHits === 17;
//}

// createPlayerBoard();
enemyBoard.createBlankBoard();
// enemyBoard.randomlyPlaceShips();
gameView.renderBoard(enemyBoard.board, 'board');
gameView.renderShipList(enemyBoard.ships);

playerBoard.createBlankBoard();
playerBoard.tempBoard = playerBoard.board;
gameView.renderBoard(playerBoard.board, 'player-board')

// gameView.renderPlayerBoard(playerBoard);
// console.log(board);
// console.log(ships);
