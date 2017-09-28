angular.module('app.factories').factory('Connector', ['Detect','CONFIG', function(Detect, CONFIG) {
  var self = this;

  console.log(CONFIG);
  self.id = CONFIG.connector_id;
  self.name = self.id;
  self.enabled = CONFIG.enabled;
  self.url = CONFIG.mwApiBaseUrl;
  if (CONFIG.connectors) {
    var validConnectorPage = CONFIG.connectors.some(function(connector){
      if (CONFIG.connector && CONFIG.connector.connector && connector.connector.slug === CONFIG.connector.connector.slug){
        return true;
      }
    });

    if (CONFIG.connector && validConnectorPage) {
      self.content_types = CONFIG.connector.content_types;
      self.description = CONFIG.connector.description;
      self.slug = CONFIG.connector.connector.slug;
      self.connect_url = CONFIG.connector.connector.connect_url;
      self.translation_profiles = CONFIG.connector.translation_profiles;
    }
  }

  self.detected = {
    id: null,
    type: null,
    locale: null
  };
  self.meta = {
    url: CONFIG.url
  };
  if(CONFIG.error !== undefined) {
    return {};
  }
  self.icon_path = CONFIG.chrome.tab.favIconUrl;

  self.init = function(){
    for(var idx in CONFIG.connectors){
      if(self.id === CONFIG.connectors[idx].slug){
        // gets enabled here?
        self = angular.extend(self, CONFIG.connectors[idx]);
        console.log("Connector Found:",self);
        break;
      }
    }
    console.log(self);
    self.detected = Detect.detect(self);
  };
  self.init();

  self.getContentTypes = function() {
    return self.content_types;
  };

  self.getContentType = function(idx) {
    var index = idx ? idx : 0;
    return (self.content_types[index]) ? self.content_types[index] : null;
  };

  // Helper functions for getting data from connector urls
  self.refresh = function() {
    self.init();
    return self.connector;
  };

  self.openSettingsPage = function(){
    console.log("openSettingsPage" + self.name);
    chrome.tabs.create({url: self.connect_url});
  };

  self.clicked = function(callback) {
    console.log("clicked");
    chrome.tabs.update(CONFIG.chrome.tab.id, {
      url: this.meta.url
    }, callback);
  };

  return self;

}]);
