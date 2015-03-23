function DraughtsPiece(colour, x, y) {
  this.colour = colour;
  this.king = false;
  this.owner = null;
  this.x = x;
  this.y = y;
  this.selected = false;
};

DraughtsPiece.prototype.enemyColour = function() {
  if (this.colour == 'black') {
    return 'white';
  } else {
    return 'black';
  }
};

function Draughts(bayeux) {
  this.id = new Date().getTime();
  
  // Pub Sub Stuff
  
  this.bayeux = bayeux;
  var context = this;
  this.subscribe(function(event) {
    if (event.type == 'touch_square') {
      context.touchSquare(event.user, event.x, event.y);
    } else if (event.type == 'user_join') {
      context.addPlayer(event.user);
    } else if (event.type == 'user_leave') {
      context.removePlayer(event.user);
    }
  });
  
  // Attributes
  this.gameType = 'draughts';
  this.whitePlayer = null;
  this.blackPlayer = null;
  this.currentPlayer = null;
  this.min = {x:0, y:0};
  this.max = {x:7, y:7};
  this.pieces = [new DraughtsPiece('white',1,0),
                 new DraughtsPiece('white',3,0),
                 new DraughtsPiece('white',5,0),
                 new DraughtsPiece('white',7,0),
                 new DraughtsPiece('white',0,1),
                 new DraughtsPiece('white',2,1),
                 new DraughtsPiece('white',4,1),
                 new DraughtsPiece('white',6,1),
                 new DraughtsPiece('white',1,2),
                 new DraughtsPiece('white',3,2),
                 new DraughtsPiece('white',5,2),
                 new DraughtsPiece('white',7,2),
                 new DraughtsPiece('black',0,5),
                 new DraughtsPiece('black',2,5),
                 new DraughtsPiece('black',4,5),
                 new DraughtsPiece('black',6,5),
                 new DraughtsPiece('black',1,6),
                 new DraughtsPiece('black',3,6),
                 new DraughtsPiece('black',5,6),
                 new DraughtsPiece('black',7,6),
                 new DraughtsPiece('black',0,7),
                 new DraughtsPiece('black',2,7),
                 new DraughtsPiece('black',4,7),
                 new DraughtsPiece('black',6,7)];

  // After Initialise
  this.publishCreate();
};

Draughts.prototype.publishCreate = function() {
  this.bayeux.getClient().publish('/games', {type: 'game_start', id: this.id, gameType: this.gameType });
}

Draughts.prototype.publishDestroy = function() {
  this.bayeux.getClient().publish('/games', {type: 'game_end', id: this.id, gameType: this.gameType });
};

Draughts.prototype.channel = function() {
  return ('/' + this.id);
};

Draughts.prototype.publish = function(message) {
  this.bayeux.getClient().publish(this.channel(), message);
};

Draughts.prototype.publishBoardState = function() {
  this.publish({
    type: 'board_state',
    pieces: this.pieces
  });
};

Draughts.prototype.publishUserState = function() {
  this.publish({
    type: 'user_state',
    whitePlayer: this.whitePlayer,
    blackPlayer: this.blackPlayer,
    currentPlayer: this.currentPlayer
  });
  this.publish({
    type: 'publishers',
    publishers: [this.whitePlayer, this.blackPlayer]
  });
};

Draughts.prototype.publishPlayerJoin = function(player) {
  this.publish({ 
    type: 'game_message', 
    text: player.name + ' has joined.'
  });
};

Draughts.prototype.publishPlayerLeave = function(player) {
  this.publish({ 
    type: 'game_message', 
    text: player.name + ' has left.'
    });
};

Draughts.prototype.publishWinner = function() {
  this.publish({
    type: 'game_message',
    text: this.winner().name + ' wins.'
  });
}

Draughts.prototype.subscribe = function(fn) {
  this.bayeux.getClient().subscribe(this.channel(), fn);
};

Draughts.prototype.removePlayer = function(player) {
  if ((this.whitePlayer != null) && (this.whitePlayer.id == player.id)) {
    this.whitePlayer = null;
    this.unassignPieces('white');
    this.publishPlayerLeave(player);
  } else if ((this.blackPlayer != null) && (this.blackPlayer.id == player.id)) {
    this.blackPlayer = null;
    this.unassignPieces('black');
    this.publishPlayerLeave(player);
  }
  this.publishUserState();
  if ((this.whitePlayer == null) && (this.blackPlayer == null)) {
    this.publishDestroy();
  }
};

