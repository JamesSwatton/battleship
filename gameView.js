const gameView = {
    renderBoard(board) {
        const boardContainer = document.getElementById('board');
        boardContainer.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const gridSection = document.createElement('div');
                gridSection.id = `${i}-${j}`;
                if (board[i][j] !== '~') {
                    gridSection.className = 'grid ship';
                } else {
                    gridSection.className = 'grid water';
                }
                boardContainer.appendChild(gridSection);
            }
        }
    },

    renderShipList(ships) {
        for (ship in ships) {
            const enemyShipList = document.getElementById('enemy-ship-list');  
            const shipText = document.createElement('div');
            shipText.className = 'ship-item';
            shipText.id = ship;
            shipText.textContent = ships[ship].type;
            enemyShipList.appendChild(shipText);
            enemyShipList.appendChild(document.createElement('br'));
        }
    }

}
