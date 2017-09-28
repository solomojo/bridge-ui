angular.module('app.factories').factory('Detect', [function() {
  var self = this;
  var detected = {};

  self.detect = function(connector) {
    // Detect page details from URL

    console.log("detect",connector);

    switch (connector.slug) {
      case 'hubspot':
        detected = detectHubspotData(connector);
        break;
      case 'zendesk':
        detected = detectZendeskData(connector);
        break;
      case 'mindtouch':
        detected = detectMindtouchData(connector);
        break;
      case 'marketo':
        detected = detectMarketoData(connector);
        break;
      case 'confluence':
        detected = detectConfluenceData(connector);
        break;
      default:
        if (connector && connector.enabled == 1) {
          detected = detectDetails(connector);
        }
    }

    // console.log('detected',connector.id, detected);

    return angular.extend(connector.detected, detected);
  };


  function detectDetails(connector) {
      /*for (i = 0; i < connector.supportedTypes.length; i++) {
        if (connector.url.pathname.indexOf(connector.supportedTypes[i]) > -1) {
          var id = connector.url.pathname[data.indexOf(connector.supportedTypes[i]) + 1].split('-', 1);
          connector.detected.type = connector.supportedTypes[i];
          connector.detected.id = id[0];
          break;
        }
      }*/
    return connector.detected;
  }

  // Returns the necessary data from the HubSpot URL
  function detectHubspotData(connector) {
    var detected = {id: null, type: null, locale: null};
    //var url_types = connector.content_types;
    var url_types = ['pages', 'blog-post', 'email', 'form'];

    var data = connector.meta.url.pathname;  //console.log("detectHubspotData", data);
    data = data.replace('/content/','/page/');
    data = data.replace('/forms/','/form/');
    data = data.replace('/forms-two/','/form/');
    data = (data.indexOf('/blog/') === -1) ? data.replace('/pages-beta/','/page/') : data = data.replace('/pages-beta/','/blog/');
    data = (data.indexOf('/blog-beta/') === -1) ? data.replace('/blog/','/blog-post/') : data.replace('/blog-beta/','/blog-post/');

    var skip_id_list = ['domain','blogs'];// skip id detection when keywords present

    for (var i = 0; i < url_types.length; i++) {
      if (data.indexOf("/" + url_types[i] + "/") > -1) {
        var parts = data.split("/");
        for(var x = 3; x < parts.length; x++){
          if(skip_id_list.indexOf(parts[x]) !== -1){
            break;//skip id detection
          }
          if(url_types[i] === 'form'){
            //console.log("form",url_types[i]);
            if(parts[x].length === 36){
              detected.id = parts[x];
            }
            break;
          }
          if(parts[x].length && !isNaN(parts[x])){
            detected.id = parts[x];
            //console.log("FOUND a NUMBER: ",detected.id);
            break;
          }
        }

        detected.type = parts[1].endsWith('s') ? parts[1] : parts[1] + 's';

        break;
      }
      else {
        detected.type = 'pages';
      }
    }
    var foundType = false;
    for(var key in connector.content_types) {
      if(connector.content_types[key].api_name === detected.type) {
        foundType = true;
        break;
      }
    }
    if(foundType === false) {
      detected.type = null;
    }
    console.log("detected", detected);
    return detected;
  }

  function detectZendeskData(connector) {
    var data = connector.meta.url.pathname;
    var detected = {};
    for (var i = 0; i < connector.content_types.length; i++) {
      if (data.toLowerCase().includes(connector.content_types[i].api_name.toLowerCase())) {
        var parts = data.split("/");
        if (data.toLowerCase().includes('knowledge')) {
          detected.id = parts[3];
          detected.type = parts[2];
          detected.locale = parts[4].split('?', 1)[0];
        } else {
          detected.id = parts[4].split('-', 1)[0];
          detected.type = parts[3];
          detected.locale = parts[2];
          break;
        }
      }
    }
    return detected;
  }

  function detectMindtouchData(connector) {
    if(connector.meta.url.pathname === '/') {
      return {};
    }
    var data = connector.meta.url.pathname;
    var detected = {id: null, type: 'topic', locale: null};
    detected.id = data.slice(1);
    return detected;
  }

  function detectConfluenceData(connector) {
    if(connector.meta.url.pathname === '/') {
      return {};
    }
    var data = connector.meta.url.pathname;
    var query = connector.meta.url.search;
    // type is blog posts or page
    // id is page end
    var detected = {id: null, type: null, locale: null};
    var temp = data.split('/');
    var last = temp[temp.length - 1];

    var index = temp.indexOf("spaces");
    if (index > -1) {
      detected.type = temp[index + 1];
      // Single Page View
      var isPage = temp.indexOf('pages') > -1;
      var isBlog = temp.indexOf('blog') > -1;
      if ((isPage && last !== 'pages' ) || (isBlog && last !== 'blog')){
        detected.id = temp[temp.length - 2];
        if (!isNumeric(detected.id)) {
          detected.id = temp[temp.length - 1];
        }
        detected.type = isPage ? 'page,' + detected.type : "blogpost," + detected.type;
      }
    }

    // get the page id if it exists
    if (query.indexOf('pageId') > -1) {
      var queryArray = query.split('=');
      detected.id = queryArray[1];
    }

    if (detected.type === null) {
      detected.type = null;
      detected.id = null;
    }

    return detected;
  }

  function isNumeric (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function detectMarketoData(connector) {
    //hash looks like /#<two char type><id>
    var metaData = window.location.hash.slice(2);
    var detected = {};
    var typeMap = {
      "#LT": 'landingPageTemplate',
      "#LP": 'landingPage',
      "#FO": 'form',
      "#EM": 'email',
      "#ET": 'emailTemplate',
      "#SN": 'snippet'
    };

    detected.type = typeMap[metaData.slice(0,3)];
    if(detected.type === undefined){
      var url = window.location.href.toString();
      var regex = /lpgObjType=(.*?)&.*lpgObjId=(.*?)&/g;
      var match = regex.exec(url);
      if (!match || match[1] === undefined || match[2] === undefined){
        regex = /Id=(.*)/g;
        match = regex.exec(url);
        if (!match || match[1] !== undefined) {
          var split = url.split('/');
          var index = -1;
          split.some(function(value, ind){
            if (value.match(/marketodesigner/)){
              index = ind;
            }
          });
          if (index > -1) {
            detected.type = split[index + 1];
            if (split[index + 2] !== undefined && split[index + 2].includes("template")) {
              detected.type += 'Template';
            }
            detected.id = match[1];
          } else {
            return {};
          }
        } else {
          return {};
        }
      } else {
        detected.type = match[1];
        detected.id = match[2];
      }
    } else {
      // var id = metaData.slice(3).replace(/([a-z]+|[A-Z]+)(.)*/,'');
      var id = metaData.slice(3).match(/[0-9]+/)[0];
      detected.id = id[0] == '0' || id === '' ? null : id;//bulk page expects id to be null
    }
    return detected;
  }

  return self;
}]);
