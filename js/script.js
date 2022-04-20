'use strict';

document.addEventListener('DOMContentLoaded', ready);

function ready() {
    const cells = $('.cell');
    const whoseTurn = $('#whoseTurn');
    const outcome = $('#outcome');
    const restartBtn = $('#restart');
    let currentPlayer = 'X';

    restartBtn.on('click', () => {
        cells.text(' ');
        cells.removeClass('playerX playerO');
        outcome.text('');
        whoseTurn.text("Player X's turn");
        currentPlayer = 'X';
    });
    cells.on('click', (e) => makeMove(e.target));

    function makeMove(cell) {
        if (cell.innerHTML !== ' ') return false;
        if (checkWinner($('.cell').text()) !== null) return false;
        cell.innerHTML = currentPlayer;
        cell.classList.add(`player${currentPlayer}`);
        const winner = checkWinner($('.cell').text());
        switch(winner) {
            case(currentPlayer):
                outcome.text(`The winner is ${currentPlayer}`);
                break;
            case('Draw'):
                outcome.text("It's a draw");
                break;
            default:
                changePlayer();
        }
    }

    function changePlayer() {
        currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
        whoseTurn.text(`Player ${currentPlayer}'s turn`);
    }

    function checkWinner(board) {
        const rows = [board.slice(0, 3), board.slice(3, 6), board.slice(6)];
        const columns = sliceString(board, 0, 9, 3, true);
        const fdiagonal = sliceString(board, 0, 9, 4);
        const bdiagonal = sliceString(board, 2, 8, 2);
        const all_options = rows.concat(columns, fdiagonal, bdiagonal);

        for (const alignment of all_options) {
            if (alignment === alignment[0] + alignment[0] + alignment[0] && alignment !== '   ') {
                return alignment[0];
            }
        }
        return (board.includes(' ')) ? null : 'Draw';
    }
    
    // helper function to ease matrix traversion with different step value
    function sliceString(text, start=0, end=text.length, step=1, traverseRow=false) {
        const slices = [];
        const traverseEnd = (traverseRow) ? end / step : start + 1;
        for (let i = start; i < traverseEnd; i++) {
            let slice = text[i];
            for (let j = step; j < end - start; j += step) {
                slice += text[i + j];
            }
            slices.push(slice);
        }
        return slices;
    }

}