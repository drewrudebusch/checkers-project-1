$(document).ready(function () {
    var redTurn = false;
    var startSpace = "";
    var lastSpace = "";
    var activeSpace = "";
    var moves = [];
    var validMoves = [];
    var revert = false;
    var jumped = [];
    // var redJumps
    // var blackJumps

    var spaces = {"r1c1": {"row": 1, "column": 1},
                    "r1c2": {"row": 1, "column": 2},
                    "r1c3": {"row": 1, "column": 3},
                    "r1c4": {"row": 1, "column": 4},
                    "r1c5": {"row": 1, "column": 5},
                    "r1c6": {"row": 1, "column": 6},
                    "r1c7": {"row": 1, "column": 7},
                    "r1c8": {"row": 1, "column": 8},
                    "r2c1": {"row": 2, "column": 1},
                    "r2c2": {"row": 2, "column": 2},
                    "r2c3": {"row": 2, "column": 3},
                    "r2c4": {"row": 2, "column": 4},
                    "r2c5": {"row": 2, "column": 5},
                    "r2c6": {"row": 2, "column": 6},
                    "r2c7": {"row": 2, "column": 7},
                    "r2c8": {"row": 2, "column": 8},
                    "r3c1": {"row": 3, "column": 1},
                    "r3c2": {"row": 3, "column": 2},
                    "r3c3": {"row": 3, "column": 3},
                    "r3c4": {"row": 3, "column": 4},
                    "r3c5": {"row": 3, "column": 5},
                    "r3c6": {"row": 3, "column": 6},
                    "r3c7": {"row": 3, "column": 7},
                    "r3c8": {"row": 3, "column": 8},
                    "r4c1": {"row": 4, "column": 1},
                    "r4c2": {"row": 4, "column": 2},
                    "r4c3": {"row": 4, "column": 3},
                    "r4c4": {"row": 4, "column": 4},
                    "r4c5": {"row": 4, "column": 5},
                    "r4c6": {"row": 4, "column": 6},
                    "r4c7": {"row": 4, "column": 7},
                    "r4c8": {"row": 4, "column": 8},
                    "r5c1": {"row": 5, "column": 1},
                    "r5c2": {"row": 5, "column": 2},
                    "r5c3": {"row": 5, "column": 3},
                    "r5c4": {"row": 5, "column": 4},
                    "r5c5": {"row": 5, "column": 5},
                    "r5c6": {"row": 5, "column": 6},
                    "r5c7": {"row": 5, "column": 7},
                    "r5c8": {"row": 5, "column": 8},
                    "r6c1": {"row": 6, "column": 1},
                    "r6c2": {"row": 6, "column": 2},
                    "r6c3": {"row": 6, "column": 3},
                    "r6c4": {"row": 6, "column": 4},
                    "r6c5": {"row": 6, "column": 5},
                    "r6c6": {"row": 6, "column": 6},
                    "r6c7": {"row": 6, "column": 7},
                    "r6c8": {"row": 6, "column": 8},
                    "r7c1": {"row": 7, "column": 1},
                    "r7c2": {"row": 7, "column": 2},
                    "r7c3": {"row": 7, "column": 3},
                    "r7c4": {"row": 7, "column": 4},
                    "r7c5": {"row": 7, "column": 5},
                    "r7c6": {"row": 7, "column": 6},
                    "r7c7": {"row": 7, "column": 7},
                    "r7c8": {"row": 7, "column": 8},
                    "r8c1": {"row": 8, "column": 1},
                    "r8c2": {"row": 8, "column": 2},
                    "r8c3": {"row": 8, "column": 3},
                    "r8c4": {"row": 8, "column": 4},
                    "r8c5": {"row": 8, "column": 5},
                    "r8c6": {"row": 8, "column": 6},
                    "r8c7": {"row": 8, "column": 7},
                    "r8c8": {"row": 8, "column": 8}}

    var isDropValid = function(event, dropped) {
        var dropSpace = event.target.id;
        var start = spaces[startSpace];
        var drop = spaces[dropSpace];
        if ($(event.target).has('img').length !== 0) {
            return false;
        } return true;
    };

    var pieceColor = function(piece) {
        console.log(piece)
        var color = piece.attr('src');
        if (color === "red.png" || color === 'red-crowned.png') {
            console.log('piece is red')
            return "red";
        } 
        console.log('piece is black')
        return "black";
    }

    var isMoveValid = function(index, coord, event, piece) {
        activeSpace = $('#' + coord);
        var start = spaces[startSpace];
        var space = spaces[coord];
        if (lastSpace) {    // If there is a last space, set variables associated with the last space
            var last = spaces[lastSpace];
            var rowDiff = space.row - last.row;
            var colDiff = space.column - last.column;
        }
        if (index === 0) { // If first space hovered && it is the starting space, move is valid // && coord === startSpace)
            lastSpace = coord;
            return true;
        }
        if (redTurn) {
            console.log('about to check piece color ' +  pieceImg)
            if (pieceColor(piece) === "red") {
                if (!activeSpace.hasClass('crowned')) {                         //Red game piece that has not been kinged
                    if ((space.row <= last.row) ||                              //If move is backward
                        rowDiff === 0 ||                                        //If move is horizontal
                        (Math.abs(rowDiff) > 1)) {                              //If move is more than one row
                        console.log('false because move is backward, sideways or skips a row)')                   
                            return false;
                    } else if (true){
                        return true;
                    }
                } else if (true){ //Red game piece that has been kinged
                    return true;
                }

            } else {
                return false;
            }
        } else {
            console.log(pieceColor(piece));
            if (pieceColor(piece) === "black") {
                if (!activeSpace.hasClass('crowned')) { //Black game piece that has not been kinged
                    if ((space.row >= last.row) ||          //If move is backward
                        (rowDiff === 1 && colDiff > 1) ||   //If move is one row, but not in adjacent column
                        (rowDiff > 1)) { 
                        console.log('false')                   //If move is more than one row
                            return false;
                    } else if (true) {
                        return true;
                    }
                } else if (true) { //Black game piece that has been kinged
                    return true;
                }
            } else {
                return false;
            }
        };
    };

    $(function() {
        $( ".draggable" ).draggable({
            // snap: true,
            // snapMode: 'inner'
            revert: true,
            revertDuration: 200
        });
        $( ".droppable" ).droppable({
            start: function(event, ui) {
                // activeSpace = $(data.helper).attr('id'); //Will not fire, but addClass below works fine
                $(event.target).addClass('active-piece');
            },
            accept: '.draggable',
            over: function (event, ui) { 
                var hoverSpace = $(this).attr('id')
                moves.push(hoverSpace);
                //console.log(moves);
            },
            drop: function( event, ui ) {
                console.log(ui.helper)
                lastSpace = "";
                var dropped = ui.helper;
                var droppedOn = $(this);
                startSpace = dropped.parent().attr('id');

                if (isDropValid(event, dropped)) {
                    for (var i = 0; i < moves.length; i++) {
                        console.log(moves[i]);
                        validMoves.push(isMoveValid(i, moves[i], event, dropped));
                    };


                    // $.each(moves, function(index, coord) {
                    //     validMoves.push(isMoveValid(index, coord, event, dropped));
                    // });
                    console.log(validMoves);
                    if (validMoves.indexOf(false) === -1) {
                        $(dropped).detach().css({top: 0, left: 0}).appendTo(droppedOn);
                    } else {
                        console.log('invalid move')
                    }
                    

                    jumped = [];
                    
                };
                    // if (isMoveValid(event, dropped)) {
                    //     console.log('move is valid')
                    //     $(dropped).detach().css({top: 0, left: 0}).appendTo(droppedOn);
                    // }
                    // if (!($(this).has('img').length)) {
                    //     if(redTurn && !$(ui.helper).hasClass('crowned')) {
                            
                    //     }
                    // }
                

                moves = [];;
                validMoves = [];
                console.log(moves + " -- " + validMoves)
            }
        });
    });


});