const createP = (name, sign)   => {
    return {name, sign};
}

const gameArea = (() => {

    let board = [];
    for(i=0; i < 9; i++){
        board.push('');
    }

    let boxes = document.querySelector('.boxes');

    board.forEach((item, index) => {
        const box = document.createElement('div');
        box.className = 'box';
        boxes.appendChild(box);
    })

    Array.from(boxes.children).forEach((box, index) =>{
        box.addEventListener('click', () =>{
            box.classList.add(game.activePlayer.sign);
            box.setAttribute('data', game.activePlayer.sign);
            board[index] = game.activePlayer.sign;
            box.style.pointerEvents = 'none';
            game.remainingSpots -= 1;
            game.checkWinner();
            if(game.gameOver == false) {
                if(game.remainingSpots > 0) {
                    game.upNext();
                    game.upNow();
                } else if (game.remainingSpots == 0) {
                    game.declareTie();
                }
            }
        })
    });

    

    return {
        board
    };
})();


const game = (() => {

    const pOne = createP('P1', 'X');
    const pTwo = createP('P2', 'O');

    let activePlayer = pOne;
    let gameOver = false;
    let remainingSpots = 9;

    let subtext = document.querySelector('.subtext');
    let playerName = document.querySelector('.player-name')

    const winLine = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    function checkWinner() {
        winLine.forEach((item, index) => {
            if(gameArea.board[item[0]]=== this.activePlayer.sign && gameArea.board[item[1]] === this.activePlayer.sign && gameArea.board[item[2]] === this.activePlayer.sign) {
                console.log('winner');
                subtext.innerHTML = `<b>${this.activePlayer.name} wins!</b>`;
                this.gameOver = true;
            }
        })
    }

    function upNext() {
        this.activePlayer === pOne ? playerName.textContent = 'P2' : playerName.textContent = 'P1';
    }

    function upNow() {
        this.activePlayer === pOne ? this.activePlayer = pTwo : this.activePlayer = pOne;
        console.log('upNow() func ran')
        console.log('active player: ' + activePlayer.name);
    }

    function declareTie() {
        subtext.innerHTML = "<b>Its a Tie Game!</b>";
    }

    return {
        activePlayer,
        remainingSpots,
        checkWinner,
        upNext,
        upNow,
        declareTie,
        gameOver,
    };
})();

const erase = document.querySelector('.eraseB');
erase.onclick = function() {
    return document.location.reload();
}