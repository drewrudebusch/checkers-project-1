$(document).ready(function () {
    var coordinates = [];
    var activeRow = 0;
    var activeCol = 0;
    var moveRow = 0;
    var moveCol = 0;

    $('.piece').on('click', function(event) {
        if ($('.active-piece').length === 0) {
            $(this).toggleClass('active-piece');
        } else if ($(this).hasClass('active-piece')) {
            $(this).toggleClass('active-piece');
        } else {
            $(this).effect('shake', {direction: 'left', distance:3, times: 3}, 500);
        }

    })


var getCoordinates = function(cell) {
    coordinates = cell.split('');
    activeRow = coordinatesp[1];
    activeCol = coordinates[3];
};

var checkForEligibleMoves = function() {

};



});