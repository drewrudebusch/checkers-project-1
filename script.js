$(document).ready(function () {
    var coordinates = [];
    var activeRow = 0;
    var activeCol = 0;
    var moveRow = 0;
    var moveCol = 0;
    var playerTurn = "red";
    var activeSpace = "";
    var activePiece;

    var getCoordinates = function(cell) {
        coordinates = cell.split('');
        activeRow = parseInt(coordinates[1]);
        activeCol = parseInt(coordinates[3]);
        console.log(activeRow +" " + activeCol)
    };


    $('.piece').on('click', function(event) {
        activeSpace = $(this).parent().attr("id");
        activePiece = $(this);

        console.log(activeSpace)
        getCoordinates(activeSpace);

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


});



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