angular.module('app.factories').factory('EntitySet', ['Entity', 'Middleware','uiMessage', '$filter', function(Entity, Middleware, uiMessage, $filter) {

  function EntitySet() {
    this.entitiesByType = {};
    this.entityTypes = [];
  }

  var lastType = '';
  var lastOffset = -1;
  EntitySet.prototype = {
    typeRequested: function(type) {
      return (type in this.entitiesByType);
    },
    get: function() {
      return (this.entitiesByType);
    },
    getType: function(type) {
      return (this.entitiesByType[type]);
    },
    getTypes: function() {
      return (this.entityTypes);
    },
    getEntity: function(type, id) {
      for (var idx in this.entitiesByType[type]) {
        var entity = this.entitiesByType[type][idx];
        if (id === entity.id) {
          return entity;
        }
      }
      return null; // Not found
    },
    fromAPI: function(data, type) {
      this.entitiesByType[type] = [];
      for(var index in data){
        if (index !== "reauthenticate") {
          var entity = data[index];
          this.entitiesByType[type].push(Entity.fromAPI(entity));
          if (entity.more_content && isFinite(entity.more_content)){
            requestMoreContent(this.entitiesByType[type], entity.more_content, type)
          }
        } else {
          this.entitiesByType[type].push("reauthenticate");
        }
      }
      return this.entitiesByType[type];
    },
    requestType: function(type, callback, errorCallback) {
      console.log("requestType("+type+")");
      var self = this;
      Middleware.requestEntitiesByType(type).then(function(response) {
        var data = response.data;
        var regex = /<script>.*<\/script>/;
        var match = regex.exec(data);
        if(match){
          return;
        }

        if (isInvalidType(data)) {
          type = getValidType(data);
          Middleware.requestEntitiesByType(type).then(function (response) {
            var data = response.data;
            callback(self.fromAPI(data, type));
          }, function (error) {
            console.log(error);
            errorCallback(error);
            var message = error.data.message !== undefined ? error.data.message : $filter('translate')('error_retrieve_translation');
            uiMessage.setMessage(message);
          });
          return;
        }

        callback(self.fromAPI(data, type));
      }, function(error) {
        console.log(error);
        errorCallback(error);
        var message = error.data.message !== undefined ? error.data.message : $filter('translate')('error_retrieve_translation');
        uiMessage.setMessage(message);
      });
    }
  };

  function getValidType(data) {
    return data[0].invalid_type[0];
  }

  function isInvalidType(data) {
    return data[0] && data[0].invalid_type;
  }

function requestMoreContent(entitiesOfType, offset, type, moreContentCalls) {
  if (!offset || !isFinite(offset)){
    return;
  }
  var limit = 5;
  if (moreContentCalls === undefined)
    moreContentCalls = 1;

  moreContentCalls += 1;
  if (moreContentCalls > limit){
    return;
  }
  if (type === lastType && offset === lastOffset){
    return;
  }
  lastType = type;
  lastOffset = offset;
  Middleware.requestEntitiesByType(type, offset).then(function(response) {
    var data = response.data;
    for (var index in data) {
      var entity = data[index];
      !entity.more_content ? entitiesOfType.push(Entity.fromAPI(entity)) : requestMoreContent(entitiesOfType, entity.more_content * moreContentCalls, type, moreContentCalls);
    }
  }, function(error) {
    console.log(error);
    var message = $filter('translate')('error_retrieve_translation');
    uiMessage.setMessage(message);
  });
}

  return EntitySet;

}]);
