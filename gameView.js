const gameView = {
    renderBoard(board) {
        const boardContainer = document.getElementById('board');
        boardContainer.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const gridSection = document.createElement('div');
                gridSection.id = `${i}-${j}`;
                if (board[i][j] !== '~') {
                    if (board[i][j] === '-') {
                        gridSection.className = 'grid overlap';
                    } else {
                        gridSection.className = 'grid ship';
                    }
                } else {
                    gridSection.className = 'grid water';
                }
                boardContainer.appendChild(gridSection);
            }
        }
    },

    renderPlayerBoard(board) {
        const boardContainer = document.getElementById('player-board');
        boardContainer.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const gridSection = document.createElement('div');
                // gridSection.id = `${i}-${j}`;
                if (board[i][j] !== '~') {
                    if (board[i][j] === '-') {
                        gridSection.className = 'grid overlap';
                    } else {
                        gridSection.className = 'grid ship';
                    }
                } else {
                    gridSection.className = 'grid water';
                }
                boardContainer.appendChild(gridSection);
            }
        }
    },

    // TODO: display a grid representation of the ship next to 
    // the ship name
    renderShipList(ships) {
        for (ship in ships) {
            const enemyShipList = document.getElementById('enemy-ship-list');  
            const shipItem = document.createElement('div');
            shipItem.className = 'ship-item';
            shipItem.id = ship;
            const shipText = document.createElement('p')
            shipText.id = ship;
            shipText.textContent = ship;
            shipItem.appendChild(shipText);
            const shipGrid = document.createElement('div');
            shipGrid.className = 'ship-grid';
            for (let i = 0; i < ships[ship].size; i++) {
                const shipPart = document.createElement('div');
                shipPart.className = 'grid';
                shipGrid.appendChild(shipPart);
            }
            shipItem.appendChild(shipGrid);
            
            enemyShipList.appendChild(shipItem);
            enemyShipList.appendChild(document.createElement('br'));
        }
    }

}