Draughts.prototype.addPlayer = function(player) {
  if (this.whitePlayer == null && ((this.blackPlayer == null) || ((this.blackPlayer != null) && (this.blackPlayer.id != player.id)))) {
      this.whitePlayer = player;
      this.assignPieces('white', player);
      this.currentPlayer = player;
      this.publishPlayerJoin(player);
  } else if (this.blackPlayer == null && ((this.whitePlayer == null) || ((this.whitePlayer != null) && (this.whitePlayer.id != player.id)))) {
    this.blackPlayer = player;
    this.assignPieces('black', player);
    this.publishPlayerJoin(player);
  }
  this.publishUserState();
  this.publishBoardState();
};

Draughts.prototype.assignPieces = function(colour, player) {
  for (var i=0;i<this.pieces.length;i++) {
    if (this.pieces[i].colour == colour) { 
      this.pieces[i].owner = player; 
    }
  }
};

Draughts.prototype.unassignPieces = function(colour) {
  for (var i=0;i<this.pieces.length;i++) {
    if (this.pieces[i].colour == colour) { 
      this.pieces[i].owner = null; 
    }
  }
};

Draughts.prototype.passTurn = function() {
  if (this.playerIsCurrent(this.whitePlayer)) {
    this.currentPlayer = this.blackPlayer;
  } else {
    this.currentPlayer = this.whitePlayer;
  }
  this.publishUserState();
};

Draughts.prototype.findPiece = function(x,y) {
  return this.pieces.filter(function(p) { return (p.x == x) && (p.y == y)} )[0];
};

Draughts.prototype.findCapturablePiece = function(piece, x, y) {
  return this.findPiece((piece.x + x)/2, (piece.y +y)/2);
};

Draughts.prototype.selectPiece = function(piece) {
  this.deselectAllPieces();
  var index = this.pieces.indexOf(piece);
  this.pieces[index].selected = true;
  this.publishBoardState();
};

Draughts.prototype.deselectAllPieces = function() {
  this.pieces.forEach(function(p) { p.selected = false; });
};

Draughts.prototype.move = function(piece,x,y) {
  var index = this.pieces.indexOf(piece);
  this.pieces[index].x = x;
  this.pieces[index].y = y;
  if (this.pieceIsPromotable(this.pieces[index])) {
    this.pieces[index].king = true;
  }
  this.publishBoardState();
};

Draughts.prototype.capture = function(piece,x,y) {
  var capturablePiece = this.findCapturablePiece(piece, x, y);
  var capturableIndex = this.pieces.indexOf(capturablePiece);
  this.pieces.splice(capturableIndex, 1);
  var index = this.pieces.indexOf(piece);
  this.pieces[index].x = x;
  this.pieces[index].y = y;
  if (this.pieceIsPromotable(this.pieces[index])) {
    this.pieces[index].king = true;
  }
  this.publishBoardState();
};

Draughts.prototype.touchSquare = function(player,x,y) {
  if (this.playerIsCurrent(player) && (this.whitePlayer != null) && (this.blackPlayer != null) ) {
    var piece = this.findPiece(x,y);
    if (piece == null) {
      var selected = this.selectedPiece();
      if (selected != null) {
        if (this.moveIsValid(selected,x,y)) { 
          if (this.moveIsAdjacent(selected,x,y)) {
            this.move(selected,x,y);
            this.deselectAllPieces();
            this.passTurn();
          } else if (this.moveIsCapture(selected,x,y)) {
            this.capture(selected,x,y);
            if (!this.pieceCanCapture(selected)) {
              this.deselectAllPieces();
              if (this.winner() != null) {
                this.publishWinner();
                this.publishDestroy();
              } else {
                this.passTurn();
              }
            }
          }
        }
      } else {
        this.deselectAllPieces();
      }
    } else {
      if (this.pieceIsSelectable(player, piece)) {
        this.selectPiece(piece);
      } else {
        this.deselectAllPieces();
      }
    }
  }
};

Draughts.prototype.playerIsCurrent = function(player) {
  return (this.currentPlayer.id == player.id);
};

Draughts.prototype.selectedPiece = function() {
  return this.pieces.filter(function(p) { return p.selected; })[0];
};

Draughts.prototype.pieceSelected = function() {
  return (this.selectedPiece() != null);
};

Draughts.prototype.positionOffBoard = function(x,y) {
  return ((x < this.min.x) || (x > this.max.x) || (y < this.min.y) || (y > this.max.y));
};

Draughts.prototype.pieceIsSelectable = function(player, piece) {
  if ((piece.owner != null) && (piece.owner.id == player.id)) {
    if (this.pieceCanCapture(piece)) {
      return true;
    } else {
      if (this.playerPiecesCanCapture(player)) {
        return false;
      } else {
        return this.pieceCanMove(piece);
      }
    }
  }
};

