angular.module('app.components').directive('tabMenu', ['$sce', '$mdMenu', '$mdDialog', function($sce, $mdMenu, $mdDialog) {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: $sce.trustAsResourceUrl(chrome.extension.getURL('popup/modules/components/tabMenu/tabMenu.html')),
    link: function(scope, element, attrs) {

      function bulkDownloadSelectedItems () {
        var type = scope.activeType;
        var items = scope.bulkSelectedItems[type];
        angular.forEach(items, function(itemId, key) {
          var entity = (scope.entity && scope.entity.id == itemId) ? scope.entity : scope.entitySet.getEntity(type, itemId);
          entity.importAllTranslations(true);
        });
      }

      scope.openTabMenu = function ($mdOpenMenu, ev, type) {
        if (scope.showSearchBar.searchBar) {
          setTimeout(function () {
            document.getElementById('search-filter').select();
          }, 0);
        }
        if (type === scope.activeType && scope.bulkSelectedItems[type] && scope.bulkSelectedItems[type].length) {
          $mdOpenMenu(ev);
        }
      };

      function bulkUp(force, translationProfileId) {
        var type = scope.activeType;
        var items = scope.bulkSelectedItems[type];
        for(var i = 0; i < items.length; i++) {
          var itemId = items[i];
          var entity = (scope.entity && scope.entity.id == itemId) ? scope.entity : scope.entitySet.getEntity(type, itemId);
          console.log(entity);
          if(entity.source.status !== 'current' || force) {
            entity.upload(translationProfileId);
          }
        }
      }

      scope.bulkUpload = bulkUp;

      scope.bulkRequestTranslations = function (selectedLocale) {
        $mdMenu.hide();
        var getAllLocales = selectedLocale === undefined;
        var type = scope.activeType;
        var items = scope.bulkSelectedItems[type];
        var estimatedRequests = 0;
        scope.progress = 0;
        angular.forEach(items, function(itemId, key) {
          var entity = (scope.entity && scope.entity.id == itemId) ? scope.entity : scope.entitySet.getEntity(type, itemId);
          var statuses = entity.getTargetStatuses();
          for(var locale in statuses){
            if(statuses[locale] === 'none'){
              estimatedRequests++;
            }
          }
          var increment = Math.ceil(100 * (1 / estimatedRequests));
          for(var locale in statuses) {
            if (statuses[locale] === 'none' && (locale === selectedLocale || getAllLocales === true)) {
              entity.requestTranslation(locale, function () {
                scope.progress += increment;
                scope.progress = scope.progress > 100 ? 100 : scope.progress;
              });
            }
          }
        });
      };

      scope.bulkImport = function(){
        console.log("bulkImport()");
        var type = scope.activeType;
        var items = scope.bulkSelectedItems[type];
        var increment = Math.ceil(100 * (1 / items.length));
        var estimatedRequests = 0;
        scope.progress = 0;
        angular.forEach(items, function(itemId, key) {
          var entity = (scope.entity && scope.entity.id == itemId) ? scope.entity : scope.entitySet.getEntity(type, itemId);
          var statuses = entity.getTargetStatuses();
          for(var locale in statuses){
            if(statuses[locale] === 'none'){
              estimatedRequests++;
            }
          }
          var increment = Math.ceil(100 * (1 / estimatedRequests));
          for(locale in statuses){
            if(statuses[locale] === 'ready'||statuses[locale] === 'ready-x'){
              entity.importTranslation(locale, function () {
                scope.progress += increment;
                scope.progress = scope.progress > 100 ? 100 : scope.progress;
              });
            }
          }
        });
      };

      scope.showBulkConfirmForceDownloadDialog = function() {
        scope.showDialog = true;
        scope.dialogUrl = $sce.trustAsResourceUrl(chrome.extension.getURL('popup/modules/components/ltk-dialog/dialogTemplates/forceDownloadDialog.html'));
        scope.confirmDialog = function() {bulkDownloadSelectedItems();scope.showDialog = false;};
        scope.cancelDialog = function() {scope.showDialog = false;};
      };

      scope.showConfirmBulkDeleteDialog = function(deleteFromSystem) {
        scope.deleteFromSystem = deleteFromSystem;
        scope.showDialog = true;
        scope.dialogUrl = $sce.trustAsResourceUrl(chrome.extension.getURL('popup/modules/components/ltk-dialog/dialogTemplates/deleteDialog.html'));
        scope.confirmDialog = function() {
          scope.bulkDisassociate(scope.deleteFromSystem);
          scope.showDialog = false;
        };
        scope.cancelDialog = function() {scope.showDialog = false;};
      };

      scope.bulkShowChooseProfileDialog = function (force) {
        $mdMenu.hide();

        $mdDialog.show({
          templateUrl: 'modules/components/ltk-dialog/dialogTemplates/chooseProfileDialog.html',
          locals: {
            translationProfiles: scope.translationProfiles
          },
          controller: ['scope', '$mdDialog', 'translationProfiles', DialogController]
        });
        function DialogController(scope, $mdDialog, translationProfiles) {
          scope.translationProfiles = translationProfiles;

          scope.closeDialog = function () {
            $mdDialog.hide();
          };

          scope.upload = function(profileId) {
            bulkUp(force, profileId);
            $mdDialog.hide();
          };

        }
      };

      scope.bulkDisassociate = function(deleteFromSystem){
        console.log("bulkDisassociate()");
        var type = scope.activeType;
        var items = scope.bulkSelectedItems[type];
        var increment = Math.ceil(100 * (1 / items.length));
        scope.progress = 0;
        angular.forEach(items, function(itemId, key) {
          var entity = (scope.entity && scope.entity.id == itemId) ? scope.entity : scope.entitySet.getEntity(type, itemId);
          entity.setTranslationProfileName("Default");
          entity.disassociate(function(deleteFromSystem) {
            scope.progress += increment;
            scope.progress = scope.progress > 100 ? 100 : scope.progress;
          });
        });
      };

    }
  };
}]);
