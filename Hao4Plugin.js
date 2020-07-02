jQuery(document).ready(function () {

    let settings = {};

    $('#settings-p1name').on('click', function () {
        $(this).val('');
    });
    $('#settings-p2name').on('click', function () {
        $(this).val('');
    });
    $('#settings-save').on('click', function () {
        settings.P1name = $('#settings-p1name').val();
        settings.P2name = $('#settings-p2name').val();
        settings.colors = [$("#settings-p1color option:selected").val(), $("#settings-p2color option:selected").val()];
        settings.gridX = $('#settings-cols').val();
        settings.gridY = $('#settings-rows').val();
        $('#game-settings').toggle();
        $('#main-menu').toggle();
    });
    $('#btn-1-player').on('click', function () {
        settings.ai = 1;
        $('#gamesection').css('display', 'flex');
        $('#game-area').puissance4(settings);
        $('#welcome-page').slideToggle();
    });
    $('#btn-2-player').on('click', function () {
        $('#gamesection').css('display', 'flex');
        $('#game-area').puissance4(settings);
        $('#welcome-page').slideToggle();
    });

    $('#btn-settings').on('click', function () {
        $('#main-menu').toggle();
        $('#game-settings').toggle();
    });
    $('.p1').on('click', function () {
        $('.p1').css('border', 'solid 1px black');
        $(this).css('border', 'solid 1px rgb(235, 235, 235)');
        settings.P1img = $(this).attr('id');
    });
    $('.p2').on('click', function () {
        $('.p2').css('border', 'solid 1px black');
        $(this).css('border', 'solid 1px rgb(235, 235, 235)');
        settings.P2img = $(this).attr('id');
    });

});

