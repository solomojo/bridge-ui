angular.module('app.filters').filter('urlPath', [function() {

  return function(input) {
    if(!input) {
      return;
    }
    var regex = /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/;
    if (input.match(regex) === null) {
      return input;
    }
    else {
      return input.match(regex)[3];
    }
  };
}]);
