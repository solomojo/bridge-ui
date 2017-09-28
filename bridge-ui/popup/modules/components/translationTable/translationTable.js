angular.module('app.components').directive('translationTable', ['$sce', '$filter', '$rootScope', function ($sce, $filter, $rootScope) {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: $sce.trustAsResourceUrl(chrome.extension.getURL('popup/modules/components/translationTable/translationTable.html')),
    link: function (scope, element, attrs, ctrl) {

      scope.getEntities = function () {
        scope.bulkView = scope.$eval(attrs.bulkView);
        if (scope.bulkView) {
          scope.items = scope.entities;
        } else {
          scope.items = scope.tableEntity;
        }
        return scope.items;
      };

      scope.isPage = function (entity) {
        return entity.type.includes('page,')
      };

      scope.isBlog = function (entity) {
        return entity.type.includes('blogpost,');
      };

      scope.selectAll = function () {
        if (scope.bulkSelected[scope.activeType]) {
          scope.bulkSelect(scope.activeType);
        } else {
          scope.bulkUnselect(scope.activeType);
        }
      };

      scope.bulkSelect = function (type) {
        var items = scope.entitySet.getType(type);
        items = $filter('multiFilter')(items, scope.searchFilter[scope.activeType],  scope.showSearchBar.searchBar);
        scope.bulkSelectedItems[type] = [];
        for (var i in items) {
          scope.bulkSelectedItems[type].push(items[i].getID());
        }
      };

      scope.bulkUnselect = function (type) {
        scope.bulkSelectedItems[type] = [];
      };

      scope.toggleBulkList = function (itemId) {
        if (!scope.bulkSelectedItems[scope.activeType]) {
          scope.bulkSelectedItems[scope.activeType] = [];
        }
        var index = scope.bulkSelectedItems[scope.activeType].indexOf(itemId);
        if (index > -1) {
          scope.bulkSelectedItems[scope.activeType].splice(index, 1);
        } else {
          scope.bulkSelectedItems[scope.activeType].push(itemId);
        }
      };

      document.onkeydown = function (event) {
        if (event.ctrlKey === true && event.which === 82) {//ctrl + r
          var force = false;
          scope.selectedEntity.refresh(function () { });
          event.preventDefault();
        }
        if (event.ctrlKey === true && event.which === 70) { //ctrl + f
          scope.$apply(function() {
            scope.toggleSearchBar();
          });
          event.preventDefault();
        }
      };

      scope.selectEntity = function (entityIn) {
        scope.selectedEntity = entityIn;
      };

      $rootScope.$on('togglePath', function () {
        scope.searchingPath = !scope.searchingPath;
      });

    }
  };
}]);