Draughts.prototype.playerPiecesCanCapture = function(player) {
  var context = this;
  return this.pieces.some(function(p) { return (context.pieceCanCapture(p) && (p.owner.id == player.id)); });
};

Draughts.prototype.pieceCanMove = function(piece) {
  if (piece.king) {
    var northEast = this.canMoveInDirection(piece,1,-1);
    var northWest = this.canMoveInDirection(piece,-1,-1);
    var southEast = this.canMoveInDirection(piece,1,1);
    var southWest = this.canMoveInDirection(piece,-1,1);
    return [northEast, northWest, southEast, southWest].some(function(d) { return d; });
  } else {
    if (piece.colour == 'black') {
      var northEast = this.canMoveInDirection(piece,1,-1);
      var northWest = this.canMoveInDirection(piece,-1,-1);
      return [northEast, northWest].some(function(d) { return d; });
    } else {
      var southEast = this.canMoveInDirection(piece,1,1);
      var southWest = this.canMoveInDirection(piece,-1,1);
      return [southEast, southWest].some(function(d) { return d; });
    }
  }
};

Draughts.prototype.canMoveInDirection = function(piece,h,v) {
  var x = piece.x+h;
  var y = piece.y+v;
  return (!this.positionOffBoard(x,y) && (this.findPiece(x,y) == null));
};

Draughts.prototype.pieceCanCapture = function(piece) {
  if (piece.king) {
    var northEast = this.canCaptureInDirection(piece,1,-1);
    var northWest = this.canCaptureInDirection(piece,-1,-1);
    var southEast = this.canCaptureInDirection(piece,1,1);
    var southWest = this.canCaptureInDirection(piece,-1,1);
    return [northEast, northWest, southEast, southWest].some(function(d) { return d; });
  } else {
    if (piece.colour == 'black') {
      var northEast = this.canCaptureInDirection(piece,1,-1);
      var northWest = this.canCaptureInDirection(piece,-1,-1);
      return [northEast, northWest].some(function(d) { return d; });
    } else {
      var southEast = this.canCaptureInDirection(piece,1,1);
      var southWest = this.canCaptureInDirection(piece,-1,1);
      return [southEast, southWest].some(function(d) { return d; });
    }
  }
};

Draughts.prototype.canCaptureInDirection = function(piece,h,v) {
  var adjacentPiece = this.findPiece(piece.x+h,piece.y+v);
  if ((adjacentPiece != null) && (adjacentPiece.colour == piece.enemyColour())) {
    var x = adjacentPiece.x+h;
    var y = adjacentPiece.y+v;
    return (!this.positionOffBoard(x,y) && (this.findPiece(x,y) == null));
  } else {
    return false;
  }
};

Draughts.prototype.pieceIsPromotable = function(piece) {
  return (((piece.colour == 'black') && (piece.y == this.min.y)) || ((piece.colour == 'white') && (piece.y == this.max.y)));
};

Draughts.prototype.pieceIsMovingInRightDirection = function(piece, x, y) {
  if (piece.king) {
    return true;
  } else {
    if (piece.colour == 'black') {
      return ((piece.y - y) > 0);
    } else {
      return ((piece.y - y) < 0);
    }
  }
};

Draughts.prototype.moveIsValid = function(piece, x,y) {
  return ((this.findPiece(x,y) == null) && this.pieceIsMovingInRightDirection(piece,x,y) && (this.moveIsAdjacent(piece,x,y) || this.moveIsCapture(piece,x,y)));
};

Draughts.prototype.moveIsAdjacent = function(piece, x,y) {
  return (!this.positionOffBoard(x,y) && this.moveInRange(piece,x,y,1));
};

Draughts.prototype.moveIsCapture = function(piece, x,y) {
  if (!this.positionOffBoard(x,y) && this.moveInRange(piece,x,y,2)) {
    var capturablePiece = this.findCapturablePiece(piece, x, y);
    return ((capturablePiece != null) && (capturablePiece.colour == piece.enemyColour()));
  }
};

Draughts.prototype.moveInRange = function(piece, x, y, range) {
  return ((Math.abs(piece.x - x) == range) && (Math.abs(piece.y - y) == range));
};

Draughts.prototype.winner = function() {
  if (this.pieces.every(function(p) { return p.colour == 'white' })) {
    return this.whitePlayer;
  } else if (this.pieces.every(function(p) { return p.colour == 'black' })) {
    return this.blackPlayer;
  } else {
    return null;
  }
};


exports.game = Draughts;