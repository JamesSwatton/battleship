const game = Object.create(Game);
const enemyBoard = Object.create(Board);
const playerBoard = Object.create(Board);

const gameStates = ["placement", "game"];
let currentGameState = gameStates[0];
let selectedShipType;
let selectedShip;
let selectedOrientation = "horizontal";

// initial setup
enemyBoard.createBlankBoard();
playerBoard.createBlankBoard();
gameView.renderBoard(enemyBoard.board, "board");
gameView.renderBoard(playerBoard.board, "player-board");
gameView.renderShipList(playerBoard.ships);

// --- HERE IS HOW THE PLAYER SELECTS AND PLACES EACH SHIP ---
//
// select ship to place
document.querySelector("#enemy-ship-list").addEventListener("click", event => {
    selectedShipType = event.target.parentElement.parentElement.id;
    selectedShip = playerBoard.getShip(selectedShipType);
    document
        .getElementById(`${selectedShipType}-grid`)
        .classList.remove("clicked");
});

// display ship at mouse location
document.querySelector("#board").addEventListener("mouseover", event => {
    if (currentGameState === "placement" && selectedShip) {
        selectedShip.orientation = selectedOrientation;
        const mouseGridPos = event.target.id.split("-");
        let mouseGridX = +mouseGridPos[0];
        let mouseGridY = +mouseGridPos[1];
        selectedShip.startPos = [mouseGridX, mouseGridY];

        // capture the selectedShip start position by deselecting the ship
        document.getElementById("board").addEventListener("click", () => {
            if (currentGameState === "placement") {
                if (!playerBoard.overlap) {
                    console.log(selectedShipType);
                    document
                        .getElementById(`${selectedShipType}-grid`)
                        .classList.toggle("clicked");
                    // document.getElementById(`${selectedShipType}-grid`).style.backgroundColor = 'lightgray';
                    selectedShip = "";

                    // TODO: figure out why this line is throwing an error...
                    // selectedShipType = "";
                }
            }
        });

        playerBoard.createBlankBoard();
        playerBoard.ships.forEach(ship => {
            if (ship.startPos) {
                playerBoard.placeShip(ship);
            }
        });

        if (selectedOrientation === "horizontal") {
            if (!playerBoard.isWithinboard(mouseGridX, selectedShip)) {
                selectedShip.startPos[0] = 10 - selectedShip.size;
            }
            playerBoard.placeShip(selectedShip);
        } else if (selectedOrientation === "vertical") {
            if (!playerBoard.isWithinboard(mouseGridY, selectedShip)) {
                selectedShip.startPos[1] = 10 - selectedShip.size;
            }
            playerBoard.placeShip(selectedShip);
        }
        gameView.renderBoard(playerBoard.board, "board");
    }
});

//// rotate ship
document.addEventListener("keydown", event => {
    const keyCode = event.keyCode;

    if (keyCode === 32) {
        if (selectedOrientation === "horizontal") {
            selectedOrientation = "vertical";
        } else if (selectedOrientation === "vertical") {
            selectedOrientation = "horizontal";
        }
    }
});

//// reset ships clearing the board
document.getElementById("reset").addEventListener("click", () => {
    // is this cheating?
    location.reload();
    // playerBoard.ships.forEach(ship => {
    //     ship.startPos = [];
    //     ship.orientation = '';
    // })
    // // reset grid-ship background colour
    // let shipGrids = document.getElementsByClassName('clicked');
    // console.log(shipGrids);
    // for (let i = 0; i < shipGrids.length; i++) {
    //     console.log('hi')
    //     shipGrids[i].classList.toggle('clicked');
    // }
    // playerBoard.createBlankBoard();
    // gameView.renderBoard(playerBoard.board, 'board');
});

//// commit player ship placement to small board view
document.getElementById("ready").addEventListener("click", () => {
    if (playerBoard.hasPlacedAllShips()) {
        // reset grid-ship background colour
        let shipGrids = document.getElementsByClassName("ship-grid");
        for (let i = 0; i < shipGrids.length; i++) {
            shipGrids[i].classList.remove("clicked");
        }
        gameView.renderBoard(playerBoard.board, "player-board");
        enemyBoard.createBlankBoard();
        enemyBoard.randomlyPlaceShips();
        gameView.renderBoard(enemyBoard.board, "board");
        currentGameState = gameStates[1];
    }
});

// --- GAME LOGIC ---
//
// determine whether player has made a hit and check for winner
document.getElementById("board").addEventListener("click", event => {
    if (currentGameState === "game") {
        const gridElement = event.target;
        const clickPosition = event.target.id.split("-");
        const x = +clickPosition[0];
        const y = +clickPosition[1];

        if (game.isHit(x, y, enemyBoard.board)) {
            // update board
            const shipType = enemyBoard.board[y][x];
            enemyBoard.getShip(shipType).hits += 1;
            enemyBoard.board[y][x] = "X";

            // render hit
            gridElement.classList.add("hit");
            gridElement.innerHTML = "&#10005";

            if (game.checkForSunk(shipType, enemyBoard.ships)) {
                // document.querySelector(`#${shipType}-text`).style.backgroundColor = 'blue';
                // document.querySelector(`#${shipType}-text`).style.color = 'white';
                document.querySelector(
                    `#${shipType}-text`
                ).style.textDecoration = "line-through";
                document
                    .getElementById(`${shipType}-grid`)
                    .classList.add("hit");
            }
        } else {
            // render miss
            gridElement.innerHTML = "&#10005";
        }
        game.determineWinner(enemyBoard.board);
    }
});
