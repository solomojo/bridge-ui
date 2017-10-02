angular.module('app.components').directive('mainHeader', ['$sce', '$mdMenu', '$filter', function($sce, $mdMenu, $filter) {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: $sce.trustAsResourceUrl(chrome.extension.getURL('popup/modules/components/mainHeader/mainHeader.html')),
    link: function(scope, element, attrs, ctrl) {

      scope.buttonActive = {};
      var basePath = 'modules/components/';
      var openLeft = 50;
      var shadowOffset = 10;
      scope.menuToggled = false;

      scope.toggleMenu = function() {
        $mdMenu.hide();
        scope.slideMenuLeft = scope.slideMenuLeft === '0px' ? '-' + (openLeft + shadowOffset) + 'px' : '0px';
        scope.menuToggled = !scope.menuToggled;
        if(scope.menuToggled === false) {
          scope.slideMenuLeft = '-' + (openLeft + shadowOffset) + 'px';
          resetButtons();
          scope.menuPageLeft = '-100%';
        }
        else {
          scope.slideMenuLeft = '0px';
        }
      };

      function resetButtons(page) {
        for(var key in scope.buttonActive){
          page !== key && (scope.buttonActive[key] = false);
        }
      }

      scope.buttonAction = function(page) {
        resetButtons(page);
        scope.buttonActive[page] = !scope.buttonActive[page];
        if(scope.buttonActive[page] === true) {
          page && (scope.currentMenuPage = basePath + page + '/' + page + '.html');
          console.log(scope.currentMenuPage);
          scope.menuPageLeft = openLeft + 'px';
        }
        else {
          scope.menuPageLeft = '-100%';
        }
      };

      // moved from popup controller
      scope.clickLogo = function() {
        if(scope.connector.enabled != 1) {
          return setView('connect');
        }
        if (scope.activeView === 'bulk' && scope.connector.detected.id !== null) {
          scope.setView('single');
        } else {
          scope.setView('bulk');
        }
      };

      scope.backToPage = function() {
        console.log(window.location.href);
        var url = window.location.href;
        var key = 'parentId=';
        var tabId = +url.slice(url.indexOf(key) + key.length);
        chrome.windows.getCurrent({}, function (mywindow) {
          chrome.runtime.sendMessage({action:"backgroundPin", tabId: tabId, tabURL: url, windowId: mywindow.id});
        });
      };

    }
  };
}]);
