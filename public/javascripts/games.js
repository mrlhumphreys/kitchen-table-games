function Connector() {
  this.channel = '/games';
  this.client = new Faye.Client('/events', { timeout: 120 });
};

Connector.prototype.publish = function(event) {
  this.client.publish(this.channel, event );
};

Connector.prototype.subscribe = function(fn) {
  this.client.subscribe(this.channel, fn);
};

function GamesView() {
  
};

GamesView.prototype.removeGame = function(id) {
  $('.games li.' + id).remove();
};

GamesView.prototype.addGame = function(id, gameType) {
  $('.games').prepend('<li class="' + id + '"><a href="/games/' + id + '">' + gameType + ' ' + id + '</a></li>');
};

GamesView.prototype.handlerPerform = function(event) {
  if (event.type == 'game_start') {
    this.addGame(event.id, event.gameType);
  } else if (event.type == 'game_end') {
    this.removeGame(event.id);
  }
};

$(document).ready(function() { 
  connector = new Connector();
  var gamesView = new GamesView();
  var subscription = connector.subscribe(function(event) { 
    gamesView.handlerPerform(event);
  });
});