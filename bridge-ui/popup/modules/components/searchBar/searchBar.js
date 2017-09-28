angular.module('app.components').directive('searchBar', ['$sce', 'parseFactory', 'Middleware', 'Entity', function($sce, parseFactory, Middleware, Entity) {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: $sce.trustAsResourceUrl(chrome.extension.getURL('popup/modules/components/searchBar/searchBar.html')),
    link: function(scope, element, attrs) {
      var regex = /(\S)+:/;
      scope.searchModel = {};
      scope.showSearchHints = false;

      scope.focus = function() {
        document.getElementById('search-filter').focus();
      };

      scope.checkFirst = function() {
        var types = scope.connector.content_types;
        return types[0].api_name === scope.activeType;
      };

      scope.toggleSearchHints = function () {
        scope.showSearchHints = !scope.showSearchHints;
        console.log(scope.showSearchHints);
      };

      scope.change = function() {
        if(scope.searchModel.text === '')  {
          scope.searchFilter[scope.activeType] = {};
        }
        if (!scope.searchFilter[scope.activeType]) {
          scope.searchFilter[scope.activeType] = {};
        }
        scope.searchFilter[scope.activeType].name = scope.searchModel.text;
        var myString = scope.searchModel.text;

        if (myString !== undefined) {
          // parse the string to get an array of strings
          var searchArray = parseFactory.parseSearchString(myString);
          // convert this array into three seperate arrays that we will filter on
          scope.searchParams = parseFactory.getSearchObject(searchArray);
          if (scope.searchParams.urls.length > 0) {
            scope.pathHighlight = scope.searchParams.urls[0];
          }
        }

        if (scope.searchParams.ids.length > 0) {
          var id = scope.searchParams.ids[0];
          if (id !== '' && !scope.entityExists(id)) {
            Entity.request(id, scope.activeType, function (newEntity) {
              if (!scope.entityExists(newEntity.id)) {
                scope.entities.push(newEntity);
              }
            });
          }
        }
      };

      scope.keyDown = function(event) {
        if(event.which === 8 || event.which === 46) { //backspace and delete
          scope.resetScroll();
        }
      };

      scope.entityExists = function (id) {
        return scope.entities.some(function(entity){
          if (entity.id == id){
            return true;
          }
        });
      }
    }
  };
}]);
