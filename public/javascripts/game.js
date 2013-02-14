// Connector

function Connector() {
  var pathname = window.location.pathname;
  var regex = /\/games(\/\d+)/;
  this.channel = pathname.match(regex)[1];
  this.client = new Faye.Client('/events', { timeout: 120 });
  this.publishers = [];
};

Connector.prototype.publish = function(event) {
  this.client.publish(this.channel, event );
};

Connector.prototype.subscribe = function(fn) {
  this.client.subscribe(this.channel, fn);
};

Connector.prototype.publishUserJoin = function() {
  this.publish({ type: 'user_join', user: this.user });
};

Connector.prototype.publishUserLeave = function() {
  this.publish({ type: 'user_leave', user: this.user });
};

Connector.prototype.handlerPerform = function(event) {
  if (event.type == 'publishers') {
    this.publishers = event.publishers;
  }
};

// Chat View

function ChatView() {

};

ChatView.prototype.clearInput = function() {
  $('.message').val("");
};

ChatView.prototype.addMessage = function(message) {
  $('.messages').append("<li>" + message + "</li>");
  if ($('.messages li').length > 10) {
    $('.messages li:first').remove();
  }
};

ChatView.prototype.handlerPerform = function(event) {
  if (event.type == 'message') {
    this.addMessage(event.username + ": " + event.text);
  }
};

$(document).ready(function() { 
  connector = new Connector();
  
  $.getJSON('/sessions/current', function(data) {
    connector.user = data;
  });
  
  setTimeout('connector.publishUserJoin()', 250);
  
  $('a.leave').click(function() {
    connector.publishUserLeave();
  });
  
  var chatView = new ChatView();
  
  $('.message').keypress(function(event) {
    var messageText = $(this).val();
    if ((connector.publishers.some(function(p) { return ((p != null) && (p.id == connector.user.id));})) && (event.which == 13) && (messageText != "")) {
      connector.publish({ type: 'message', text: messageText, username: connector.user.name });
      chatView.clearInput();
    }
  });
  
  var subscription = connector.subscribe(function(event) { 
    connector.handlerPerform(event);
    chatView.handlerPerform(event);
  });
});