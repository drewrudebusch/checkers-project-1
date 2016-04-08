
var redTurn = false;
var startSpace = "";
var lastSpace = "";
var activeSpace = "";
var moves = [];
var validMoves = [];
var revert = false;
var jump = false;
var jumped = [];
var kingMe;
var redJumps = 0;
var blackJumps = 0;

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
        console.log('drop is not valid');
        clearMoves();
        return false;
    } return true;
};

var pieceColor = function(piece) {
    var color = piece.attr('src');
    if (color === "red.png" || color === 'red-crowned.png') {
        return "red";
    } 
    return "black";
}
var isKinged = function(piece) {
    if (piece.hasClass('crowned')) {
        return true;
    } return false;
};
var makeKing = function(droppedOn) {
    $(droppedOn).children('img').remove();
    if (redTurn) {
        $(droppedOn).html('<img src="red-crowned.png" class="red-piece piece crowned draggable">');
    } else {
        $(droppedOn).html('<img src="black-crowned.png" class="black-piece piece crowned draggable">')
    }
    // $(droppedOn).children('img').draggable();
    // $('.droppable').droppable();  
    makeDraggable();  
}

var isMoveValid = function(index, coord, event, piece) {
    var kinged = piece.hasClass('.crowned')
    var jumpedPiece;
    activeSpace = $('#' + coord);
    spaceOccupied = activeSpace.has('img').length > 0 ? true :  false;
    occupiedColor = spaceOccupied ? pieceColor(activeSpace.find('img')) : "";
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
        console.log('lastSpace: ' + lastSpace);
        console.log(activeSpace);
        console.log('rowDiff: ' +  rowDiff);
        console.log('jump: ' + jump);
        console.log('occupied: ' + (activeSpace.has('img').length > 0));
        console.log('color: ' + pieceColor(piece))
        console.log('kinged: ' + isKinged(piece))
        console.log('Turn: red')

        if (pieceColor(piece) === "red") {
            if (!isKinged(piece)) {                         //Red game piece that has not been kinged
                if ((space.row <= last.row) ||                              //If move is backward
                    rowDiff === 0 ||                                        //If move is horizontal
                    (Math.abs(rowDiff) > 1)) {                              //If move is more than one row
                    console.log('false because move is backward, sideways or skips a row')                   
                        return false;
                } else {                
                    console.log('checking for jump scenarios');
                    if (jump && activeSpace.has('img').length > 0) {
                        console.log('jump, but space is occupied');
                        return false;
                    } else if (!jump && activeSpace.has('img').length > 0) {
                        console.log('jump!')
                        jump = true;
                    }
                    else if (jump && (activeSpace.has('img').length === 0)) {
                        console.log('landing from a jump move')
                        console.log('jump from...')
                        console.log(moves[index-2])
                        if (Math.abs(space.column - spaces[moves[index-2]].column) !== 2) {
                            console.log('invalid jump')
                            return false;
                        } else {
                            jumped.push(moves[index-1]);    
                        }
                        jump = false;
                    } else if (!jump && activeSpace.has('img').length === 0) {
                        if (jumped.length > 0 && (moves.length > ((jumped.length * 2) + 1)) ||
                            jumped.length === 0 && moves.length > 2) {
                            return false;
                        }
                    }
                }
            } else {                                                        //Red game piece that has been kinged
                if (rowDiff === 0 ||                                        //If move is horizontal
                    (Math.abs(rowDiff) > 1)) {                              //If move is more than one row
                    console.log('false because move is backward, sideways or skips a row')                   
                        return false;
                } else {                
                    console.log('checking for jump scenarios');
                    if (jump && activeSpace.has('img').length > 0) {
                        console.log('jump, but space is occupied');
                        return false;
                    } else if (!jump && activeSpace.has('img').length > 0) {
                        console.log('jump!')
                        jump = true;
                    }
                    else if (jump && (activeSpace.has('img').length === 0)) {
                        console.log('landing from a jump move')
                        console.log('jump from...')
                        console.log(moves[index-2])
                        if (Math.abs(space.column - spaces[moves[index-2]].column) !== 2) {
                            console.log('invalid jump')
                            return false;
                        } else {
                            jumped.push(moves[index-1]);
                        }
                        jump = false;
                    } else if (!jump && activeSpace.has('img').length === 0) {
                        if (jumped.length > 0 && (moves.length > ((jumped.length * 2) + 1)) ||
                            jumped.length === 0 && moves.length > 2) {
                            return false;
                        }
                    }   
                }              
                return true;
            }
        } else {
            return false;
        }
    } else {
        console.log('lastSpace: ' + lastSpace);
        console.log(activeSpace);
        console.log('rowDiff: ' +  rowDiff);
        console.log('jump: ' + jump);
        console.log('occupied: ' + (activeSpace.has('img').length > 0));
        console.log('color: ' + pieceColor(piece))
        console.log('kinged: ' + isKinged(piece))
        console.log('Turn: black')

        if (pieceColor(piece) === "black") {
            if (!isKinged(piece)) {                                                //Black game piece that has not been kinged
                if ((space.row >= last.row) ||                              //If move is backward
                    rowDiff === 0 ||                                        //If move is horizontal
                    (Math.abs(rowDiff) > 1)) {                              //If move is more than one row
                    console.log('false because move is backward, sideways or skips a row ' + coord)                   
                        return false;
                } else if (true) {
                    console.log('checking for jump scenarios');
                    if (jump && activeSpace.has('img').length > 0) {
                        console.log('jump, but space is occupied');
                        return false;
                    } else if (!jump && activeSpace.has('img').length > 0) {
                        console.log('jump!')
                        jump = true;
                    }
                    else if (jump && (activeSpace.has('img').length === 0)) {
                        console.log('landing from a jump move')
                        console.log('jump from...')
                        console.log(moves[index-2])
                        if (Math.abs(space.column - spaces[moves[index-2]].column) !== 2) {
                            console.log('invalid jump')
                            return false;
                        } else {
                            jumped.push(moves[index-1]);
                        }
                        jump = false;
                    } else if (!jump && activeSpace.has('img').length === 0) {
                        if (jumped.length > 0 && (moves.length > ((jumped.length * 2) + 1)) ||
                            jumped.length === 0 && moves.length > 2) {
                            return false;
                        }
                    }

                    return true;
                }
            } else {                                                        //Black game piece that has been kinged
                if (rowDiff === 0 ||                                        //If move is horizontal
                    (Math.abs(rowDiff) > 1)) {                              //If move is more than one row
                    console.log('false because move is backward, sideways or skips a row')                   
                        return false;
                } else {                
                    console.log('checking for jump scenarios');
                    if (jump && activeSpace.has('img').length > 0) {
                        console.log('jump, but space is occupied');
                        return false;
                    } else if (!jump && activeSpace.has('img').length > 0) {
                        console.log('jump!')
                        jump = true;
                    }
                    else if (jump && (activeSpace.has('img').length === 0)) {
                        console.log('landing from a jump move')
                        console.log('jump from...')
                        console.log(moves[index-2])
                        if (Math.abs(space.column - spaces[moves[index-2]].column) !== 2) {
                            console.log('invalid jump')
                            return false;
                        } else {
                            jumped.push(moves[index-1]);
                            console.log(jumped);
                        }
                        jump = false;
                    } else if (!jump && activeSpace.has('img').length === 0) {
                        if (jumped.length > 0 && (moves.length > ((jumped.length * 2) + 1)) ||
                            jumped.length === 0 && moves.length > 2) {
                            return false;
                        }
                    }   
                }              
                return true;
            }
        } else {
            return false;
        }
    };
};

