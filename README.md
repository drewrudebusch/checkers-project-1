# checkers-project-1

Start Game: 
  Click "New Game" to bring up player menu.
  Designate a player name for each piece color.
  Choose a player to go first, or let the computer randomly decide.

Play Game:
  Standard game pieces must move diagonally forward one row.
  If a diagonally adjacent corward move is occupied by an opponent player, the active player can jump over it if the subsequent diagonal space is unoccupied. This move will remove the "jumped" opponent piece. Jump moves can be strung together, so long as all moves are valid.
  When a standard game piece reaches the opposite side of the board, it will be "kinged." Kinged pieces can move forward or backward to diagonally adjacent spaces.

Winning:
  When one player has jumped and removed all of the opponent's game pieces, the game is over. The player with remaining game pieces is the winner.
  
************ Development ************
The game is created using HTML, CSS, Javascript, and jQuery.

All board spaces have an ID based on its coordinates within the game board. These can be referenced easily by accessing the lookup object to get a numberic value for row and column.

As the player moves a piece across the board, all spaces are logged and subsequently checked for validity at each step.
