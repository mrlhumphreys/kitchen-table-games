var assert = require('assert'), faye = require('faye'), draughts = require('../lib/draughts_model.js');

var bayeux = new faye.NodeAdapter({
  mount: '/events',
  timeout: 45
});

module.exports = {
  // Initialise
  'id should be a number': function() {
    var game = new draughts.game(bayeux);
    assert.type(game.id, 'number');
  },
  
  'bayeux client should be set': function() {
    var game = new draughts.game(bayeux);
    assert.eql(game.bayeux, bayeux);
  },
  
  'channel should be like the id': function() {
    var game = new draughts.game(bayeux);
    game.id = 5;
    assert.eql(game.channel(), '\/5');
  },
  
  // removePlayer
  'if leaving player is not really a player, real players should not be removed': function() {
    var game = new draughts.game(bayeux);
    game.whitePlayer = {"id":1,"name":"shiro"};
    game.blackPlayer = {"id":2,"name":"kuro"};
    var fakePlayer = {"id":3,"name":"nisemono"};
    game.removePlayer(fakePlayer);
    assert.isNotNull(game.whitePlayer);
    assert.isNotNull(game.blackPlayer);
  },
  
  'if leaving player is white player, white player should be null and white pieces should be unassigned': function() {
    var whitePlayer = {"id":1,"name":"shiro"};
    var game = new draughts.game(bayeux);
    game.whitePlayer = whitePlayer;
    for (var i=0;i<game.pieces.length;i++) {
      if (game.pieces[i].colour == 'white') { 
        game.pieces[i].owner = whitePlayer; 
      }
    }
    
    game.removePlayer(whitePlayer);
    
    assert.isNull(game.whitePlayer);
    for (var i=0;i<game.pieces.length;i++) {
      if (game.pieces[i].colour == 'white') { 
        assert.isNull(game.pieces[i].owner);
      }
    }
  },

  'if leaving player is black player, black player should be null and black pieces should be unassigned': function() {
    var blackPlayer = {"id":2,"name":"kuro"};
    var game = new draughts.game(bayeux);
    game.blackPlayer = blackPlayer;
    for (var i=0;i<game.pieces.length;i++) {
      if (game.pieces[i].colour == 'black') { 
        game.pieces[i].owner = blackPlayer; 
      }
    }
    
    game.removePlayer(blackPlayer);
    
    assert.isNull(game.blackPlayer);
    for (var i=0;i<game.pieces.length;i++) {
      if (game.pieces[i].colour == 'black') { 
        assert.isNull(game.pieces[i].owner);
      }
    }
  },
  
  // Add Player
  'if white player is not set and the requesting player is not the black player, it should add the player as white': function() {
    var somePlayer = {"id": 1, "name":"taro"};
    var blackPlayer = {"id": 2, "name":"kuro"};
    var game = new draughts.game(bayeux);
    game.whitePlayer = null;
    game.blackPlayer = blackPlayer;
    game.addPlayer(somePlayer);
    assert.eql(game.whitePlayer, somePlayer);
  },
  
  'if white player is set and black player is not set and the requesting player is not the white player, it should add the player as black': function() {
    var somePlayer = {"id": 1, "name":"taro"};
    var whitePlayer = {"id": 2, "name":"shiro"};
    var game = new draughts.game(bayeux);
    game.whitePlayer = whitePlayer;
    game.blackPlayer = null;
    game.addPlayer(somePlayer);
    assert.eql(game.blackPlayer, somePlayer);
  },
  
  'if white player and black player are set, it should not add the requesting player': function() {
    var somePlayer = {"id": 1, "name":"taro"};
    var whitePlayer = {"id": 2, "name":"shiro"};
    var blackPlayer = {"id": 3, "name":"kuro"};
    var game = new draughts.game(bayeux);
    game.whitePlayer = whitePlayer;
    game.blackPlayer = blackPlayer;
    game.addPlayer(somePlayer);
    assert.eql(game.whitePlayer, whitePlayer);
    assert.eql(game.blackPlayer, blackPlayer);
  },
  
  
  
};