var clearMoves = function() {
    lastSpace = "";
    moves = [];
    validMoves = [];
    jumped = [];
    kingMe = false;
}

var makeDraggable = function() {
    $( ".draggable" ).draggable({
        // snap: true,
        // snapMode: 'inner'
        containment: $('#checkerboard'),
        revert: true,
        revertDuration: 200
    });
    $( ".droppable" ).droppable({
        accept: '.draggable',
        over: function (event, ui) { 
            var hoverSpace = $(this).attr('id')
            moves.push(hoverSpace);
        },
        drop: function( event, ui ) {
            lastSpace = "";
            var dropped = ui.helper;
            var droppedOn = $(this);
            startSpace = dropped.parent().attr('id');

            if (isDropValid(event, dropped)) {
                for (var i = 0; i < moves.length; i++) {
                    validMoves.push(isMoveValid(i, moves[i], event, dropped));
                    lastSpace = moves[i];
                    if (i === moves.length - 1) {
                        console.log(isKinged(dropped))
                        if (!(isKinged(dropped))) {
                            
                            if (redTurn) {
                                console.log('test red king')
                                if (spaces[moves[i]].row === 8) {
                                    kingMe = true;
                                }
                            } else if (spaces[moves[i]].row === 1) {
                                kingMe = true;
                            }
                        }
                    }
                };
                console.log(validMoves)
                if (validMoves.indexOf(false) === -1) {
                    $(dropped).detach().css({top: 0, left: 0}).appendTo(droppedOn);
                    for (var i = 0; i < jumped.length; i++) {
                        if (redTurn) {
                            redJumps++;
                        } else {
                            blackJumps++
                        };
                        $('#' + jumped[i]).children('img').remove()
                    }
                    if (kingMe) {
                        makeKing(droppedOn);
                    }
                } else {
                    console.log('invalid move')
                    clearMoves();
                    return
                }
                $('#red-captures').html('Jumps: ' + redJumps)
                $('#black-captures').html('Jumps: ' + blackJumps)
                console.log('Should never fire after invalid moves')

                if (redTurn) {
                    redTurn = false;
                    $('#player-turn').html('Black turn')
                } else {
                    redTurn = true;
                    $('#player-turn').html('Red turn')
                }
                clearMoves();
                
             } 
             //else {

        }
    });
};

makeDraggable();
