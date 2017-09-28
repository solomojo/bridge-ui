//"chrome-extension://bgkobcchjdlgnebfkgkgcpfkfemkmgif/popup/popup.html?srcUrl=https://app.hubspot.com/developers/1813149/application/30703"
window.onhashchange = function(event) {
  var normalizedOldURL = event.oldURL.replace(/\//g,'');
  var normalizedNewURL = event.newURL.replace(/\//g,'');
  if(normalizedNewURL !== normalizedOldURL){
    // refreshes iframe in window
    window.location.reload();
  }
};
var popupContext = 'injected';
var isFirefox = false;
console.log(chrome.storage);
if(chrome.storage.sync === undefined) {//firefox has no concept of storage.sync
  isFirefox = true;
  chrome.storage.local.clear();
  chrome.storage.sync = chrome.storage.local;
}
if(chrome.tabs === undefined) {
  popupContext = 'injected';
}
else if(window.location.href.indexOf('ltkwindow') !== -1) {
  popupContext = 'window';
}
else if(isFirefox === true) {
  popupContext = 'popup';
}
console.log(popupContext);
if(popupContext === 'injected') {//check if we're a content script
  var sourceUrl = window.location.href.slice(window.location.href.indexOf('=') + 1);
  console.log(sourceUrl);
  chrome.tabs = {//spoof chrome tabs for minimal code changes
    query: function(param, callback) {
      callback([
        {
          url: sourceUrl,
          index:1
        }
      ]);
    },
    create:function(param, callback) {
      window.open(param.url);
      callback && callback();
    },
    sendMessage:function(messageObj) {
      window.parent.postMessage(messageObj, sourceUrl);
    },
    fake:true
  };
}

(function() {
  console.log(window.location.href);

  var initInjector = angular.injector(['ng']);
  var $http = initInjector.get('$http');
  var $q = initInjector.get('$q');
  var configData;
  function loadConfig(response){
    //console.log("loadConfig",response);
    var defer = $q.defer();
    var data = response.data;
    // derived variables
    data.mwApiBaseUrl = data.mwHost + data.mwApi;
    data.mwAuthUrl = data.mwHost + '/auth';
    configData = data;
    defer.resolve(data);
    return defer.promise;
  }

  function loadChrome(data) {
    var defer = $q.defer();
    // console.log("loadChrome",data);
    chrome.tabs.query({
      currentWindow: true,
      active: true
    }, function(tabs) {
      chrome.storage.sync.get(null, function(options) {
        data.chrome = {
          options: options,
          tab: tabs[0]
        };
        var baseUrl = data.mwHost;
        if (baseUrl.match('mw\.lingotek\.com')) {
          baseUrl = 'https://inside.lingotek.com';
        }
        var bridgeUrl = options.bridge_url === undefined ? '' : options.bridge_url;
        if (bridgeUrl.match('mw\.lingotek\.com')){
          bridgeUrl = 'https://inside.lingotek.com';
        }
        if (bridgeUrl !== '' && bridgeUrl !== baseUrl) {
          data.mwApiBaseUrl = bridgeUrl + data.mwApi;
          data.mwHost = bridgeUrl;
          data.mwAuthUrl = bridgeUrl.endsWith('/') ? bridgeUrl + 'auth' : bridgeUrl + '/auth';
          chrome.storage.sync.set({
            bridge_url: bridgeUrl,
            token: ''
          });
        } else {
          // data.chrome.options.bridge_url = userUrl;
          chrome.storage.sync.set({
            bridge_url: baseUrl
          });
        }
        if(popupContext === 'window') {
          var parentIdKey = 'parentId=';
          var parentIdIndex = window.location.href.indexOf(parentIdKey) + parentIdKey.length;
          var parentId = parseInt(window.location.href.slice(parentIdIndex));
          chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
            if(parentId === tabId && changeInfo.url !== undefined) {
              var href = window.location.href.split('?')[0];
              window.location.href = href + "?srcUrl=" + changeInfo.url + '&ltkwindow=1' + '&parentId=' + tabId;
            }
          });
          var rawUrl = window.location.href.slice(window.location.href.indexOf('=') + 1);
          var extraInfoIndex = rawUrl.indexOf('&ltkwindow=1');
          data.chrome.tab.url = rawUrl.slice(0, extraInfoIndex);
        }
        defer.resolve(data);
      });
    });
    return defer.promise;
  }

  function loadToken(data){
    var defer = $q.defer();
    if(data.chrome.options.token && data.chrome.options.token.length){
        defer.resolve(data);
    } else {
      $http.get(data.mwAuthUrl).then(
        function(response) {
          var user = response.data.user !== undefined ? response.data.user : response.data;
          if (user && user.access_token) {
            data.chrome.options.user = user;
            data.chrome.options.token = user.access_token;
            chrome.storage.sync.set({
              user: user,
              token: user.access_token
            });
          }
          defer.resolve(data);
        },
        function(error) {
          var res = {
            error: error,
            config: data
          };
          // if(chrome.tabs.fake === true) {
          //   chrome.tabs.sendMessage({url:sourceUrl, action:'resize', width:500, height: 151});
          // }
          defer.reject(res);
        }
      );
    }
    return defer.promise;
  }

  function loadConnector(data){
    var defer = $q.defer();
    var parser = document.createElement('a');
    parser.href = data.chrome.tab.url;
    var url = {
      protocol: parser.protocol, // => "http:"
      hostname: parser.hostname, // => "example.com"
      port: parser.port, // => "3000"
      pathname: parser.pathname, // => "/pathname/"
      search: parser.search, // => "?search=test"
      hash: parser.hash, // => "#hash"
      host: parser.host // => "example.com:3000"
    };
    data.connector_id = url.hostname.split('.').reverse()[1];
    data.url = url;

    // detect if url is mw host
    parser = document.createElement('a');
    parser.href = data.mwHost;
    data.on_mw_host = (url.hostname === parser.hostname);

    $http.defaults.headers.common.Authorization = data.chrome.options.token;
    $http.get(data.mwApiBaseUrl+'/connectors').then(
      function(res){
        console.log("Response", res);
        data.connectors = res.data;
        console.log("Data before", data);
        data.connector = getConnector(data);
        console.log("Data after", data);
        if (data.connector) {
          data.connector_id = data.connector.id;
          data.enabled = data.connector.active;
        }
        defer.resolve(data);
      },
      function(err){
        defer.reject(err);
      }
    );
    return defer.promise;
  }

  function getConnector(data) {
    for(var i = 0; i < data.connectors.length; i++) {
      var connectedDetails = data.connectors[i];
      if (!connectedDetails.active) {
        continue;
      }
      // console.log("DATA 1", data);
      if (data.chrome.options.url){
        data.chrome.tab.url = data.chrome.options.url;
      }
      if (data.chrome.tab.url.includes('marketo')) {
        if (connectedDetails.connector.slug === 'marketo') {
          return connectedDetails
        }
      }

      if (data.chrome.tab.url.includes('app.hubspot.com')) {
        if (connectedDetails.connector.slug === 'hubspot') {
          return connectedDetails
        }
      }

      var connector = connectedDetails.connector;
      var connectorUrl = connectedDetails ? connectedDetails.connector_url : '';
      connectorUrl = connectorUrl.replace(/\S*:\/\//, '');
      if(connectorUrl && data.chrome.tab.url.indexOf(connectorUrl) !== -1) {
        return connectedDetails;
      }
      if (data.chrome.tab.url.includes('hs-sites')) {
        if (connectedDetails.connector_client_id != '' && data.chrome.tab.url.includes(connectedDetails.connector_client_id)) {
          return connectedDetails;
        }
      }
    }
    if (data.connector_id === 'atlassian') {
      data.connector_id = 'confluence';
    }
  }

  $http.get('config.dev.json')
    .then(loadConfig)   // 1. Load Config from JSON file
    .then(loadChrome)   // 2. Load Chrome options and URL details
    .then(loadToken)    // 3. Load valid access Token
    .then(loadConnector)// 4. Load Connector details ($http)
    .then(function(data){
      console.log("SUCCESS", data);
      data.loaded = true;
      data.context = popupContext;
      app.value('CONFIG', data);
      //console.log(app.value('CONFIG'));
      $('.popup-loader').addClass('hidden');
      $('.popup-container').removeClass('hidden');
      angular.bootstrap(document, ['popupApp']);
    }, function(err){
      $('.popup-loader').addClass('hidden');
      $('.popup-login').removeClass('hidden');
      console.log("ERROR",err);
      if(err.status === 401) {
        chrome.storage.sync.remove('token');
      }
      configData.error = err.status;
      app.value('CONFIG', configData);
      angular.bootstrap(document, ['popupApp']);
    });

})();
