$(document).ready(function () {
    var startSpace = "";
    var redTurn = true;
    var activeSpace = "";
    var moves = [];
    var revert = false;
    // var redJumps
    // var blackJumps

    var spaces = {"r1c1": {"Row": 1, "Column": 1},
                    "r1c2": {"Row": 1, "Column": 2},
                    "r1c3": {"Row": 1, "Column": 3},
                    "r1c4": {"Row": 1, "Column": 4},
                    "r1c5": {"Row": 1, "Column": 5},
                    "r1c6": {"Row": 1, "Column": 6},
                    "r1c7": {"Row": 1, "Column": 7},
                    "r1c8": {"Row": 1, "Column": 8},
                    "r2c1": {"Row": 2, "Column": 1},
                    "r2c2": {"Row": 2, "Column": 2},
                    "r2c3": {"Row": 2, "Column": 3},
                    "r2c4": {"Row": 2, "Column": 4},
                    "r2c5": {"Row": 2, "Column": 5},
                    "r2c6": {"Row": 2, "Column": 6},
                    "r2c7": {"Row": 2, "Column": 7},
                    "r2c8": {"Row": 2, "Column": 8},
                    "r3c1": {"Row": 3, "Column": 1},
                    "r3c2": {"Row": 3, "Column": 2},
                    "r3c3": {"Row": 3, "Column": 3},
                    "r3c4": {"Row": 3, "Column": 4},
                    "r3c5": {"Row": 3, "Column": 5},
                    "r3c6": {"Row": 3, "Column": 6},
                    "r3c7": {"Row": 3, "Column": 7},
                    "r3c8": {"Row": 3, "Column": 8},
                    "r4c1": {"Row": 4, "Column": 1},
                    "r4c2": {"Row": 4, "Column": 2},
                    "r4c3": {"Row": 4, "Column": 3},
                    "r4c4": {"Row": 4, "Column": 4},
                    "r4c5": {"Row": 4, "Column": 5},
                    "r4c6": {"Row": 4, "Column": 6},
                    "r4c7": {"Row": 4, "Column": 7},
                    "r4c8": {"Row": 4, "Column": 8},
                    "r5c1": {"Row": 5, "Column": 1},
                    "r5c2": {"Row": 5, "Column": 2},
                    "r5c3": {"Row": 5, "Column": 3},
                    "r5c4": {"Row": 5, "Column": 4},
                    "r5c5": {"Row": 5, "Column": 5},
                    "r5c6": {"Row": 5, "Column": 6},
                    "r5c7": {"Row": 5, "Column": 7},
                    "r5c8": {"Row": 5, "Column": 8},
                    "r6c1": {"Row": 6, "Column": 1},
                    "r6c2": {"Row": 6, "Column": 2},
                    "r6c3": {"Row": 6, "Column": 3},
                    "r6c4": {"Row": 6, "Column": 4},
                    "r6c5": {"Row": 6, "Column": 5},
                    "r6c6": {"Row": 6, "Column": 6},
                    "r6c7": {"Row": 6, "Column": 7},
                    "r6c8": {"Row": 6, "Column": 8},
                    "r7c1": {"Row": 7, "Column": 1},
                    "r7c2": {"Row": 7, "Column": 2},
                    "r7c3": {"Row": 7, "Column": 3},
                    "r7c4": {"Row": 7, "Column": 4},
                    "r7c5": {"Row": 7, "Column": 5},
                    "r7c6": {"Row": 7, "Column": 6},
                    "r7c7": {"Row": 7, "Column": 7},
                    "r7c8": {"Row": 7, "Column": 8},
                    "r8c1": {"Row": 8, "Column": 1},
                    "r8c2": {"Row": 8, "Column": 2},
                    "r8c3": {"Row": 8, "Column": 3},
                    "r8c4": {"Row": 8, "Column": 4},
                    "r8c5": {"Row": 8, "Column": 5},
                    "r8c6": {"Row": 8, "Column": 6},
                    "r8c7": {"Row": 8, "Column": 7},
                    "r8c8": {"Row": 8, "Column": 8}}

    $('.piece').on('click', function(event) {
        
        console.log(spaces[$(this).parent().attr("id")].Row)

        // if (activePiece.hasClass(playerTurn + "-piece")) {
        //     if ($('.active-piece').length === 0 || $(this).hasClass('active-piece')) {
        //         $(this).toggleClass('active-piece');

        //     } else {
        //         $(this).effect('shake', {direction: 'left', distance:3, times: 3}, 500);
        //     }
        // } else {
        //     $(this).effect('shake', {direction: 'left', distance:3, times: 3}, 500);
        // }
    });

    var isDropValid = function(event, dropped) {
        var dropSpace = event.target.id;
        var start = spaces[startSpace];
        var drop = spaces[dropSpace];
        if ($(event.target).has('img').length !== 0) {
            return false;
        } return true;
    }
    var isMoveValid = function(key, value, event) {
        if (key === 0 && value === startSpace) {
            return true;
        } else if () {
            
        }
        console.log(value);


    }


        

        // if ($('#' + dropSpace).)
        //     if (redTurn) {
        //         if (!(dropped.hasClass('crowned'))) {
        //             console.log('red piece and not crowned')
        //             if (drop.Row <= start.Row) {
        //                 return false;
        //             } else if ((drop.Row === start.Row + 1) ) {

        //             } 
        //         }
        //     }
        // return true;


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
                console.log(moves);
            },
            drop: function( event, ui ) {
                var dropped = ui.helper;
                var droppedOn = $(this);
                startSpace = dropped.parent().attr('id');

                if (isDropValid(event, dropped)) {
                    $.each(moves, function(key, value) {
                        console.log ('about to run isMoveValid ' + value)
                        isMoveValid(key, value, event)
                    });
                }




                    $(dropped).detach().css({top: 0, left: 0}).appendTo(droppedOn);

                    // if (isMoveValid(event, dropped)) {
                    //     console.log('move is valid')
                    //     $(dropped).detach().css({top: 0, left: 0}).appendTo(droppedOn);
                    // }
                    // if (!($(this).has('img').length)) {
                    //     if(redTurn && !$(ui.helper).hasClass('crowned')) {
                            
                    //     }
                    // }
                

                moves = [];
            },
            // stop: function( event, ui ) {
                
            // }
        });
    });


});

//(function($) {
//     $.fn.drags = function(opt) {

//         opt = $.extend({handle:"",cursor:"move"}, opt);

//         if(opt.handle === "") {
//             var $el = this;
//         } else {
//             var $el = this.find(opt.handle);
//         }

//         return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
//             if(opt.handle === "") {
//                 var $drag = $(this).addClass('draggable');
//             } else {
//                 var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
//             }
//             var z_idx = $drag.css('z-index'),
//                 drg_h = $drag.outerHeight(),
//                 drg_w = $drag.outerWidth(),
//                 pos_y = $drag.offset().top + drg_h - e.pageY,
//                 pos_x = $drag.offset().left + drg_w - e.pageX;
//             $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
//                 $('.draggable').offset({
//                     top:e.pageY + pos_y - drg_h,
//                     left:e.pageX + pos_x - drg_w
//                 }).on("mouseup", function() {
//                     $(this).removeClass('draggable').css('z-index', z_idx);
//                 });
//             });
//             e.preventDefault(); // disable selection
//         }).on("mouseup", function() {
//             if(opt.handle === "") {
//                 $(this).removeClass('draggable');
//             } else {
//                 $(this).removeClass('active-handle').parent().removeClass('draggable');
//             }
//         });

//     }
//})(jQuery);

