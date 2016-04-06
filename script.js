$(document).ready(function () {
    var coordinates = [];
    var activeRow = 0;
    var activeCol = 0;
    var moveRow = 0;
    var moveCol = 0;
    var playerTurn = "red";
    var activeSpace = "";
    var activePiece;
    var moves =[];

    var getCoordinates = function(cell) {
        coordinates = cell.split('');
        activeRow = parseInt(coordinates[1]);
        activeCol = parseInt(coordinates[3]);
        console.log(activeRow +" " + activeCol)
    };


    $('.piece').on('click', function(event) {
        activeSpace = $(this).parent().attr("id");
        activePiece = $(this);

        // console.log(activeSpace)
        // getCoordinates(activeSpace);

        if (activePiece.hasClass(playerTurn + "-piece")) {
            if ($('.active-piece').length === 0 || $(this).hasClass('active-piece')) {
                $(this).toggleClass('active-piece');

            } else {
                $(this).effect('shake', {direction: 'left', distance:3, times: 3}, 500);
            }
        } else {
            $(this).effect('shake', {direction: 'left', distance:3, times: 3}, 500);
        }
        

    });

    $(function() {
        $( ".draggable" ).draggable({
            snap: true,
            snapMode: 'inner'
        });
        $( ".droppable" ).droppable({
            // accept: '.draggable',
            drop: function( event, ui ) {
                console.log('piece dropped');
                $(this).removeClass("border").removeClass("over");
                var dropped = ui.draggable;
                var droppedOn = $(this);
                $(dropped).detach().css({top: 0, left: 0, 'z-index': 1000}).appendTo(droppedOn);
            },
            over: function (event, ui) { 
                console.log($(this));
            }
            stop: 
        });
    });

});

// (function($) {
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
// })(jQuery);

// var checkForEligibleMoves = function(cell) {

//         if (activePiece.hasClass(playerTurn + "-piece") && (!(activePiece.hasClass('crowned')))) {
//             if (playerTurn === 'red') {
//                 if (activeCol > 1 && activeCol < 8 && activeRow < 8) {
//                 console.log($('#r' + (activeRow + 1) + 'c' + (activeCol - 1)).find('img'));
//                 if (($('#r' + (activeRow + 1) + 'c' + (activeCol - 1)).find('img').hasClass('black-piece') ||  
//                     $('#r' + (activeRow + 1) + 'c' + (activeCol + 1)).find('img').hasClass('black-piece')) &&
//                     ($('#r' + (activeRow + 2) + 'c' + (activeCol - 2)).find('img').hasClass('') ||
//                     $('#r' + (activeRow + 2) + 'c' + (activeCol - 2)).find('img').hasClass(''))) { 
//                         console.log('testing eligibility');
//                     }
//                 }
                
//         } else {
//             return false;
//         };
//     };
// };

        // if ($('.active-piece').length === 0) {
        //     $(this).toggleClass('active-piece');
        // } else if ($(this).hasClass('active-piece')) {
        //     $(this).toggleClass('active-piece');
        // } else {
        //     if(checkForEligibleMoves(activeSpace)) {

        //     } else {
                
        //     }
        // }