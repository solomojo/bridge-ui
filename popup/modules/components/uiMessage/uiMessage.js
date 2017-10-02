angular.module('uiMessage', [])
  .directive("uiMessage", ['uiMessage', '$sce', function(uiMessage, $sce) {
    return {
      restrict: 'E',
      scope: {
        'messageHeight' : '=?',
        'linger' : '=?'
      },
      templateUrl: $sce.trustAsResourceUrl(chrome.extension.getURL('popup/modules/components/uiMessage/uiMessage.html')),
      link: function(scope, element, attrs) {

        scope.messageHeight = scope.messageHeight === undefined ? '45px' : scope.messageHeight;
        scope.linger = scope.linger === undefined ? 4000 : scope.linger;

        if(scope.messageHeight === undefined) {
          scope.messageHeight = '45px';
        }

        uiMessage.onMessage = function(message, linger) {
          linger = linger === undefined ? scope.linger : linger;
          if (message.match(/[a|A][p|P][i|I].*[e|E]rror/)) {
            linger = 100000000;
          }
          scope.messageStyle.top = 0;
          scope.messageStyle.boxShadow = '0 2px 10px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.26)';
          scope.message = message;
          window.setTimeout(function() {
            scope.$apply(scope.closeMessage);
          }, linger);
        };

        scope.closeMessage = function () {
          var height = document.getElementById('s-uiMessageMessage').getBoundingClientRect().height;
          scope.messageStyle.top = '-' + height + 'px';
          scope.messageStyle.boxShadow = 'none';
        };

        scope.iconStyle = {
          color:'#999'
        };

        scope.messageStyle = {
          top: '-' + scope.messageHeight,
          minHeight: scope.messageHeight
        };
      }
    };
  }])

  .factory('uiMessage',[function(){
      return {
        setMessage: function(message, linger) {
          this.onMessage(message, linger);
        }
      };
  }]);
