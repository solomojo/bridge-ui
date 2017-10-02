angular.module('app.directives').directive('infiniScroll', [function() {
  return {
    restrict: 'A',
    scope: {
      limiter: '=?',
      increment: '=?'
    },
    link: function(scope, element, attrs) {
      var raw = element[0];
      var increment = scope.increment === undefined ? 30 : scope.increment;
      for(var i = 0; i < increment; i++) {
        scope.limiter.push(true);
      }
      element.bind('scroll', function() {
        if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight - 200) {
          scope.$apply(function() {
            for(var i = 0; i < increment; i++) {
              scope.limiter.push(true);
            }
          });
        }
      });
    }
  };
}]);
