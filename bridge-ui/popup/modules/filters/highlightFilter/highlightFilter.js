angular.module('app.filters').filter('highlight', ['$sce', function($sce) {

  return function(text, phrase, searchOpen) {
    if(text === undefined) {
      return;
    }
    if (phrase && searchOpen) {
      var terms = phrase.replace(/\s/g,'|');
      text = text.replace(new RegExp('(' + terms + ')', 'gi'),'<b style="color:black;">$1</b>');
    }
    return $sce.trustAsHtml(text);
  };
}]);
