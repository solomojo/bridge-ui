angular.module('app.components').directive('sourceBtns', ['$sce','CONFIG', function($sce, CONFIG) {
  return {
    restrict: 'C',
    scope: {
      entity: '=',
      showConfirmSourceDeleteDialog: '=',
      showChooseProfileDialog: '='
    },
    templateUrl: $sce.trustAsResourceUrl(chrome.extension.getURL('popup/modules/components/sourceBtns/sourceBtns.html')),
    link: function(scope) {

      scope.getShowAdvanced = function() {
        return CONFIG.chrome.options.showAdvancedOptions;
      };

      scope.getChooseProfile = function() {
        return CONFIG.chrome.options.chooseProfile;
      }

    }
  };
}]);
