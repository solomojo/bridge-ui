angular.module('app.controllers').controller('popupController', ['$scope', '$sce', '$timeout', '$translate', 'Entity', 'EntitySet', 'Connector', 'CONFIG', '$filter', '$mdDialog','uiMessage', 'Middleware',
  function ($scope, $sce, $timeout, $translate, Entity, EntitySet, Connector, CONFIG, $filter, $mdDialog, uiMessage, Middleware) {
    // Variables
    $scope.activeView = 'loading';
    $scope.activeType = null;
    $scope.locales = [
      'en-US',
      'de-DE',
      'fr-FR',
      'es-ES'
    ];
    if (CONFIG.error === undefined) {
      $scope.options = CONFIG.chrome.options;
      $scope.url = $scope.options.url ?  $scope.options.url : CONFIG.url.protocol + '//www.' + CONFIG.url.hostname + CONFIG.url.pathname;
      $scope.showId = CONFIG.chrome.options.showId;
      $scope.showPath = CONFIG.chrome.options.showPath;
      $scope.context = CONFIG.context;
      $scope.chooseProfile = CONFIG.chrome.options.chooseProfile;
      $scope.showProfile = CONFIG.chrome.options.showProfile;
      $scope.showAdvancedOptions = CONFIG.chrome.options.showAdvancedOptions;
      $scope.openNewWindow = CONFIG.chrome.options.openNewWindow === undefined ? false : CONFIG.chrome.options.openNewWindow;
      // checks the user's default language and loads that language in
      if (CONFIG.chrome.options.language) {
        $scope.currentLocale = CONFIG.chrome.options.language;
        $translate.use($scope.currentLocale);
      } else {
        $scope.currentLocale = $scope.locales[0];
      }
    }
    $scope.loading_list = false;
    $scope.loading = false;
    $scope.config = CONFIG;
    $scope.bulkSelectedItems = {};
    $scope.bulkSelected = {};
    $scope.progress = 0;
    $scope.entity = null;
    $scope.entitySet = new EntitySet();
    $scope.entities = null;
    $scope.connector = Connector;
    $scope.translationProfiles = Connector.translation_profiles;
    $scope.connectors = CONFIG.connectors;
    $scope.searchFilter = {};
    $scope.showSearchBar = {
      searchBar: false
    };
    $scope.tableEntity = [];
    $scope.hoverSelect = false;
    $scope.rowLimiter = [];
    if ($scope.connectors && !CONFIG.error) {
      $scope.activeConnector = {};
      setActiveConnector();
      getAvailableConnectors();
    }

    $scope.init = function () {

      var divWidth;
      $scope.extensionVersion = chrome.runtime.getManifest().version;
      $scope.isFrame = chrome.tabs.fake === true;
      if ($scope.connector.enabled == 1) {
        $scope.content_type = $scope.connector.detected.type;
        $scope.document_id = $scope.connector.detected.id;
        $scope.translatable = ($scope.document_id !== null);

        if ($scope.translatable) {
          $scope.setView('single');
        }
        else {
          $scope.setView('bulk');
        }
      }
      else {
        console.log(CONFIG);
        if (CONFIG.error === undefined && (!CONFIG.chrome.options.token || !CONFIG.chrome.options.token.length)) {
          $scope.setView('login');
        }
        else {
          $scope.setView('connect');
        }
      }

      chrome.storage.sync.get('version', function (obj) {
        if (!obj.version || (obj.version && $scope.extensionVersion !== obj.version)) {
          chrome.storage.sync.set({ version: $scope.extensionVersion });
          $mdDialog.show({
            controller: 'releaseNotes',
            templateUrl: $sce.trustAsResourceUrl(chrome.extension.getURL('popup/modules/components/releaseNotes/releaseNotes.html')),
            parent: angular.element(document.body),
            clickOutsideToClose: true
          });
        }
      });

    };

    $timeout(function () {
      getIndex();
    }, 0);

    function getIndex() {
      var types = $scope.connector.content_types;
      if (types) {
        for (var i = 0; i < types.length; i++) {
          if (types[i].api_name === $scope.activeType) {
            $scope.tabIndex = i;
          }
        }
      }
    }

    $scope.openWindow = function () {
      chrome.runtime.sendMessage({ action: "windowsCreate", url: window.location.href });
    };

    $scope.closeFrame = function () {
      chrome.runtime.sendMessage({ action: "closeFrame" });
    };

    function loadLastType() {
      var getObj = {};
      getObj[Connector.id] = 'missing';//sets value to missing if not in storage
      chrome.storage.local.get(getObj, function (data) {
        if (data[Connector.id] !== 'missing') {
          console.log(data);
          $scope.showContent(data[Connector.id].currentContentType);
        }
        else {
          $scope.showContent(Connector.getContentType(0).api_name, Connector.getContentType(0).display_name);
        }
      });
    }

    $scope.clickLogin = function () {
      console.log("clickLogin");
      chrome.tabs.query({
        currentWindow: true,
        active: true
      }, function (tabs) {
        chrome.tabs.create({ url: CONFIG.mwHost, index: tabs[0].index }, function () {
          chrome.tabs.sendMessage({ url: CONFIG.chrome.tab.url, action: 'close' });
        });
      });
    };

    // Opens the options page
    $scope.optionsPage = function () {
      chrome.runtime.openOptionsPage();
    };

    $scope.toggleOption = function (key) {
      $scope[key] = !$scope[key];
      var storageObject = {};
      storageObject[key] = $scope[key];
      CONFIG.chrome.options[key] = $scope[key];
      chrome.storage.sync.set(storageObject);
    };

    $scope.saveUrl = function () {
      var url = document.getElementById('set_url').value;
      var storageObject = {};
      storageObject.url = url;
      CONFIG.chrome.options.url = url;
      chrome.storage.sync.set(storageObject);
      uiMessage.setMessage("Url saved! Reload the page or ui to see the change.");
    };

    //enables extension to remember last category selected
    function saveCurrentType(type) {
      var saveLastTypeObj = {};
      saveLastTypeObj[Connector.id] = { currentContentType: type };
      chrome.storage.local.set(saveLastTypeObj, function () { });
    }

    function getLocaleList() {
      $scope.$apply(function () {
        var usedKeys = {};
        $scope.localeList = [];
        for (var i = 0; i < $scope.entities.length; i++) {
          var entity = $scope.entities[i];
          for (var key in entity.statuses) {
            if (usedKeys[key] === undefined) {
              var toPush = $filter('localeFilter')(key);
              if (entity.statuses[key] !== 'disabled') {
                $scope.localeList.push({ locale: key, text: toPush });
              }
            }
            usedKeys[key] = true;
          }
        }
      });
    }

    // Shows the list of documents based on content type
    $scope.showContent = function (type, displayName) {
      saveCurrentType(type);
      $scope.activeType = (type === null) ? Connector.getContentType(0).api_name : type;

      // Saves the display name for the search bar
      $scope.displayName = displayName;
      if (!displayName) {
        var types = Connector.getContentTypes();
        for (var i = 0; i < types.length; i++) {
          if (types[i].api_name === $scope.activeType) {
            $scope.displayName = types[i].display_name;
            break;
          }
        }
      }
      $scope.entities = $scope.entitySet.getType($scope.activeType);
      if (!$scope.entitySet.typeRequested($scope.activeType)) {
        $scope.loading_list = true;
        $scope.entitySet.requestType(type, function (entities) {
          // If the user needs to re-authenticate via oauth 2
          if (entities.includes("reauthenticate")) {
            var index = entities.indexOf(entities, "reauthenticate");
            entities.splice(index, 1);

            var url = "https://app.hubspot.com/oauth/authorize?client_id=b315f20d-8fc4-11e5-b68c-8d8b42a86692&redirect_uri="+CONFIG.mwHost+"/connect/auth/"+$scope.connector.connected_details.id+"/hubspot&scope=content%20forms";

            $scope.openUrl(url);
            $scope.openUrl(CONFIG.mwHost);
          }
          $scope.entities = entities;
          $scope.loading_list = false;
          window.setTimeout(getLocaleList, 0);
        }, function (error) {
          $scope.loading_list = false;
          $scope.connector.enabled = false;
          $scope.setView('connect');
        });
      }
    };

    // Refreshes all items, does not matter if they are selected or not
    $scope.refreshAll = function () {
      if ($scope.activeView === 'single') {
        $scope.entity.refresh();
      } else {
        if ($scope.bulkSelectedItems[$scope.activeType] && $scope.bulkSelectedItems[$scope.activeType].length > 0) {
          $scope.bulkRefresh();
        } else {
          $scope.loading_list = true;
          $scope.entitySet.requestType($scope.activeType, function (entities) {
            $scope.entities = entities;
            $scope.loading_list = false;
            window.setTimeout(getLocaleList, 0);
          }, function (error) {
            $scope.loading_list = false;
            $scope.connector.enabled = false;
            $scope.setView('connect');
          });
        }
      }
    };

    // Refreshes all selected items
    $scope.bulkRefresh = function () {
      var type = $scope.activeType;
      var items = $scope.bulkSelectedItems[type];
      var increment = Math.ceil(100 * (1 / items.length));
      $scope.progress = 0;
      angular.forEach(items, function (itemId, key) {
        var entity = ($scope.entity && $scope.entity.id == itemId) ? $scope.entity : $scope.entitySet.getEntity(type, itemId);
        entity.refresh(function () {
          $scope.progress += increment;
          $scope.progress = $scope.progress > 100 ? 100 : $scope.progress;
        });
      });
    };

    function getAvailableConnectors() {
      Middleware.getAllConnectors().then(function (response) {
        $scope.availableConnectors = response.data;
        $scope.availableConnectors = $scope.availableConnectors.filter(function (connector) {
          return !$scope.connectors.some(function (conn) {
            if (connector.id === conn.connector.id || connector.slug === 'existing-connector') {
              return true;
            }
          });
        });
      });
    }

    $scope.setView = function (view) {
      console.log("setView(" + view + ")");
      $scope.activeView = view;

      // trigger extra functionality
      if ($scope.activeView === 'single') {
        $scope.isSinglePage = true;
        if ($scope.entity === null) {
          $scope.entity = new Entity();
          $scope.loading_list = true;
          Entity.request($scope.connector.detected.id, $scope.connector.detected.type, function (entity) {
            $scope.entity = entity;
            $scope.tableEntity.push(entity);
            $scope.loading_list = false;
          });
        }
      } else if ($scope.activeView === 'bulk') {
        $scope.isSinglePage = false;
        console.log(Connector.getContentType());
        var type = ($scope.activeType !== null) ? $scope.activeType : (($scope.connector.detected.type !== null) ? $scope.connector.detected.type : Connector.getContentType(0).api_name);
        if ($scope.activeType === null && $scope.connector.detected.type === null) {
          loadLastType();
        }
        else {
          $scope.showContent(type);
        }
        getIndex();
      }
    };

    $scope.showConfirmForceDownloadDialog = function (locale, entity) {
      $scope.lastForceEntity = entity;
      $scope.lastForceLocale = locale;
      $scope.showDialog = true;
      $scope.dialogUrl = $sce.trustAsResourceUrl(chrome.extension.getURL('popup/modules/components/ltk-dialog/dialogTemplates/forceDownloadDialog.html'));
      $scope.confirmDialog = function () { $scope.lastForceEntity.importTranslation($scope.lastForceLocale, true); $scope.showDialog = false; };
      $scope.cancelDialog = function () { $scope.showDialog = false; };
    };

    $scope.showConfirmSourceDeleteDialog = function (entity, deleteFromSystem) {
      $scope.lastEntity = entity;
      $scope.deleteFromSystem = deleteFromSystem;
      $scope.showDialog = true;
      $scope.dialogUrl = $sce.trustAsResourceUrl(chrome.extension.getURL('popup/modules/components/ltk-dialog/dialogTemplates/deleteDialog.html'));
      $scope.confirmDialog = function () {
        $scope.lastEntity.disassociate($scope.deleteFromSystem);
        $scope.showDialog = false;
      };
      $scope.cancelDialog = function () { $scope.showDialog = false; };
    };

    $scope.showConfirmTargetDeleteDialog = function (entity, locale, deleteFromSystem) {
      $scope.lastEntity = entity;
      $scope.lastLocale = locale;
      $scope.deleteFromSystem = deleteFromSystem;
      $scope.showDialog = true;
      $scope.dialogUrl = $sce.trustAsResourceUrl(chrome.extension.getURL('popup/modules/components/ltk-dialog/dialogTemplates/deleteDialog.html'));
      $scope.confirmDialog = function () {
        $scope.lastEntity.removeTranslation($scope.lastLocale, $scope.deleteFromSystem);
        $scope.showDialog = false;
      };
      $scope.cancelDialog = function () { $scope.showDialog = false; };
    };

    $scope.showChooseProfileDialog = function (entity) {
      $mdDialog.show({
        templateUrl: 'modules/components/ltk-dialog/dialogTemplates/chooseProfileDialog.html',
        locals: {
          translationProfiles: $scope.translationProfiles,
          entity: entity
        },
        controller: ['$scope', '$mdDialog', 'translationProfiles', 'entity', DialogController]
      });
      function DialogController($scope, $mdDialog, translationProfiles, entity) {
        $scope.translationProfiles = translationProfiles;

        $scope.closeDialog = function () {
          $mdDialog.hide();
        };

        $scope.upload = function(profileId) {
            entity.upload(profileId);
            $mdDialog.hide();
        };
      }
    };

    // used by connect.html and settings.html
    $scope.openUrl = function (url, callback) {
      url = url ? url : CONFIG.mwHost;
      cb = callback ? callback : null;
      chrome.tabs.create({ url: url }, cb);
    };

    $scope.openConnectorUrl = function(connector) {
      var url = connector.connector.connect_url;
      if (connector.connector && !connector.active) {
        url += '/#/auth/'+connector.connector.slug+'?connectorId=' + connector.id;
        chrome.tabs.create({url: url});
      } else if (connector.active){
        url += '#/connector/'+ connector.id + '/defaults';
        chrome.tabs.create({url: url});
      }
      else {
        $scope.clickLogin();
      }
      chrome.tabs.sendMessage({ url: CONFIG.chrome.tab.url, action: 'close' });
    };

    $scope.showConfirmDisconnect = function (entity, locale, deleteFromSystem) {
      $scope.showDialog = true;
      $scope.dialogUrl = $sce.trustAsResourceUrl(chrome.extension.getURL('popup/modules/components/ltk-dialog/dialogTemplates/disconnectDialog.html'));
      $scope.confirmDialog = function () {
        $scope.disconnect();
        $scope.showDialog = false;
      };
      $scope.cancelDialog = function () { $scope.showDialog = false; };
    };

    // move to settings js file
    $scope.disconnect = function () {
      console.log("disconnect");
      var affirmative_response = true; // confirm("Are you sure you would like to disconnect your Lingotek account? \n\nAfter disconnecting, you will need to re-connect an account to continue using Lingotek.");
      if (affirmative_response) {
        chrome.storage.sync.set({
          token: ''
        }, function () {
          // cleared
          window.close();
          $scope.closeFrame();
        });
      }
    };

    // move to settings js file
    $scope.changeLanguage = function (langKey) {
      var storageObject = {};
      var key = "language";
      storageObject[key] = langKey;
      CONFIG.chrome.options[key] = langKey;
      chrome.storage.sync.set(storageObject);
      $translate.use(langKey);
    };

    $scope.toggleSearchBar = function () {
      $scope.resetScroll();
      $scope.showSearchBar.searchBar = !$scope.showSearchBar.searchBar;
      $scope.searchFilter[$scope.activeType] || ($scope.searchFilter[$scope.activeType] = {});
      $scope.showSearchBar.searchBar || ($scope.searchFilter[$scope.activeType] = {});
    };

    $scope.resetScroll = function () {
      if ($scope.rowLimiter !== undefined && $scope.rowLimiter.length > 12) {
        $scope.rowLimiter = [];
        for (var i = 0; i < 12; i++) {
          $scope.rowLimiter.push(true);
        }
      }
    }

    try {
      window.addEventListener("message", receiveMessage, false);
    } catch (e) {
      //firefox has different permissions concerning adding events to the window
    }

    function receiveMessage(event) {
      switch (event.data.action) {
        case "popout":
          $scope.openWindow();
          break;
      }
    }


    $scope.inactiveConnector = function(connector){
      return !connector.connector.external && !connector.active && $scope.connector.id !== connector.connector.slug;
    };

    function setActiveConnector() {
      $scope.connectors.some(function(connector) {
        if ($scope.connector.id === connector.connector.slug){
          $scope.activeConnector = connector;
          return true;
        }
      });
    }

    // This is a temporary thing as it closes the ui if it is the oauth2 auth url for HubSpot
    // to avoid an infinite loop of opening new windows if the user needs to authenticate via
    // oauth2

    // LOAD
    if (window.location.href.includes("https://app.hubspot.com/oauth/authorize"))
      $scope.disconnect();
    else
      $scope.init();

  }]);
