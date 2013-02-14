function DraughtsView() {
  var img = new Image();
  img.src = '/images/draughts.png';
  this.spriteSheet = img;
  this.boardStartPos = {'x':10,'y':10};
  this.board = {'width':400, 'height':400};
  this.squareSize = {'width':50,'height':50};
  this.currentPlayer = null;
  this.whitePos = {'x':10,'y':420};
  this.blackPos = {'x':60,'y':420};
  this.whiteKingPos = {'x':110,'y':420};
  this.blackKingPos = {'x':160,'y':420};
  this.whiteSelectedPos = {'x':210,'y':420};
  this.blackSelectedPos = {'x':260,'y':420};
  this.whiteKingSelectedPos = {'x':310,'y':420};
  this.blackKingSelectedPos = {'x':360,'y':420};
};

DraughtsView.prototype.refreshBoard = function(pieces) {
  var canvas = document.getElementById("board");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 420, 420);
  
  ctx.drawImage(this.spriteSheet, this.boardStartPos.x, this.boardStartPos.y, this.board.width, this.board.height, this.boardStartPos.x, this.boardStartPos.y, this.board.width, this.board.height);

  for (var i=0;i<pieces.length;i++) {
    var topLeft = this.topLeftOfSquare(pieces[i].x,pieces[i].y);
    var spritePos = this.pieceSpritePosition(pieces[i]);
    ctx.drawImage(this.spriteSheet, spritePos.x, spritePos.y, this.squareSize.width, this.squareSize.height, topLeft.x, topLeft.y, this.squareSize.width, this.squareSize.height);

  }
};

DraughtsView.prototype.updateGameMessage = function(message) {
  $('.game_message').text(message);
};

DraughtsView.prototype.refreshUsers = function(whitePlayer, blackPlayer, currentPlayer) {
  if (whitePlayer != null) { 
    $('.players .white').text(whitePlayer.name); 
  } else {
    $('.players .white').text(""); 
  }
  if (blackPlayer != null) { 
    $('.players .black').text(blackPlayer.name); 
  } else {
    $('.players .black').text(""); 
  }
  if (currentPlayer != null) {
    this.currentPlayer = currentPlayer;
    $('.players .current').text(currentPlayer.name);
  }
};

DraughtsView.prototype.middleOfSquare = function(x,y) {
  return { x: this.boardStartPos.x + x*this.squareSize.width + this.squareSize.width / 2,
           y: this.boardStartPos.y + y*this.squareSize.height + this.squareSize.height / 2
         };
};

DraughtsView.prototype.topLeftOfSquare = function(x,y) {
  return { x: this.boardStartPos.x + x*this.squareSize.width,
           y: this.boardStartPos.y + y*this.squareSize.height
         };
};

DraughtsView.prototype.pieceSpritePosition = function(piece) {
  if (piece.colour == 'black') {
    if (piece.king) {
      if (piece.selected) {
        return this.blackKingSelectedPos;
      } else {
        return this.blackKingPos;
      }
    } else {
      if (piece.selected) {
        return this.blackSelectedPos;
      } else {
        return this.blackPos;
      }
    }
  } else {
    if (piece.king) {
      if (piece.selected) {
        return this.whiteKingSelectedPos;
      } else {
        return this.whiteKingPos;
      }
    } else {
      if (piece.selected) {
        return this.whiteSelectedPos;
      } else {
        return this.whitePos;
      }
    }
  }
}

DraughtsView.prototype.handlerPerform = function(event) {
  if (event.type == 'board_state') {
    this.refreshBoard(event.pieces);
  } else if (event.type == 'game_message') {
    this.updateGameMessage(event.text);
  } else if (event.type == 'user_state') {
    this.refreshUsers(event.whitePlayer, event.blackPlayer, event.currentPlayer);
  }
};

$(document).ready(function() {
  var draughtsView = new DraughtsView();
  
  $('#game canvas').click(function(event) {
    if ( typeof event.offsetX == 'undefined' && typeof event.offsetY == 'undefined' ) {
      var offset = $(event.target).offset(false);
      event.offsetX = event.pageX - offset.left;
      event.offsetY = event.pageY - offset.top;
    }
    var x = parseInt((event.offsetX - draughtsView.boardStartPos.x) / draughtsView.squareSize.width);
    var y = parseInt((event.offsetY - draughtsView.boardStartPos.y) / draughtsView.squareSize.height);
    if (((y + x) % 2 == 1) && (draughtsView.currentPlayer.id == connector.user.id)) {
      connector.publish({type: 'touch_square', user: connector.user, x: x, y: y});
    }
  });
  
  var subscription = connector.subscribe(function(event) {
    draughtsView.handlerPerform(event);
  });
});
