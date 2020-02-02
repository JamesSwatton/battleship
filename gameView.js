const gameView = {
    renderBoard(board, elementId) {
        const boardContainer = document.getElementById(`${elementId}`);
        boardContainer.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const gridSection = document.createElement('div');
                gridSection.id = `${j}-${i}`;
                if (board[i][j] !== '~') {
                    if (board[i][j] === '!') {
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

    renderShipList(ships) {
        ships.forEach(ship => {
            const enemyShipList = document.getElementById('enemy-ship-list');  
            const shipItem = document.createElement('div');
            shipItem.className = 'ship-item';
            shipItem.id = ship.type;
            const shipText = document.createElement('p')
            shipText.id = `${ship.type}-text`;
            shipText.textContent = ship.type;
            shipItem.appendChild(shipText);
            const shipGrid = document.createElement('div');
            shipGrid.id = `${ship.type}-grid`;
            shipGrid.className = 'ship-grid';
            for (let i = 0; i < ship.size; i++) {
                const shipPart = document.createElement('div');
                shipPart.className = 'grid';
                shipGrid.appendChild(shipPart);
            }
            shipItem.appendChild(shipGrid);
            
            enemyShipList.appendChild(shipItem);
            // enemyShipList.appendChild(document.createElement('br'));
        });
    }

}
