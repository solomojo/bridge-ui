// This factory handles parsing of search strings and the creation of search objects
angular.module('app.factories').factory('localeFactory', [function() {

  var factory = this;

  function getLocalUrl(localPath){
    return chrome.extension.getURL(localPath);
  }

  factory.getLocaleInfo = function () {
    $http.get(getLocalUrl('popup/locales/localeKeys.json')).success(function(response) {
      console.log(response);
      return response;
    });
  };

  return factory;

}]);
