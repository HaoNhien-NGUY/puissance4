jQuery(document).ready(function () {

    $('#game-area').puissance4();
});

$.fn.puissance4 = function (options) {
    let settings = $.extend({
        colors: ['red', 'yellow'],
        gridX: 7,
        gridY: 6
    }, options);

    if (settings.colors[0] == settings.colors[1]) {
        colorP1 = 'red';
        colorP2 = 'yellow';
    } else {
        colorP1 = settings.colors[0];
        colorP2 = settings.colors[1];
    }

    if (settings.gridX < 4) {
        gridX = 4;
    }
    else {
        gridX = settings.gridX;
    }
    if (settings.gridY < 4) {
        gridY = 4;
    } else {
        gridY = settings.gridY;
    }

    //------------- player logic -----------//
    playerID = 1;
    class player {
        constructor(name, color) {
            this.name = name;
            this.color = color;
            this.id = playerID++;
        }

        addPon(col) {
            let i = 0;
            // console.log(col);
            while (board.array[col][i].state != 0) {
                i++;
            }
            board.array[col][i].changeState(this.id);
        }
    };


    //--------------gameboard ------------//
    class gameBoard {
        constructor(gridX, gridY, player) {
            this.gridX = gridX;
            this.gridY = gridY;
            this.currentPLayer = player;
            this.array = [];
        }

        createBoard(gamediv) {
            for (var i = 0; i < this.gridX; i++) {
                var col = $('<div>');
                this.array.push([]);
                $(gamediv).append(col.attr('id', i).attr('class', 'col'));
                col.on('click', function(){
                    board.currentPLayer.addPon($(this).attr('id'));
                    board.changePlayer();
                });

                for (var y = this.gridY-1; y >= 0; y--) {
                    var row = $('<div>');
                    this.array[i].push(new boardCell(i, y, row, 0));
                    col.append(row.attr('class', 'row ' + y).text(''));
                }
                this.array[i].reverse();
            }
        }

        changePlayer() {
            if (this.currentPLayer == player1){
                this.currentPLayer = player2;
            }else{
                this.currentPLayer = player1;
            }
        }
    }

    //----------boardcell ------------//
    class boardCell {
        constructor(x, y, cell, state) {
            this.x = x;
            this.y = y;
            this.state = state;
            this.cell = cell;
        }

        changeState(state) {
            this.state = state;
            if(state == 1){
                this.cell.css('background-color', colorP1);
            }else{
                this.cell.css('background-color', colorP2);
            }
        }
    }

    
    var player1 = new player('player1', colorP1);
    var player2 = new player('player2', colorP2);
    
    var board = new gameBoard(gridX, gridY, player1);

    board.createBoard(this);

    return this;
};