const board = []

const horVert = [
    "horizontal", 
    "vertical"
]

function horizonatalOrVertical() {
    const randIndex = Math.floor(Math.random() * Math.floor(2));
    return horVert[randIndex];
}

function createBoard() {
    for (let i = 0; i < 8; i++) {
        board[i] = [];
        for (let j = 0; j < 8; j++) {
            board[i][j] = '~';
        }
    }
}

createBoard();
console.log(board);
