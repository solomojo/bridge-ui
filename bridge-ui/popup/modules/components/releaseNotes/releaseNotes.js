angular.module('app.components').controller('releaseNotes', ['$scope', '$mdDialog', 'CONFIG', function ($scope, $mdDialog, CONFIG) {

  $scope.version = chrome.runtime.getManifest().version;
  $scope.releaseDate = 'August 16, 2017'
  $scope.connectorName = CONFIG.connector.connector.name;

  $scope.releaseNotes = [
    // {
    //   title: 'Enhancements',
    //   notes: [
    //     'Enhanced display of content types for Confluence.'
    //   ]
    // },
    {
      title: 'Fixes',
      notes: [
        'Fixed strange status changes when refreshing.',
        'Other minor bug fixes and improvements.'
      ]
    }
  ];

  $scope.hide = function () {
    $mdDialog.hide();
  };
}]);
