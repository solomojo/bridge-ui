angular.module('app.factories').factory('Middleware', ['$http', '$q', 'CONFIG', function($http, $q, CONFIG) {
  var req = {
    method: 'GET',
    url: CONFIG.mwApiBaseUrl,
    data: {
    }
  };
  if(CONFIG.error !== undefined) {
    return {};
  }
  $http.defaults.headers.common.Authorization = CONFIG.chrome.options.token;
  $http.defaults.headers.common.Connector = CONFIG.connector_id;

  return {
    requestConnectorDetails: function(id) {
      return $http({
        method: 'GET',
        url: req.url + '/connector/' + id
      });
    },
    getAllConnectors: function() {
      return $http({
        method: 'GET',
        url: req.url + '/allConnectors'
      });
    },
    uploadSource: function(id, type, translation_profile_id) {
      return $http({
        url: req.url + '/content',
        method: 'POST',
        data: {
          id: id,
          type: type,
          translation_profile_id: translation_profile_id
        }
      });
    },
    updateSource: function(id, type, translationProfileId) {
      return $http({
        url: req.url + '/content/' + id,
        method: 'PATCH',
        data: {
          id: id,
          type: type,
          translation_profile_id: translationProfileId
        }
      });
    },
    requestEntityStatus: function(id, type, isMindTouch) {
      if (isMindTouch) {
        return $http({
          method: 'GET',
          url: req.url + '/content/',
          params: {
            id: id,
            type: type
          }
        });
      } else {
        return $http({
          method: 'GET',
          url: req.url + '/content/' + id,
          params: {
            type: type
          }
        });
      }
    },
    disassociateEntity: function(id, type, deleteFromSystem) {
      if (deleteFromSystem) {
        return $http({
          method: 'DELETE',
          url: req.url + '/content/' + id,
          params: {
            type: type,
            delete_from_system: true
          }
        });
      } else {
        return $http({
          method: 'DELETE',
          url: req.url + '/content/' + id,
          params: {
            type: type
          }
        });
      }
    },
    refreshEntityStatus: function(id, type) {
      return $http({
        method: 'GET',
        url: req.url + '/target',
        params: {
          id: id,
          type: type
        }
      });
    },
    requestEntitiesByType: function(type, offset) {
      return $http({
        method: 'GET',
        url: req.url + '/content',
        params: {
          // id: id,
          offset: offset,
          type: type
        }
      });
    },
    requestTranslation: function(id, type, locale) {
      return $http({
        url: req.url + '/target/create',
        method: 'GET',
        params: {
          id: id,
          type: type,
          locale: locale
        }
      });
    },
    importTranslation: function(id, type, locale, force) {
      if (force) {
        return $http({
          url: req.url + '/target',
          method: 'POST',
          data: {
            id: id,
            type: type,
            locale: locale,
            force_download: true
          }
        });
      } else {
        return $http({
          url: req.url + '/target',
          method: 'POST',
          data: {
            id: id,
            type: type,
            locale: locale
          }
        });
      }
    },
    editTranslation: function(id, type, locale) {
      var defer = $q.defer();
      $http({
        url: req.url + '/target/' + id + '/edit',
        method: 'GET',
        params: {
          type: type,
          locale: locale
        }
      }).then(function(response) {
        var redirectUrl = response.data;
        chrome.tabs.create({ url: redirectUrl }, defer.resolve);
      }, function(error) {
        defer.reject(error);
      });
      return defer.promise;
    },
    viewTranslation: function(id, type, locale) {
      var defer = $q.defer();
      $http({
        url: req.url + '/target/' + id,
        method: 'GET',
        params: {
          type: type,
          locale: locale
        }
      }).then(function(response) {
        var redirectUrl = response.data;
        if(redirectUrl.indexOf('http') !== -1) {
          chrome.tabs.create({ url: redirectUrl }, defer.resolve);
        }
        else {
          defer.reject();
        }
      }, function(error) {
        defer.reject(error);
      });
      return defer.promise;
    },
    removeTranslation: function(id, type, locale, deleteFromSystem) {
      if (deleteFromSystem) {
        return $http({
          url: req.url + '/target/' + id,
          method: 'DELETE',
          params: {
            type: type,
            locale: locale,
            delete_from_system: true
          }
        });
      } else {
        return $http({
          url: req.url + '/target/' + id,
          method: 'DELETE',
          params: {
            type: type,
            locale: locale
          }
        });
      }
    }
  };
}]);
