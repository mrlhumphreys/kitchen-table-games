// User Models

function User(params) {
  this.id = new Date().getTime();
  if (params.name == "") {
    this.errors = ["Your user name can't be blank."];
  } else {
    this.name = params.name
    this.errors = [];
  }
};

User.prototype.valid = function() {
  return (this.errors.length == 0);
};

exports.create = function(params) {
  var u = new User(params);
  return u;
}


