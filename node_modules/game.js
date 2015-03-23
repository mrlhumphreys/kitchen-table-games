var draughts = require('draughts_model');
var backgammon = require ('backgammon_model');

this.all = {};
  
exports.find = function(id) {
  return this.all[id];
};

exports.find_all_by_gameType = function(gameType) {
  
}
  
this.new = function(params) {
  var g = null;
  switch (params.gameType) {
    case 'draughts':
      g = new draughts.game(bayeux);
      break;
    case 'backgammon':
      g = new backgammon.game(bayeux);
      break;
    default:
      break;
  }
  return g;
};
  
exports.create = function(params) {
  var g = this.new(params);
  this.all[g.id] = g;
  return g;
};
  
exports.destroy = function(id) {
  delete this.all[id];
};
