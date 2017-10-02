angular.module('app.components').directive('targetBtns', ['$sce','CONFIG', function($sce, CONFIG) {
  return {
    restrict: 'C',
    scope: {
      entity: '=',
      onForceDownload: '=',
      showConfirmTargetDeleteDialog: '='
    },
    templateUrl: $sce.trustAsResourceUrl(chrome.extension.getURL('popup/modules/components/targetBtns/targetBtns.html')),
    link: function(scope) {

      scope.getShowAdvanced = function() {
        return CONFIG.chrome.options.showAdvancedOptions;
      };

      scope.forceDownload = function(locale) {
        scope.onForceDownload(locale, scope.entity);
      };

    }
  };
}]);
