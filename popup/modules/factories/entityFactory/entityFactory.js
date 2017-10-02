angular.module('app.factories').factory('Entity', ['Middleware', 'uiMessage', 'Connector','$filter',
function (Middleware, uiMessage, Connector, $filter) {

  function Entity() {
    this.loading = true;
    this.statuses = {};
  }
  var isMindTouch = false;

  if (Connector.slug === 'mindtouch') {
    isMindTouch = true;
  }

  Entity.fromAPI = function(data) {
    var entity = new Entity();
    entity.update(data.id, data.type, data);
    return entity;
  };
  Entity.request = function(id, type, callback) {
    Middleware.requestEntityStatus(id, type, isMindTouch).then(function(response) {
      var data = response.data;
      callback(Entity.fromAPI(data));
    }, function(error) {
      console.log(error);
      var message = error.data.message ? error.data.message : $filter('translate')('error_request_status');
      uiMessage.setMessage(message);
    });
  };

  function isFunction(functionToCheck) {
    return typeof(functionToCheck) === 'function';
//    var getType = {};
//    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }
  Entity.prototype = {
    getID: function() {
      return (this.id);
    },
    getType: function() {
      return (this.type);
    },
    getKey: function() {
      return this.type + "+" + this.id;
    },
    getTargetStatuses: function() {
      return (this.statuses);
    },
    request: function() {
      this.loading = true;
    },
    refresh: function(callback) {
      this.loading = true;
      var self = this;
      Middleware.refreshEntityStatus(this.id, this.type).then(function(response) {
        var data = response.data;
        self.update(self.id, self.type, data);
        if (isFunction(callback)) {
          callback(self);
        }
      }, function(error) {
        console.log(error);
        var message = error.data.message ? error.data.message : $filter('translate')('error_refresh_status');
        uiMessage.setMessage(message);
      });
    },
    setTranslationProfileName: function(profileName) {
      this.translation_profile_name = profileName;
    },
    setDisabled: function(languageSettings) {
      if (languageSettings && languageSettings != 'default'){
        for (var locale in languageSettings) {
          if (languageSettings[locale] === 'disabled') {
            this.statuses[locale] = languageSettings[locale];
          }
        }
      }
    },
    setConfluenceLocales: function(confluenceLocales) {
      if (confluenceLocales !== undefined) {
        for (var locale in this.statuses) {
          if (confluenceLocales[locale.replace('-', '_')] === undefined) {
            this.statuses[locale] = 'disabled';
          }
        }
      }
    },
    update: function(id, type, data) {
      var urlPath = $filter('urlPath')(data.url);
      this.id = id;//Connector.detected.id === undefined ? id : Connector.detected.id;
      this.type = type;
      this.name = data.title;
      this.source = data.source;
      if (data.locale) {
        this.statuses[locale] = data.targets[locale]; // target locale statuses
      } else {
        this.statuses = data.targets;
      }
      this.url = urlPath;
      // this.created = createdTime;
      // this.modified = modifiedTime;
      var translationProfile = data.translation_profile;
      this.setTranslationProfileName(translationProfile.name);
      this.setDisabled(translationProfile.language_settings);
      this.setConfluenceLocales(data.confluence_locales);
      this.loading = false;
    },
    upload: function(translationProfileId) {
      this.loading = true;
      var self = this;
      if(this.source.status === 'none' || this.source.status === 'untracked') {
        Middleware.uploadSource(this.id, this.type, translationProfileId).then(function(response) {
          var data = response.data;
          self.update(self.id, self.type, data);
        }, function(error) {
          console.log(error);
          self.loading = false;
          var message = error.data.message ? error.data.message : $filter('translate')('error_upload_source');
          uiMessage.setMessage(message);
        });
      } else {
        Middleware.updateSource(this.id, this.type, translationProfileId).then(function(response) {
          var data = response.data;
          self.update(self.id, self.type, data);
        }, function(error) {
          console.log(error);
          self.loading = false;
          var message = error.data.message ? error.data.message : $filter('translate')('error_update_source');
          uiMessage.setMessage(message);
        });
      }
    },
    requestAllTranslations: function(callback, translationProfileId) {
      console.log("requestAllTranslations");
      var statuses = this.getTargetStatuses();
      for(var locale in statuses){
        if(statuses[locale] === 'none'){
          if (translationProfileId === undefined) {
            this.requestTranslation(locale, undefined, function (response) {
              if (isFunction(callback)) {
                callback(response);
              }
            });
          } else {
            this.requestTranslation(locale, translationProfileId, function (response) {
              if (isFunction(callback)) {
                callback(response);
              }
            });
          }
        }
      }
    },
    requestTranslation: function(locale) {
      if (this.source.status === 'pending') {
        this.refresh(true);
      }
      if (this.source.status !== 'pending' && this.source.status !== 'untracked'){
        this.loading = true;
        var self = this;
        Middleware.requestTranslation(this.id, this.type, locale).then(function (response) {
          var data = response.data;
          self.update(self.id, self.type, data);
        }, function (error) {
          console.log(error);
          self.loading = false;
          var message = error.data.message ? error.data.message : $filter('translate')('error_request_translation');
          uiMessage.setMessage(message);
        });
      }
    },
    importTranslation: function(locale, force) {
      var statuses = this.getTargetStatuses();
      if(statuses[locale] === 'none') {
        return;
      }
      this.loading = true;
      var self = this;
      Middleware.importTranslation(this.id, this.type, locale, force).then(function(response) {
        if(typeof response.data === 'string') {
          self.loading = false;
          var message = $filter('translate')('error_set_url');
          return uiMessage.setMessage(response.data + message);
        }
        var data = response.data;
        self.update(self.id, self.type, data);
      }, function(error) {
        console.log(error);
        self.loading = false;
        var message = error.data.message ? error.data.message : $filter('translate')('error_import_translation');
        uiMessage.setMessage(message);
      });
    },
    importAllTranslations: function(force) {
      var statuses = this.getTargetStatuses();
      for(var locale in statuses){
        if(statuses[locale] === 'ready' || statuses[locale] === 'ready-x' || (force && statuses[locale] !== 'none')){
          this.importTranslation(locale, force);
        }
      }
    },
    editTranslation: function(locale) {
      //console.log("edit(" + locale + ") " + this.id + "+" + this.type);
      var self = this;
      Middleware.editTranslation(this.id, this.type, locale).then(function(response) {
        //success
      }, function(error) {
        console.log(error);
        self.loading = false;
        var message = error.data.message ? error.data.message : $filter('translate')('error_nav_edit');
        uiMessage.setMessage(message);
      });
    },
    view: function() {
      var locale = undefined;//locale undefined for source url
      return this.viewTranslation(locale);
    },
    viewTranslation: function(locale) {
      var self = this;
      //console.log("view(" + locale + ") " + this.id + "+" + this.type);
      Middleware.viewTranslation(this.id, this.type, locale).then(function(response) {
        //success
      }, function(error) {
        self.loading = false;
        var message = error === undefined ? "error_host_url" : "error_retrieve_view";
        message = $filter('translate')(message);
        uiMessage.setMessage(message);
      });
    },
    removeTranslation: function(locale, deleteFromSystem) {
      console.log("remove(" + locale + ") " + this.id + "+" + this.type);
      this.loading = true;
      var self = this;
      Middleware.removeTranslation(this.id, this.type, locale, deleteFromSystem).then(function(response) {
        var data = response.data;
        self.update(self.id, self.type, data);
        // self.statuses = data.targets;
        self.loading = false;
      }, function(error) {
        console.log(error);
        self.loading = false;
        var message = error.data.message ? error.data.message : $filter('translate')("error_remove_translation");
        uiMessage.setMessage(message);
      });
    },
    disassociate: function(deleteFromSystem) {
      console.log("disassociateEntity(" + this.id + "," + this.type + ") ");
      this.loading = true;
      var self = this;
      Middleware.disassociateEntity(this.id, this.type, deleteFromSystem).then(function(response) {
        var data = response.data;
        self.update(self.id, self.type, data);
      }, function(error) {
        console.log(error);
        self.loading = false;
        var message = error.data.message ? error.data.message : $filter('translate')("error_diss_content");
        uiMessage.setMessage(message);
      });
    }
  };

  return Entity;

}]);