$.fn.puissance4 = function (options) {
    let settings = $.extend({
        P1name: 'PEPEGA',
        P2name: 'AYAYA',
        colors: ['red', 'yellow'],
        gridX: 7,
        gridY: 6,
        P1img: 'pepega',
        P2img: 'ayaya'
    }, options);


    $('.p1img').addClass(settings.P1img);
    $('.p2img').addClass(settings.P2img);

    if (settings.colors[0] == settings.colors[1]) {
        colorP1 = 'red';
        colorP2 = 'yellow';
    } else {
        colorP1 = settings.colors[0];
        colorP2 = settings.colors[1];
    }

    if (settings.gridX < 5) {
        gridX = 5;
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
            this.score = 0;
            this.lastplayed = [0,0];
        }

        addPon(col) {
            let i = 0;
            while (typeof board.array[col][i] !== 'undefined' && board.array[col][i].state != 0) {
                i++;
            }
            if (i != (board.gridY)) {
                board.display.animate(col, i, this);
                this.lastplayed = [col, i];
                board.winCheck(col, i, this);
                board.changePlayer();
            }
        }

        calculateCol() {
            let horizblck = horizontalblock(board.playhistory.y, board.playhistory.state);
            let horiwin = horizontalblock(this.lastplayed[1], this.id);
            if(horiwin !== false){
                this.addPon(horiwin);
            }
            else if(verticalblock(this.lastplayed[0], this.lastplayed[1], this.id) !== false){
                this.addPon(this.lastplayed[0]);
            }
            else if(horizblck !== false){
                this.addPon(horizblck);
            }else if(verticalblock(board.playhistory.x, board.playhistory.y, board.playhistory.state) !== false){
                this.addPon(board.playhistory.x);
            }else{
                this.addPon(Math.floor(Math.random() * (board.gridX - 1)));
            }
        }
    };


    //--------------gameboard ------------//
    class gameBoard {
        constructor(gridX, gridY, player) {
            this.gridX = gridX;
            this.gridY = gridY;
            this.currentPLayer = player;
            this.array = [];
            this.display = new display();
            this.playhistory = 0;
        }

        createBoard(gamediv) {
            $(gamediv).append('<div class="scoreboard"><div id="currentplayer" style="color:' + colorP1 + ';"><b>' + settings.P1name + '</b> \'s turn.</div></div>');
            $(gamediv).append('<div id="placeholder"></div>');
            $(gamediv).append('<div id="borderboard">');
            let borderboard = $('#borderboard');
            let placeholder = $('#placeholder');
            $('#P1name').text(settings.P1name + " : ").css('color', colorP1);
            $('#P2name').text(settings.P2name + " : ").css('color', colorP2);
            $('#P1score').text('0');
            $('#P2score').text('0');

            for (let i = 0; i < this.gridX; i++) {
                var col = $('<div>');
                let PHcol = $('<div class="phcol">');
                placeholder.append(PHcol);
                this.array.push([]);
                $(gamediv).append(col.attr('class', 'col'));

                var clickDisabled = false;
                col.on('click', function () {
                    if (clickDisabled)
                        return;
                    board.currentPLayer.addPon(i);
                    if (settings.ai) {
                        PHcol.removeClass('active');
                        setTimeout(() => {
                            board.currentPLayer.calculateCol();
                        }, 500);

                        clickDisabled = true;
                        setTimeout(function () { clickDisabled = false; }, 900);
                    }
                });

                col.on('mouseover', function () {
                    if (clickDisabled)
                        return;
                    PHcol.addClass('active');
                    $(this).on('mouseout', function () {
                        PHcol.removeClass('active');
                    })
                });

                for (var y = this.gridY - 1; y >= 0; y--) {
                    var row = $('<div>');
                    var pawn = $('<div>');
                    this.array[i].push(new boardCell(i, y, pawn, 0, ((this.gridY - y) * (-90))));
                    col.append(row.attr('class', 'row'));
                    row.append(pawn.attr('class', 'pawn').css('transform', 'translateY(' + ((this.gridY - y) * (-90)) + 'px)').text(''));
                }
                this.array[i].reverse();
                borderboard.append(col);
            }
            $(gamediv).append('<button id="reset-btn">Reset / Change player</button>');
            $(gamediv).append('<button id="home-btn" style="margin-top:10px;">HOME</button>');

            $('.phcol').css('background-color', colorP1);//.addClass('pepega');
        }

        changePlayer() {
            if (this.currentPLayer == player1) {
                this.currentPLayer = player2;
                $('.phcol').css('background-color', colorP2);
                this.display.showCurrentPlayer(this.currentPLayer);
            } else {
                this.currentPLayer = player1;
                $('.phcol').css('background-color', colorP1);
                this.display.showCurrentPlayer(this.currentPLayer);
            }
        }

        resetBoard() {
            this.array.forEach(column => {
                column.forEach(element => {
                    element.changeState(0);
                })
            });
        }

        cancelPlay() {
            if (this.playhistory != 0) {
                this.playhistory.changeState(0);
                this.playhistory = 0;
                this.changePlayer();
            }
        }

        async winCheck(col, row, player) {
            if (this.horizontalCheck(row, player) || this.verticalCheck(col, row, player) || this.diagonalCheck(col, row, player)) {
                function winnerAlert() {
                    var promise = new Promise(function(resolve, reject) {
                      setTimeout(function() {
                        resolve(true);
                      }, 400);
                    });
                    return promise;
                }

                player.score++;
                this.display.updateScore(player);
                await winnerAlert();
                alert(player.name + " WINS !");
                this.resetBoard();
                return true;
            }
            if (row == (this.gridY - 1)) {
                for (let i = 0; i < (this.gridX); i++) {
                    if (this.array[i][row].state == 0) {
                        return false;
                    }
                }
                alert('No winner');
                this.resetBoard();
            }
        }

        horizontalCheck(row, player) {
            for (let i = 0; i < this.gridX - 3; i++) {
                if (this.array[i][row].state == player.id && this.array[i + 1][row].state == player.id && this.array[i + 2][row].state == player.id && this.array[i + 3][row].state == player.id) {
                    return true;
                }
            }
            return false;
        }

        verticalCheck(col, row, player) {
            if (row > 2) {
                if (this.array[col][row].state == player.id && this.array[col][row - 1].state == player.id && this.array[col][row - 2].state == player.id && this.array[col][row - 3].state == player.id) {
                    return true;
                }
            }
            return false;
        }

        diagonalCheck(col, row, player) {
            let startLeft = startPoint(col, row)[0];
            let startRight = startPoint(col, row)[1];

            if (startLeft[0] < (this.gridX - 3) && (startLeft[1] + 3) < (this.gridY)) {
                let y = startLeft[1];
                for (let i = startLeft[0]; i < (this.gridX - 3) && (y + 3 < this.gridY); i++) {
                    if (this.array[i][y].state == player.id && this.array[i + 1][y + 1].state == player.id && this.array[i + 2][y + 2].state == player.id && this.array[i + 3][y + 3].state == player.id) {
                        return true;
                    }
                    y++;
                }
            }
            if (startRight[0] > 2 && (startRight[1] + 3) < (this.gridY)) {
                let y = startRight[1];
                for (let i = startRight[0]; i > 2 && (y + 3) < (this.gridY); i--) {

                    if (this.array[i][y].state == player.id && this.array[i - 1][y + 1].state == player.id && this.array[i - 2][y + 2].state == player.id && this.array[i - 3][y + 3].state == player.id) {
                        return true;
                    }
                    y++;
                }
            }
            return false;
        }
    }

    //----------boardcell ------------//
    class boardCell {
        constructor(x, y, cell, state, offset) {
            this.x = x;
            this.y = y;
            this.state = state;
            this.cell = cell;
            this.translateY = offset;
        }

        changeState(state) {
            this.state = state;
            if (state == 0) {
                this.cell.removeClass(settings.P2img).removeClass(settings.P1img);
                this.cell.css({ "transform": "translateY(" + this.translateY + "px)", "opacity": "0", "transition": "transform 0.4s ease-in" });
            }
            else if (state == 1) {
                this.cell.addClass(settings.P1img).removeClass(settings.P2img);
                this.cell.css('background-color', colorP1);
            } else {
                this.cell.addClass(settings.P2img).removeClass(settings.P1img);
                this.cell.css('background-color', colorP2);
            }
            board.playhistory = this;
        }
    }

    //------------display----------------//
    class display {
        updateScore(player) {
            $('#P' + player.id + 'score').text(player.score);
        }

        showCurrentPlayer(player) {
            $('#currentplayer').html("<b>" + player.name + "</b> 's turn.").css('color', player.color);
        }

        animate(col, row, player) {
            board.array[col][row].changeState(player.id);
            board.array[col][row].cell.css({ "transform": "translateY(0px)", "opacity": "1" });
            board.array[col][row].cell.on("transitionend", function () {
                $(this).css({ "transform": "translateY(-7px)", "transition": "transform 0.1s ease" });
                $(this).unbind("transitionend");
                $(this).on("transitionend", function () {
                    board.array[col][row].cell.css({ "transform": "translateY(0px)" });
                    $(this).unbind("transitionend");
                })
            });
        }
    }

    var player1 = new player(settings.P1name, colorP1);
    var player2 = new player(settings.P2name, colorP2);


    var board = new gameBoard(gridX, gridY, player1);

    board.createBoard(this);

    $('.scoreboard').on('click', function () {
        board.cancelPlay();
    });

    $('#reset-btn').on('click', function () {
        board.resetBoard();
        board.changePlayer(1);
    });

    $('#home-btn').on('click', function () {
        $('#welcome-page').slideToggle();
        setTimeout(() => {
            $('#gamesection').css('display', 'none');
            $('#game-area').empty();
            document.location.reload();
        }, 500);
    });


    //------------functions-------------//
    function horizontalblock(row, watstate) {
        let pos;
        for (let i = 0; i < board.gridX - 3; i++) {
            let combo = 0;
            let plusone = 0;
            for(let y = 0; y < 4; y++){
                if(board.array[i+y][row].state == watstate){
                    combo++;
                }else if(board.array[i+y][row].state == 0){
                    pos = i+y;
                    plusone++;
                }
            }
            if(combo == 3 && plusone == 1){
                return pos;
            }
        }
        return false;
    }

    function verticalblock(col, row, state){
        if (row >= 2) {
            if (board.array[col][row].state == state && board.array[col][row - 1].state == state && board.array[col][row - 2].state == state) {
                return true;
            }
        }
        return false;
    }

    function startPoint(col, row) {
        let leftStartPoint = [];
        let rightStartPoint = [];
        let result = [];

        if (Math.sign(col - row) == -1) {
            leftStartPoint.push(0);
            leftStartPoint.push((col - row) * -1);
        } else {
            leftStartPoint.push(col - row);
            leftStartPoint.push(0);
        }
        result.push(leftStartPoint);
        if ((parseInt(col) + parseInt(row)) > (this.gridX - 1)) {
            rightStartPoint.push(this.gridX - 1);
            rightStartPoint.push((parseInt(col) + parseInt(row)) - (this.gridX - 1));
        } else {
            rightStartPoint.push(parseInt(col) + parseInt(row));
            rightStartPoint.push(0);
        }
        result.push(rightStartPoint);
        return result;
    }

    return this;
};