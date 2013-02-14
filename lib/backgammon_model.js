function Backgammon(bayeux) {
  // set id
  this.id = new Date().getTime();
  
  // pub sub
  this.bayeux = bayeux;
  var context = this;
  this.subscribe(function(event) {
    console.log(event);
    if (event.type == 'touch_point') {
      // context.touchPoint(event.user, event.x, event.y);
    } else if (event.type == 'user_join') {
      context.addPlayer(event.user);
    } else if (event.type == 'user_leave') {
      context.removePlayer(event.user);
    }
  });
  
  // attributes
  this.gameType = 'backgammon';
  this.gameState = null;
  this.redPlayer = null; // ++
  this.blackPlayer = null; // --
  this.currentPlayer = null;
  this.roll = null;
  this.doublingCube = 64;
  this.doublingCubeOwner = null;
  this.redBar = {'count':0, 'selected':false};
  this.blackBar = {'count':0, 'selected':false};
  this.redBearOff = 0;
  this.blackBearOff = 0;
  this.selectedPoint = null;
  this.points = [ {}, 
                  {'red':2, 'black':0, 'selected':false}, // 1
                  {'red':0, 'black':0, 'selected':false}, // 2
                  {'red':0, 'black':0, 'selected':false}, // 3
                  {'red':0, 'black':0, 'selected':false}, // 4
                  {'red':0, 'black':0, 'selected':false}, // 5
                  {'red':0, 'black':5, 'selected':false}, // 6
                  {'red':0, 'black':0, 'selected':false}, // 7
                  {'red':0, 'black':3, 'selected':false}, // 8
                  {'red':0, 'black':0, 'selected':false}, // 9
                  {'red':0, 'black':0, 'selected':false}, // 10
                  {'red':0, 'black':0, 'selected':false}, // 11
                  {'red':5, 'black':0, 'selected':false}, // 12
                  {'red':0, 'black':5, 'selected':false}, // 13
                  {'red':0, 'black':0, 'selected':false}, // 14
                  {'red':0, 'black':0, 'selected':false}, // 15
                  {'red':0, 'black':0, 'selected':false}, // 16
                  {'red':3, 'black':0, 'selected':false}, // 17
                  {'red':0, 'black':0, 'selected':false}, // 18
                  {'red':5, 'black':0, 'selected':false}, // 19
                  {'red':0, 'black':0, 'selected':false}, // 20
                  {'red':0, 'black':0, 'selected':false}, // 21
                  {'red':0, 'black':0, 'selected':false}, // 22
                  {'red':0, 'black':0, 'selected':false}, // 23
                  {'red':0, 'black':2, 'selected':false} // 24
                ];
  
  // publish create
  this.publishCreate();
};

Backgammon.prototype.channel = function() {
  return ('/' + this.id);
};

Backgammon.prototype.publish = function(message) {
  this.bayeux.getClient().publish(this.channel(), message);
};

Backgammon.prototype.subscribe = function(fn) {
  this.bayeux.getClient().subscribe(this.channel(), fn);
};

Backgammon.prototype.publishPlayerJoin = function(player) {
  this.publish({ 
    type: 'game_message', 
    text: player.name + ' has joined.'
  });
};

Backgammon.prototype.publishPlayerLeave = function(player) {
  this.publish({ 
    type: 'game_message', 
    text: player.name + ' has left.'
    });
};

Backgammon.prototype.publishCreate = function() {
  this.bayeux.getClient().publish('/games', {type: 'game_start', id: this.id, gameType: this.gameType });
}

Backgammon.prototype.publishDestroy = function() {
  this.bayeux.getClient().publish('/games', {type: 'game_end', id: this.id, gameType: this.gameType });
};

Backgammon.prototype.addPlayer = function(player) {
  if (this.redPlayer == null && ((this.blackPlayer == null) || ((this.blackPlayer != null) && (this.blackPlayer.id != player.id)))) {
    this.redPlayer = player;
    this.publishPlayerJoin(player);
  } else if (this.blackPlayer == null && ((this.redPlayer == null) || ((this.redPlayer != null) && (this.redPlayer.id != player.id)))) {
    this.blackPlayer = player;
    this.publishPlayerJoin(player);
  }
  this.publishGameState();
};

Backgammon.prototype.removePlayer = function(player) {
  if (this.redPlayer.id == player.id) {
    this.redPlayer = null;
    this.publishPlayerLeave(player);
  } else if (this.blackPlayer.id == player.id) {
    this.blackPlayer = null;
    this.publishPlayerLeave(player);
  }
  this.publishGameState();
  if ((this.redPlayer == null) && (this.blackPlayer == null)) {
    this.publishDestroy();
  }
};

Backgammon.prototype.publishGameState = function() {
  this.publish({
    type: 'game_state',
    gameState: this.gameState,
    redPlayer: this.redPlayer,
    blackPlayer: this.blackPlayer,
    currentPlayer: this.currentPlayer,
    roll: this.roll,
    doublingCube: this.doublingCube,
    doublincCubeOwner: this.doublingCubeOwner,
    redBar: this.redBar,
    blackBar: this.blackBar,
    redBearOff: this.redBearOff,
    blackBearOff: this.blackBearOff,
    selectedPoint: this.selectedPoint,
    points: this.points
  });
};

exports.game = Backgammon;