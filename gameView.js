const gameView = {
    renderBoard(board) {
        const boardContainer = document.getElementById('board');
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const gridSection = document.createElement('div');
                gridSection.id = `${i}-${j}`;
                if (board[i][j] === 1) {
                    gridSection.className = 'ship';
                } else {
                    gridSection.className = 'water';
                }
                boardContainer.appendChild(gridSection);
            }
        }
    }
}
