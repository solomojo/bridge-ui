angular.module('app.components').directive('ltkDialog', ['$sce', function($sce) {
  return {
    restrict: 'E',
    scope: {
      template:'=',
      onConfirm: '&',
      onCancel: '&'
    },
    templateUrl: $sce.trustAsResourceUrl(chrome.extension.getURL('popup/modules/components/ltk-dialog/ltk-dialog.html')),
    link: function(scope) {
    }
  };
}]);
