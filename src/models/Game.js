function Game(player1, player2) {
  this.players = [player1, player2];
  this.currentBoard = [0,1,2,3,4,5,6,7,8];
  this.currentPlayer = this.players[0];
  this.winner;
}

Game.prototype.firstMover = function(player) {
  if (this.players[0] !== player) {
    var first = this.players.pop();
    this.players.splice(0,0, first);
  };
  this.currentPlayer = this.players[0];
};

Game.prototype.switchTurn = function() {
  var index = this.players.indexOf(this.currentPlayer) == 0 ? 1 : 0;
  this.currentPlayer = this.players[index];
};

Game.prototype.makeAmove = function(num) {
  var mark = this.currentPlayer.symbol;
  if (this.currentBoard[num] == num) {
    this.currentBoard[num] = mark;
    this.switchTurn();
  } else {
    alert('You can\'t pick this field. Try with an empty one.');
  }
};

Game.prototype.isDraw = function() {
  if (!this.hasWinner()) {
    for(var i = 0; i < this.currentBoard.length; i++) {
      if (this.currentBoard[i] == i) {
        return false;
      }
    }
    return true;
  }
  return false;
};

Game.prototype.hasWinner = function() {
  var winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for(var i = 0; i < winningCombos.length; i++) {

    var a = winningCombos[i][0];
    var b = winningCombos[i][1];
    var c = winningCombos[i][2];

    if (this.currentBoard[a] && this.currentBoard[a] == this.currentBoard[b] && this.currentBoard[b] == this.currentBoard[c]) {
      var winnerSymbol = this.currentBoard[a];
      this.winner = this.players[0].symbol == winnerSymbol ? this.players[0] : this.players[1];
      return true;
    }
  }
  return false;
};
